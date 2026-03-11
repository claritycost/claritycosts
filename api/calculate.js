import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export default async function handler(req, res) {

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const resend  = new Resend(process.env.RESEND_API_KEY)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { specialty, experience, location, worktype, income, days, clients, email } = req.body

  if (!specialty || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase    = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

  try {
    const prompt = `You are a UK freelance rate expert. Calculate a realistic, personalised day rate for this specific freelancer based on their actual inputs. Do NOT use placeholder or example values.

FREELANCER INPUTS:
- Specialty: ${specialty}
- Years of experience: ${experience}
- UK location: ${location}
- Work type: ${worktype}
- Target annual take-home: ${income}
- Days per week available: ${days}
- Target client type: ${clients}

CALCULATION RULES:
1. Start from the target take-home income and reverse-calculate: add 20% income tax, 9% NI, 15% business overheads
2. Divide by billable days per year (days per week multiplied by 46 weeks)
3. Adjust UP or DOWN based on: specialty market rates in ${location}, experience level, client type budget
4. rangeLow = 20% below dayRate, rangeHigh = 25% above dayRate
5. project = dayRate multiplied by 5
6. retainer = dayRate multiplied by 8
7. monthly = dayRate multiplied by days per week multiplied by 4.2, after rough tax estimate
8. annual = monthly multiplied by 11

CRITICAL: Every freelancer must get a different accurate rate. A junior designer in Manchester targeting £30k must get a very different number to a senior developer in London targeting £120k. Base every figure on the actual inputs above.

Respond ONLY with a valid JSON object. No markdown. No code fences. No explanation:

{
  "dayRate": "actual calculated value with pound symbol",
  "rangeLow": "actual calculated value with pound symbol",
  "rangeHigh": "actual calculated value with pound symbol",
  "monthly": "actual calculated value with pound symbol",
  "annual": "actual calculated value with pound symbol",
  "project": "actual calculated value with pound symbol",
  "retainer": "actual calculated value with pound symbol",
  "positioning": "2-sentence positioning statement in first person based on their specialty and client type",
  "script": "natural confident response to what do you charge, mentioning their specific day rate and a project estimate",
  "rationale": "2 sentences explaining exactly how this rate was calculated for this specific person"
}`

    const completion = await openai.chat.completions.create({
      model:       'gpt-4o',
      messages:    [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens:  800,
    })

    const raw = completion.choices[0].message.content.trim()

    let rateData
    try {
      rateData = JSON.parse(raw)
    } catch {
      const cleaned = raw.replace(/```json|```/g, '').trim()
      rateData = JSON.parse(cleaned)
    }

    // Save to Supabase
    let savedId = null
    if (supabase) {
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
          paid:        false,
        })
        .select('id')
        .single()

      if (dbError) console.error('Supabase insert error:', dbError)
      else savedId = saved?.id
    }

    // Send email
    const appUrl = process.env.VITE_APP_URL || 'https://claritycosts.co.uk'
    const { dayRate, monthly, annual, project, retainer, positioning, script } = rateData

    const breakdownRows = [
      ['Approx. monthly income',    monthly],
      ['Approx. annual (196 days)', annual],
      ['Project rate (5-day est.)', project],
      ['Monthly retainer (8 days)', retainer],
    ].map(([label, value]) => `
      <tr>
        <td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,.5);">${label}</td>
        <td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,.88);font-weight:600;text-align:right;">${value}</td>
      </tr>
    `).join('')

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Your Clarity Costs Results</title></head>
<body style="margin:0;padding:0;background:#080b12;font-family:Inter,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080b12;padding:48px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td style="padding-bottom:36px;">
        <img src="${appUrl}/logo.png" height="32" alt="Clarity Costs" style="display:block;"/>
      </td></tr>
      <tr><td style="background:linear-gradient(135deg,#0a1f14 0%,#061510 100%);border:1px solid rgba(0,232,122,.25);border-radius:16px;padding:40px 36px;">
        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(0,232,122,.7);margin:0 0 10px;">Your recommended day rate</p>
        <div style="font-size:60px;font-weight:900;color:#00e87a;letter-spacing:-0.04em;line-height:1;margin-bottom:6px;">${dayRate}</div>
        <p style="font-size:14px;color:rgba(255,255,255,.5);margin:0 0 28px;">per day · ex. VAT</p>
        <hr style="border:none;border-top:1px solid rgba(0,232,122,.15);margin:0 0 24px;"/>
        <table width="100%" cellpadding="0" cellspacing="0">${breakdownRows}</table>
      </td></tr>
      <tr><td style="padding-top:20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:14px;">
          <tr><td style="padding:24px 28px;">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin:0 0 12px;">Your Positioning Statement</p>
            <p style="font-size:14px;color:rgba(255,255,255,.88);line-height:1.7;font-style:italic;margin:0;">${positioning || ''}</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding-top:16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:14px;">
          <tr><td style="padding:24px 28px;">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin:0 0 12px;">Your Charge Script</p>
            <div style="font-size:14px;color:rgba(255,255,255,.88);line-height:1.65;padding:14px 18px;background:#0f1521;border-radius:8px;border-left:3px solid #00e87a;">${script || ''}</div>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding-top:36px;text-align:center;">
        <a href="${appUrl}/results" style="display:inline-block;background:#00e87a;color:#000;font-size:15px;font-weight:700;padding:15px 36px;border-radius:999px;text-decoration:none;">View your full results</a>
        <p style="font-size:13px;color:rgba(255,255,255,.35);margin:16px 0 0;">Want the full toolkit? Upgrade for just £9 — PDF report, objection scripts and raise-your-rates guide.</p>
      </td></tr>
      <tr><td style="padding-top:48px;">
        <p style="font-size:11px;color:rgba(255,255,255,.2);margin:0;line-height:1.8;">
          2025 Hello Clarity Ltd · Registered in England and Wales
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`

    try {
      const { error: emailError } = await resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL || 'report@claritycosts.co.uk',
        to:      email,
        subject: `Your rate is ${dayRate}/day — Clarity Costs`,
        html,
      })
      if (emailError) console.error('Resend error:', emailError)
    } catch (err) {
      console.error('Email error:', err)
    }

    return res.status(200).json({
      id:          savedId,
      dayRate:     rateData.dayRate,
      rangeLow:    rateData.rangeLow,
      rangeHigh:   rateData.rangeHigh,
      monthly:     rateData.monthly,
      annual:      rateData.annual,
      project:     rateData.project,
      retainer:    rateData.retainer,
      positioning: rateData.positioning,
      script:      rateData.script,
      rationale:   rateData.rationale,
    })

  } catch (err) {
    console.error('Calculate error:', err)
    return res.status(500).json({ error: err.message })
  }
}
