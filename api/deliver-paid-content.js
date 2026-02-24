import Stripe from 'stripe'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { sessionId } = req.body

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID required' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not confirmed' })
    }

    const email = session.metadata?.email || session.customer_email
    const submissionId = session.metadata?.submissionId

    if (!email) {
      return res.status(400).json({ error: 'No email on session' })
    }

    let rates = null
    let answers = null

    if (submissionId) {
      const { data } = await supabase
        .from('submissions')
        .select('rate_card, answers')
        .eq('id', submissionId)
        .single()

      if (data) {
        rates = data.rate_card
        answers = data.answers
      }
    }

    const emailHtml = buildPremiumEmail(email, rates, answers)

    const { error: emailError } = await resend.emails.send({
      from: 'Clarity Costs <hello@claritycosts.co.uk>',
      to: email,
      subject: 'Your full rate card + Raise Your Rates guide',
      html: emailHtml,
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      return res.status(500).json({ error: 'Email delivery failed' })
    }

    if (submissionId) {
      await supabase
        .from('submissions')
        .update({ paid: true, paid_at: new Date().toISOString() })
        .eq('id', submissionId)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Deliver paid content error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}

function fmt(val) {
  if (!val && val !== 0) return '—'
  const num = typeof val === 'number' ? val : parseInt(String(val).replace(/[^0-9]/g, ''), 10)
  if (isNaN(num)) return String(val)
  return '£' + num.toLocaleString('en-GB')
}

function buildPremiumEmail(email, rates, answers) {
  const dayRate = fmt(rates?.dayRate)
  const projectRate = fmt(rates?.projectRate)
  const retainerRate = fmt(rates?.retainerRate)
  const positioningStatement = rates?.positioningStatement || ''
  const chargeScript = rates?.chargeScript || ''
  const confidenceTip = rates?.confidenceTip || ''
  const headline = rates?.headline || ''
  const specialty = answers?.discipline || answers?.specialty || 'your specialty'
  const yearsExp = answers?.experience || ''
  const expNote = yearsExp ? ` with ${yearsExp} of experience` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your Full Rate Card — Clarity Costs</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">

  <div style="background:linear-gradient(135deg,#0f1e35,#1a3a5c);border-radius:20px 20px 0 0;padding:36px 32px;text-align:center;">
    <p style="font-size:22px;font-weight:800;color:#f0c040;letter-spacing:-0.02em;margin:0 0 8px;">Clarity Costs</p>
    <h1 style="font-size:28px;font-weight:800;color:#ffffff;margin:0 0 8px;letter-spacing:-0.02em;">Your Full Report</h1>
    <p style="font-size:15px;color:rgba(255,255,255,0.6);margin:0;">Rate card + Raise Your Rates guide</p>
  </div>

  <div style="background:#ffffff;padding:32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
    <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 20px;">📄 Your Rate Card</p>

    ${headline ? `<p style="font-size:18px;font-weight:800;color:#0f1e35;margin:0 0 20px;letter-spacing:-0.02em;">${headline}</p>` : ''}

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:14px 0;font-size:15px;color:#374151;font-weight:500;">Day Rate</td>
        <td style="padding:14px 0;font-size:24px;font-weight:900;color:#0f1e35;text-align:right;letter-spacing:-0.02em;">${dayRate}</td>
      </tr>
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:14px 0;font-size:15px;color:#374151;font-weight:500;">Project Rate</td>
        <td style="padding:14px 0;font-size:24px;font-weight:900;color:#0f1e35;text-align:right;letter-spacing:-0.02em;">${projectRate}</td>
      </tr>
      <tr>
        <td style="padding:14px 0;font-size:15px;color:#374151;font-weight:500;">Monthly Retainer</td>
        <td style="padding:14px 0;font-size:24px;font-weight:900;color:#0f1e35;text-align:right;letter-spacing:-0.02em;">${retainerRate}</td>
      </tr>
    </table>

    ${positioningStatement ? `
    <div style="background:#f8fafc;border-radius:12px;padding:16px;margin-bottom:16px;">
      <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Your Positioning</p>
      <p style="font-size:15px;color:#1e293b;line-height:1.6;margin:0;">${positioningStatement}</p>
    </div>` : ''}

    ${chargeScript ? `
    <div style="background:#fffbeb;border-left:3px solid #f0c040;border-radius:0 12px 12px 0;padding:16px;margin-bottom:16px;">
      <p style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Charge Script</p>
      <p style="font-size:15px;color:#78350f;line-height:1.7;font-style:italic;margin:0;">"${chargeScript}"</p>
    </div>` : ''}

    ${confidenceTip ? `
    <div style="background:#f0fdf4;border-radius:12px;padding:16px;margin-bottom:24px;border:1px solid #bbf7d0;">
      <p style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Confidence Tip</p>
      <p style="font-size:15px;color:#166534;line-height:1.6;margin:0;">${confidenceTip}</p>
    </div>` : ''}

    <div style="background:linear-gradient(135deg,#0f1e35,#1a3a5c);border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="font-size:16px;font-weight:800;color:#f0c040;margin:0 0 4px;">📈 Raise Your Rates Guide</p>
      <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:0 0 20px;">5 strategies for ${specialty}${expNote}</p>

      <div style="margin-bottom:16px;">
        <p style="font-size:14px;font-weight:700;color:#ffffff;margin:0 0 6px;">1. Anchor with your highest rate first</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;margin:0;">Always lead with your day rate — not your retainer. The first number anchors expectations. If you say a lower number first, everything else gets compared to it.</p>
      </div>

      <div style="margin-bottom:16px;">
        <p style="font-size:14px;font-weight:700;color:#ffffff;margin:0 0 6px;">2. Stop justifying your rate unprompted</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;margin:0;">When you explain why you charge what you charge before anyone asks, you signal uncertainty. State your rate clearly, then pause. Silence after quoting a rate is not rejection — it's processing.</p>
      </div>

      <div style="margin-bottom:16px;">
        <p style="font-size:14px;font-weight:700;color:#ffffff;margin:0 0 6px;">3. Raise by 15–20% with your next new client</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;margin:0;">Your next new client has no reference point. The time to raise rates is with a new enquiry. Aim for a 15% increase on ${dayRate} with your next proposal.</p>
      </div>

      <div style="margin-bottom:16px;">
        <p style="font-size:14px;font-weight:700;color:#ffffff;margin:0 0 6px;">4. Reframe cost as value delivered</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;margin:0;">If a client pushes back on price, ask: "What does this project need to achieve for it to be worth the investment?" This shifts the conversation from your cost to their outcome.</p>
      </div>

      <div>
        <p style="font-size:14px;font-weight:700;color:#ffffff;margin:0 0 6px;">5. Review and raise every 6 months</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;margin:0;">Set a calendar reminder for 6 months from today. If you haven't been turned down on price at least twice, your rates are too low. Two rejections per month means your rates are right.</p>
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <p style="font-size:14px;font-weight:700;color:#0f1e35;margin:0 0 16px;">💬 Handling objections — word for word</p>
      <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:10px;">
        <p style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">When they say: "That's too expensive"</p>
        <p style="font-size:14px;color:#1e293b;font-style:italic;line-height:1.6;margin:0;">"I understand it's a significant investment. What's your budget for this? I'd like to understand if there's a version of this project that works for both of us — or whether it makes sense for me to refer you to someone who might be a better fit at your price point."</p>
      </div>
      <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:10px;">
        <p style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">When they say: "Can you do it cheaper?"</p>
        <p style="font-size:14px;color:#1e293b;font-style:italic;line-height:1.6;margin:0;">"I can reduce the scope to bring the cost down — what's least important to you? Alternatively, my rate is my rate. What I can offer is certainty: I deliver on time, to brief, without revisions drama."</p>
      </div>
      <div style="background:#f8fafc;border-radius:10px;padding:16px;">
        <p style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">When they say: "Someone else quoted less"</p>
        <p style="font-size:14px;color:#1e293b;font-style:italic;line-height:1.6;margin:0;">"That's good to know. If they're the right fit, go with them — I mean that genuinely. My rate reflects the speed and certainty I bring. If you come back, I'm here."</p>
      </div>
    </div>

    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px;">
      <p style="font-size:13px;font-weight:700;color:#92400e;margin:0 0 6px;">⏰ Rate review reminder</p>
      <p style="font-size:13px;color:#78350f;line-height:1.6;margin:0;">Set a reminder for 6 months from today to revisit your rates. Two pricing rejections per quarter = healthy. Zero rejections = undercharging.</p>
    </div>
  </div>

  <div style="background:#0f1e35;border-radius:0 0 20px 20px;padding:24px 32px;text-align:center;">
    <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0 0 6px;">Clarity Costs · claritycosts.co.uk</p>
    <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">Questions? Reply to this email or write to hello@claritycosts.co.uk</p>
  </div>

</div>
</body>
</html>`
}
