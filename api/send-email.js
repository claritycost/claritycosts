import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, rateData, resultId } = req.body

  if (!email || !rateData) {
    return res.status(400).json({ error: 'Missing email or rate data' })
  }

  const appUrl     = process.env.VITE_APP_URL || 'https://claritycosts.co.uk'
  const resultsUrl = `${appUrl}/results${resultId ? `?id=${resultId}` : ''}`

  const { dayRate, monthly, annual, project, retainer, positioning, script } = rateData

  const breakdownRows = [
    ['Approx. monthly income',   monthly],
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
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Your Clarity Costs Results</title>
</head>
<body style="margin:0;padding:0;background:#080b12;font-family:Inter,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080b12;padding:48px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Logo -->
      <tr><td style="padding-bottom:36px;">
        <img src="${appUrl}/logo.png" height="32" alt="Clarity Costs" style="display:block;"/>
      </td></tr>

      <!-- Rate card -->
      <tr><td style="background:linear-gradient(135deg,#0a1f14 0%,#061510 100%);border:1px solid rgba(0,232,122,.25);border-radius:16px;padding:40px 36px;">
        <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(0,232,122,.7);margin:0 0 10px;">Your recommended day rate</p>
        <div style="font-size:60px;font-weight:900;color:#00e87a;letter-spacing:-0.04em;line-height:1;margin-bottom:6px;">${dayRate}</div>
        <p style="font-size:14px;color:rgba(255,255,255,.5);margin:0 0 28px;">per day · ex. VAT</p>
        <hr style="border:none;border-top:1px solid rgba(0,232,122,.15);margin:0 0 24px;"/>
        <table width="100%" cellpadding="0" cellspacing="0">${breakdownRows}</table>
      </td></tr>

      <!-- Positioning -->
      <tr><td style="padding-top:20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:14px;">
          <tr><td style="padding:24px 28px;">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin:0 0 12px;">Your Positioning Statement</p>
            <p style="font-size:14px;color:rgba(255,255,255,.88);line-height:1.7;font-style:italic;margin:0;">${positioning || ''}</p>
          </td></tr>
        </table>
      </td></tr>

      <!-- Charge script -->
      <tr><td style="padding-top:16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border:1px solid rgba(255,255,255,.07);border-radius:14px;">
          <tr><td style="padding:24px 28px;">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin:0 0 12px;">Your Charge Script</p>
            <div style="font-size:14px;color:rgba(255,255,255,.88);line-height:1.65;padding:14px 18px;background:#0f1521;border-radius:8px;border-left:3px solid #00e87a;">${script || ''}</div>
          </td></tr>
        </table>
      </td></tr>

      <!-- CTA -->
      <tr><td style="padding-top:36px;text-align:center;">
        <a href="${resultsUrl}" style="display:inline-block;background:#00e87a;color:#000;font-size:15px;font-weight:700;padding:15px 36px;border-radius:999px;text-decoration:none;">View your full results →</a>
        <p style="font-size:13px;color:rgba(255,255,255,.35);margin:16px 0 0;">Want the full toolkit? Upgrade for just £9 — PDF report, objection scripts &amp; raise-your-rates guide.</p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding-top:48px;border-top:1px solid rgba(255,255,255,.07);margin-top:40px;">
        <p style="font-size:11px;color:rgba(255,255,255,.2);margin:0;line-height:1.8;">
          © 2025 Hello Clarity Ltd · Registered in England and Wales<br/>
          <a href="${appUrl}/privacy" style="color:rgba(0,232,122,.5);text-decoration:none;">Privacy Policy</a>
          &nbsp;·&nbsp;
          <a href="${appUrl}/cookie-policy" style="color:rgba(0,232,122,.5);text-decoration:none;">Cookie Policy</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`

  try {
    const { error } = await resend.emails.send({
      from:    process.env.RESEND_FROM_EMAIL || 'results@claritycosts.co.uk',
      to:      email,
      subject: `Your rate is ${dayRate}/day — Clarity Costs`,
      html,
    })

    if (error) throw error

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
