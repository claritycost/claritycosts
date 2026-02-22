import { createClient } from '@supabase/supabase-js'

const SYSTEM_PROMPT = `You are a specialist freelance pricing consultant. You receive answers from a freelancer's pricing questionnaire and return a precise, confident rate card.

You MUST respond with ONLY a valid JSON object in this exact shape — no markdown, no explanation, no wrapper text:

{
  "dayRate": <number — daily rate in GBP, rounded to nearest 5>,
  "projectRate": <number — typical project rate in GBP, rounded to nearest 50>,
  "retainerRate": <number — monthly retainer in GBP, rounded to nearest 50>,
  "dayRateRange": { "low": <number>, "high": <number> },
  "projectRateRange": { "low": <number>, "high": <number> },
  "retainerRateRange": { "low": <number>, "high": <number> },
  "positioningStatement": "<2 sentences — confident, specific, written in second person. Tells the freelancer exactly what they offer and who they serve. No fluff.>",
  "chargeScript": "<A natural, conversational script of 3–5 sentences the freelancer can say out loud when a client asks 'what do you charge?' It should name the rate, handle the pause, and invite the client to move forward. Written in first person as if the freelancer is speaking.>",
  "rationale": "<2–3 sentences explaining why these rates are right for this freelancer's experience, market, and goals. Builds confidence, not justification.>",
  "headline": "<8 words max — punchy summary of their freelance position. E.g. 'Senior Brand Designer for B2B Tech Startups'>",
  "confidenceTip": "<One sentence — the single most important mindset shift for this freelancer when it comes to charging their worth.>"
}

Base your rates on:
- UK market rates for the stated role and experience level
- The freelancer's income target (work backwards from annual target, accounting for ~220 billable days but assume only 60–70% are actually billable)
- Their experience, niche, and client type
- Whether they're currently undercharging (if they share a current rate)
- Location within UK (London commands 20–30% premium)

Be specific. Be confident. Never hedge. These numbers should feel slightly stretching but achievable.`

function buildPrompt(answers) {
  const lines = Object.entries(answers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')

  return `Here are the freelancer's questionnaire answers:\n\n${lines}\n\nGenerate their rate card now.`
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { answers } = req.body

  if (!answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ error: 'No answers provided' })
  }

  try {
    // ── 1. Call OpenAI ──────────────────────────────────────────────────────
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt(answers) },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.65,
        max_tokens: 800,
      }),
    })

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text()
      console.error('OpenAI error:', errBody)
      return res.status(502).json({ error: 'AI service error — please try again.' })
    }

    const openaiData = await openaiRes.json()
    const rawContent = openaiData.choices?.[0]?.message?.content

    if (!rawContent) {
      return res.status(502).json({ error: 'Empty response from AI.' })
    }

    let rateCard
    try {
      rateCard = JSON.parse(rawContent)
    } catch {
      console.error('JSON parse error. Raw content:', rawContent)
      return res.status(502).json({ error: 'Could not parse AI response.' })
    }

    // ── 2. Store in Supabase ────────────────────────────────────────────────
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      )

      const { error: dbError } = await supabase.from('submissions').insert({
        answers,
        rate_card: rateCard,
      })

      if (dbError) {
        // Log but don't block the response — user still gets their results
        console.error('Supabase insert error:', dbError.message)
      }
    } catch (dbErr) {
      console.error('Supabase exception:', dbErr)
    }

    // ── 3. Return rate card ─────────────────────────────────────────────────
    return res.status(200).json(rateCard)
  } catch (err) {
    console.error('Unhandled error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please go back and try again.' })
  }
}

