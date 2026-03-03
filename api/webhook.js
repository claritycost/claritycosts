import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const resend   = new Resend(process.env.RESEND_API_KEY)

// Disable body parsing so we can verify Stripe's signature on the raw body
export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data',  chunk => chunks.push(chunk))
    req.on('end',   () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rawBody = await getRawBody(req)
  const sig     = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session  = event.data.object
    const resultId = session.metadata?.resultId
    const email    = session.metadata?.email || session.customer_email

    // ── Mark result as paid in Supabase ──────────────────────────────────
    if (resultId) {
      const { error } = await supabase
        .from('results')
        .update({ paid: true, session_id: session.id })
        .eq('id', resultId)

      if (error) console.error('Supabase update error:', error)
    }

    // ── Fetch result details for the email ────────────────────────────────
    let result = null
    if (resultId) {
      const { data } = await supabase
        .from('results')
        .select('*')
        .eq('id', resultId)
        .single()
      result = data
    }

    // ── Send paid confirmation email ──────────────────────────────────────
    if (email) {
      const appUrl = process.env.VITE_APP_URL || 'https://claritycosts.co.uk'

      await resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL || 'results@claritycosts.co.uk',
        to:      email,
        subject: 'Your Clarity Costs Full Toolkit — it\'s on its way',
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:48px 20px;background:#080b12;font-family:Inter,-apple-system,sans-serif;color:rgba(255,255,255,.88);">
  <img src="${appUrl}/logo.png" height="30" alt="Clarity Costs" style="display:block;margin-bottom:32px;"/>

  <div style="background:rgba(0,232,122,.08);border:1px solid rgba(0,232,122,.25);border-radius:16px;padding:28px;margin-bottom:28px;text-align:center;">
    <div style="font-size:2.5rem;margin-bottom:8px;">✓</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#fff;margin:0 0 8px;">Payment confirmed</h2>
    <p style="font-size:14px;color:rgba(255,255,255,.6);margin:0;">Your full toolkit is being prepared and will arrive shortly.</p>
  </div>

  <h1 style="font-size:1.6rem;font-weight:800;color:#fff;margin:0 0 14px;">Here's what you've unlocked</h1>
  <p style="font-size:14px;color:rgba(255,255,255,.6);line-height:1.7;margin-bottom:28px;">Your 7-page PDF report, objection scripts, email templates, Raise Your Rates Guide, and 6-month roadmap are attached below and accessible in your results dashboard.</p>

  ${result ? `<p style="font-size:15px;color:rgba(255,255,255,.6);margin-bottom:28px;">Your day rate: <strong style="color:#00e87a;font-size:1.3rem;">${result.rate?.dayRate}</strong></p>` : ''}

  <a href="${appUrl}/results?upgraded=true" style="display:inline-block;background:#00e87a;color:#000;font-size:15px;font-weight:700;padding:15px 36px;border-radius:999px;text-decoration:none;margin-bottom:40px;">Go to your results →</a>

  <hr style="border:none;border-top:1px solid rgba(255,255,255,.08);margin-bottom:28px;"/>
  <p style="font-size:11px;color:rgba(255,255,255,.2);line-height:1.8;margin:0;">
    © 2025 Hello Clarity Ltd · Registered in England and Wales<br/>
    <a href="${appUrl}/privacy" style="color:rgba(0,232,122,.5);text-decoration:none;">Privacy Policy</a>
  </p>
</body>
</html>`,
      }).catch(err => console.error('Paid email error:', err))
    }
  }

  return res.status(200).json({ received: true })
}
