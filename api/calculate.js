import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { specialty, experience, location, worktype, income, days, clients, email } = req.body

  if (!specialty || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // ── 1. GPT-4o rate generation ────────────────────────────────────────────
    const prompt = `You are a UK freelance rate expert with deep knowledge of current UK contractor market rates.

A UK freelancer has provided the following details:
- Specialty: ${specialty}
- Years of experience: ${experience}
- Location: ${location}
- Work type preference: ${worktype}
- Target annual take-home income: ${income}
- Days per week available: ${days}
- Target client type: ${clients}

Respond ONLY with a valid JSON object — no markdown, no explanation, no code fences. Use exactly this structure:

{
  "dayRate": "£650",
  "rangeLow": "£520",
  "rangeHigh": "£780",
  "monthly": "£9,100",
  "annual": "£127,400",
  "project": "£3,250",
  "retainer": "£5,200",
  "positioning": "Write a confident 2-sentence positioning statement in first person, e.g. I help [client type] [achieve outcome] through [specialty]. I specialise in [niche] and typically work with [client description].",
  "script": "Write a natural, confident response to 'what do you charge?' in first person. Include the day rate, a rough project estimate, and offer to send a proposal. Keep it conversational, not robotic.",
  "rationale": "1–2 sentences explaining how this rate was calculated."
}

Base your calculation on:
1. Current UK market rates for ${specialty} in ${location}
2. Experience adjustment for ${experience}
3. Reverse-calculation from ${income} target after 20% self-employment tax, 10% NI, 15% overheads
4. Client budget expectations for ${clients}
5. Work type adjustment for ${worktype}

Use realistic, current UK rates. Do not inflate.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 700,
    })

    const raw = completion.choices[0].message.content.trim()

    let rateData
    try {
      rateData = JSON.parse(raw)
    } catch {
      // Strip any accidental markdown fences and retry
      const cleaned = raw.replace(/```json|```/g, '').trim()
      rateData = JSON.parse(cleaned)
    }

    // ── 2. Save to Supabase ──────────────────────────────────────────────────
    const { data: saved, error: dbError } = await supabase
      .from('results')
      .insert({
        email,
        answers: { specialty, experience, location, worktype, income, days, clients },
        rate: {
          dayRate:   rateData.dayRate,
          rangeLow:  rateData.rangeLow,
          rangeHigh: rateData.rangeHigh,
          monthly:   rateData.monthly,
          annual:    rateData.annual,
          project:   rateData.project,
          retainer:  rateData.retainer,
        },
        positioning: rateData.positioning,
        script:      rateData.script,
        paid: false,
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Don't block the user — still return results
    }

    // ── 3. Send results email (fire and forget) ──────────────────────────────
    const baseUrl = process.env.VITE_APP_URL || 'https://claritycosts.co.uk'
    fetch(`${baseUrl}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        rateData: {
          ...rateData,
          positioning: rateData.positioning,
          script: rateData.script,
        },
        resultId: saved?.id,
      }),
    }).catch(err => console.error('Email send error:', err))

    // ── 4. Return to client ──────────────────────────────────────────────────
    return res.status(200).json({
      id: saved?.id,
      rate: {
        dayRate:   rateData.dayRate,
        rangeLow:  rateData.rangeLow,
        rangeHigh: rateData.rangeHigh,
        monthly:   rateData.monthly,
        annual:    rateData.annual,
        project:   rateData.project,
        retainer:  rateData.retainer,
      },
      positioning: rateData.positioning,
      script:      rateData.script,
      rationale:   rateData.rationale,
    })

  } catch (err) {
    console.error('Calculate error:', err)
    return res.status(500).json({ error: 'Failed to generate rate. Please try again.' })
  }
}
