import Stripe      from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend }  from 'resend'
import PDFDocument from 'pdfkit'

export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data',  c => chunks.push(c))
    req.on('end',   () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function buildPDF(result) {
  return new Promise((resolve, reject) => {
    const doc    = new PDFDocument({ size: 'A4', margin: 56, info: { Title: 'Clarity Costs — Your Full Rate Toolkit' } })
    const chunks = []

    doc.on('data',  c => chunks.push(c))
    doc.on('end',   () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const GREEN = '#00e87a'
    const WHITE = '#ffffff'
    const DARK  = '#080b12'
    const MUTED = '#8b9eb0'
    const W     = 595 - 112

    const rate        = result.rate        || {}
    const answers     = result.answers     || {}
    const positioning = result.positioning || ''
    const script      = result.script      || ''

    const rule = (y) => {
      doc.moveTo(56, y).lineTo(56 + W, y).strokeColor('#1e2a38').lineWidth(1).stroke()
    }

    const sectionTitle = (text) => {
      doc.moveDown(0.4)
      doc.fontSize(16).fillColor(WHITE).font('Helvetica-Bold').text(text)
      doc.moveDown(0.3)
      rule(doc.y)
      doc.moveDown(0.5)
    }

    // ── PAGE 1 — COVER ────────────────────────────────────────────────────
    doc.rect(0, 0, 595, 842).fill(DARK)

    doc.fontSize(22).fillColor(GREEN).font('Helvetica-Bold').text('Clarity', 56, 56, { continued: true })
       .fillColor(WHITE).text(' Costs')
    doc.fontSize(10).fillColor(MUTED).font('Helvetica').text('claritycosts.co.uk', 56, 86)

    doc.fontSize(13).fillColor(MUTED).font('Helvetica').text('YOUR RECOMMENDED DAY RATE', 56, 220, { characterSpacing: 1.5 })
    doc.fontSize(72).fillColor(GREEN).font('Helvetica-Bold').text(rate.dayRate || '—', 56, 244)
    doc.fontSize(16).fillColor(MUTED).font('Helvetica').text('per day · ex. VAT', 56, 330)

    const gridY = 390
    const cols  = [
      { label: 'Market Range', value: `${rate.rangeLow || '—'} – ${rate.rangeHigh || '—'}` },
      { label: 'Project Rate', value: rate.project  || '—' },
      { label: 'Retainer',     value: rate.retainer || '—' },
      { label: 'Monthly',      value: rate.monthly  || '—' },
      { label: 'Annual',       value: rate.annual   || '—' },
      { label: 'Specialty',    value: answers.specialty || '—' },
    ]
    const colW = W / 3
    cols.forEach((c, i) => {
      const x = 56 + (i % 3) * colW
      const y = gridY + Math.floor(i / 3) * 72
      doc.rect(x, y, colW - 10, 62).fill('#0f1521')
      doc.fontSize(9).fillColor(MUTED).font('Helvetica').text(c.label.toUpperCase(), x + 12, y + 12, { characterSpacing: 1 })
      doc.fontSize(15).fillColor(WHITE).font('Helvetica-Bold').text(c.value, x + 12, y + 30)
    })

    doc.fontSize(9).fillColor('#2a3a4a').font('Helvetica')
       .text('2025 Hello Clarity Ltd · Registered in England and Wales · Confidential', 56, 800, { align: 'center', width: W })

    // ── PAGE 2 — POSITIONING + CHARGE SCRIPT ─────────────────────────────
    doc.addPage({ size: 'A4', margin: 56 })
    doc.rect(0, 0, 595, 842).fill(DARK)

    doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold').text('YOUR TOOLKIT', 56, 56, { characterSpacing: 1.5 })
    doc.fontSize(28).fillColor(WHITE).font('Helvetica-Bold').text('Positioning & Script', 56, 78)
    rule(116)

    doc.moveDown(1.5)
    sectionTitle('Your Positioning Statement')
    doc.fontSize(13).fillColor(WHITE).font('Helvetica-Oblique')
       .text('"' + positioning + '"', { lineGap: 6 })

    doc.moveDown(1.5)
    sectionTitle('Your Charge Script')
    doc.rect(56, doc.y, W, 2).fill(GREEN)
    doc.moveDown(0.5)
    doc.fontSize(12).fillColor(WHITE).font('Helvetica')
       .text('"' + script + '"', { lineGap: 6 })

    doc.moveDown(1.5)
    doc.fontSize(10).fillColor(MUTED).font('Helvetica-Oblique')
       .text('Tip: Practise saying your rate out loud before your next call. Confidence comes from repetition, not certainty.')

    // ── PAGE 3 — OBJECTION SCRIPTS ────────────────────────────────────────
    doc.addPage({ size: 'A4', margin: 56 })
    doc.rect(0, 0, 595, 842).fill(DARK)

    doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold').text('FULL TOOLKIT', 56, 56, { characterSpacing: 1.5 })
    doc.fontSize(28).fillColor(WHITE).font('Helvetica-Bold').text('Objection Scripts', 56, 78)
    rule(116)
    doc.moveDown(1.2)

    const objections = [
      {
        q: 'That is more than we usually pay.',
        a: 'I understand — my rate reflects specialist experience and the quality of output you will get. I am happy to scope a smaller initial project so you can see the value first. Would that work?',
      },
      {
        q: 'Can you do it for a fixed price?',
        a: 'Absolutely. Based on the scope, I would price this at ' + (rate.project || 'my standard project rate') + '. That covers everything we have discussed with no surprises.',
      },
      {
        q: 'We have a budget of X.',
        a: 'Thanks for sharing that. If the budget is fixed, I would need to reduce the scope to match it — let us talk about what the priority deliverables are and build from there.',
      },
      {
        q: 'We are comparing a few freelancers.',
        a: 'That makes sense. What I would say is — I am not the cheapest option, but clients come back to me because I deliver on time and communicate clearly throughout. Happy to share a reference.',
      },
      {
        q: 'Can we start small and see how it goes?',
        a: 'Definitely. I often do a paid discovery session first — it is a low-risk way for both of us to see if we are a good fit before committing to a larger piece of work.',
      },
    ]

    objections.forEach((o, i) => {
      if (doc.y > 700) {
        doc.addPage({ size: 'A4', margin: 56 })
        doc.rect(0, 0, 595, 842).fill(DARK)
      }
      doc.fontSize(10).fillColor(GREEN).font('Helvetica-Bold').text('OBJECTION ' + (i + 1))
      doc.fontSize(12).fillColor(WHITE).font('Helvetica-Bold').text(o.q, { lineGap: 3 })
      doc.moveDown(0.3)
      doc.fontSize(11).fillColor(MUTED).font('Helvetica').text(o.a, { lineGap: 4 })
      doc.moveDown(1)
    })

    // ── PAGE 4 — EMAIL TEMPLATES ──────────────────────────────────────────
    doc.addPage({ size: 'A4', margin: 56 })
    doc.rect(0, 0, 595, 842).fill(DARK)

    doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold').text('FULL TOOLKIT', 56, 56, { characterSpacing: 1.5 })
    doc.fontSize(28).fillColor(WHITE).font('Helvetica-Bold').text('Email Templates', 56, 78)
    rule(116)
    doc.moveDown(1.2)

    const templates = [
      {
        title: 'New enquiry — initial response',
        body:  'Subject: Re: Your project enquiry\n\nHi [Name],\n\nThanks for reaching out. Based on what you have described, this sounds like a great fit.\n\nI work at ' + (rate.dayRate || 'my standard rate') + '/day, and for a project of this scope I would estimate [X] days, bringing the total to approximately ' + (rate.project || 'my standard project rate') + '.\n\nI have availability from [date]. Happy to jump on a quick call — does [day/time] work?\n\nBest,\n[Your name]',
      },
      {
        title: 'Rate increase — existing client',
        body:  'Subject: A note on my rates from [Month]\n\nHi [Name],\n\nI wanted to give you advance notice that from [date] my day rate will be moving to ' + (rate.rangeHigh || 'my updated rate') + '.\n\nThis reflects the increasing demand for my work and the rising cost of running my practice. Any projects agreed before [date] will be at the current rate.\n\nI really value working with you and wanted you to hear this from me directly.\n\nBest,\n[Your name]',
      },
      {
        title: 'Following up after sending a quote',
        body:  'Subject: Following up — [Project name]\n\nHi [Name],\n\nJust checking in on the proposal I sent on [date]. I am keen to get started and have a window opening from [date] that would work well for this.\n\nLet me know if you have any questions or want to talk through any part of the scope.\n\nBest,\n[Your name]',
      },
    ]

    templates.forEach((t, i) => {
      if (doc.y > 650) {
        doc.addPage({ size: 'A4', margin: 56 })
        doc.rect(0, 0, 595, 842).fill(DARK)
      }
      doc.fontSize(10).fillColor(GREEN).font('Helvetica-Bold').text('TEMPLATE ' + (i + 1))
      doc.fontSize(13).fillColor(WHITE).font('Helvetica-Bold').text(t.title)
      doc.moveDown(0.4)
      doc.rect(56, doc.y, W, 1).fill('#1e2a38')
      doc.moveDown(0.4)
      doc.fontSize(10).fillColor(MUTED).font('Courier').text(t.body, { lineGap: 3 })
      doc.moveDown(1.2)
    })

    // ── PAGE 5 — RAISE YOUR RATES GUIDE ──────────────────────────────────
    doc.addPage({ size: 'A4', margin: 56 })
    doc.rect(0, 0, 595, 842).fill(DARK)

    doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold').text('FULL TOOLKIT', 56, 56, { characterSpacing: 1.5 })
    doc.fontSize(28).fillColor(WHITE).font('Helvetica-Bold').text('Raise Your Rates Guide', 56, 78)
    rule(116)
    doc.moveDown(1.2)

    const strategies = [
      'Raise for new clients first. Never touch existing client rates until you have tested the higher rate on 2 or 3 new projects.',
      'Anchor high in discovery calls. Quote your upper range first, then negotiate down if needed. Never start at your floor.',
      'Stop itemising your time. Quote a project price, not a day rate, to shift the conversation from cost to value.',
      'Specialise visibly. The more specific your niche, the less you compete on price. Generalists get commoditised.',
      'Raise after every 3 projects. If you are winning work easily, your rate is too low.',
      'Add a rush rate. Any project starting within 5 working days gets a 25% premium — this filters clients and rewards planning.',
      'Review retainers every 6 months. Retainer clients get a discount for reliability, not a permanent locked rate.',
      'Document your outcomes. Rates go up when you can say I increased conversions by 40% not just I built a website.',
      'Let some clients go. When you raise your rates, lower-budget clients fall away. That is not failure — that is positioning.',
      'Say your rate out loud daily. Confidence in quoting is a skill. Rehearse it like any other part of your craft.',
    ]

    strategies.forEach((s, i) => {
      if (doc.y > 730) {
        doc.addPage({ size: 'A4', margin: 56 })
        doc.rect(0, 0, 595, 842).fill(DARK)
      }
      doc.fontSize(10).fillColor(GREEN).font('Helvetica-Bold').text(String(i + 1).padStart(2, '0'))
      doc.fontSize(11).fillColor(WHITE).font('Helvetica').text(s, { lineGap: 4 })
      doc.moveDown(0.8)
    })

    // ── PAGE 6 — 6-MONTH ROADMAP ──────────────────────────────────────────
    doc.addPage({ size: 'A4', margin: 56 })
    doc.rect(0, 0, 595, 842).fill(DARK)

    doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold').text('FULL TOOLKIT', 56, 56, { characterSpacing: 1.5 })
    doc.fontSize(28).fillColor(WHITE).font('Helvetica-Bold').text('6-Month Rate Roadmap', 56, 78)
    rule(116)
    doc.moveDown(1.2)

    const roadmap = [
      { month: 'Month 1-2', title: 'Consolidate',       body: 'Charge ' + (rate.dayRate || 'your rate') + ' consistently. Do not discount. Track every project outcome.' },
      { month: 'Month 3',   title: 'Test the ceiling',  body: 'Quote ' + (rate.rangeHigh || 'your upper range') + ' to two new clients. See what happens. You may be surprised.' },
      { month: 'Month 4',   title: 'Review retainers',  body: 'Write to retainer clients with a rate review. Give 60 days notice. Frame it as a service improvement.' },
      { month: 'Month 5',   title: 'Raise the floor',   body: 'Stop taking projects below your minimum. Redirect those enquiries or decline politely.' },
      { month: 'Month 6',   title: 'Full rate increase', body: 'Apply your new rate across all new work. Update your website, proposals, and anywhere else your rate appears.' },
    ]

    roadmap.forEach(r => {
      if (doc.y > 700) {
        doc.addPage({ size: 'A4', margin: 56 })
        doc.rect(0, 0, 595, 842).fill(DARK)
      }
      const rowY = doc.y
      doc.rect(56, rowY, 4, 52).fill(GREEN)
      doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold').text(r.month.toUpperCase(), 72, rowY, { characterSpacing: 1 })
      doc.fontSize(13).fillColor(WHITE).font('Helvetica-Bold').text(r.title, 72, rowY + 14)
      doc.fontSize(11).fillColor(MUTED).font('Helvetica').text(r.body, 72, rowY + 32, { width: W - 20 })
      doc.moveDown(2.2)
    })

    // ── PAGE 7 — CLOSING ──────────────────────────────────────────────────
    doc.addPage({ size: 'A4', margin: 56 })
    doc.rect(0, 0, 595, 842).fill(DARK)

    doc.fontSize(22).fillColor(GREEN).font('Helvetica-Bold').text('Clarity', 56, 56, { continued: true })
       .fillColor(WHITE).text(' Costs')

    doc.fontSize(36).fillColor(WHITE).font('Helvetica-Bold').text('Your rate is ready.', 56, 200)
    doc.fontSize(36).fillColor(GREEN).font('Helvetica-Bold').text('Go charge it.', 56, 248)

    doc.fontSize(13).fillColor(MUTED).font('Helvetica')
       .text('You now have everything you need: your number, your script, your strategy.', 56, 320, { width: W, lineGap: 5 })
    doc.fontSize(13).fillColor(MUTED).font('Helvetica')
       .text('The only thing left is to use it.', 56, 370, { width: W })

    doc.fontSize(9).fillColor('#2a3a4a').font('Helvetica')
       .text('2025 Hello Clarity Ltd · Registered in England and Wales', 56, 800, { align: 'center', width: W })

    doc.end()
  })
}

export default async function handler(req, res) {
  const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rawBody = await getRawBody(req)
  const sig     = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).send('Webhook Error: ' + err.message)
  }

  if (event.type === 'checkout.session.completed') {
    const session  = event.data.object
    const resultId = session.metadata?.resultId
    const email    = session.metadata?.email || session.customer_email

    if (resultId) {
      const { error } = await supabase
        .from('results')
        .update({ paid: true, paid_at: new Date().toISOString(), session_id: session.id })
        .eq('id', resultId)
      if (error) console.error('Supabase update error:', error)
    }

    let result = null
    if (resultId) {
      const { data } = await supabase.from('results').select('*').eq('id', resultId).single()
      result = data
    }

    if (email && result) {
      const appUrl = process.env.VITE_APP_URL || 'https://claritycosts.co.uk'

      let pdfBuffer = null
      try {
        pdfBuffer = await buildPDF(result)
      } catch (err) {
        console.error('PDF generation error:', err)
      }

      try {
        await resend.emails.send({
          from:        process.env.RESEND_FROM_EMAIL || 'report@claritycosts.co.uk',
          to:          email,
          subject:     'Your Clarity Costs Full Toolkit — attached',
          attachments: pdfBuffer ? [{ filename: 'clarity-costs-full-toolkit.pdf', content: pdfBuffer.toString('base64') }] : [],
          html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:48px 20px;background:#080b12;font-family:Inter,-apple-system,sans-serif;color:rgba(255,255,255,.88);">
  <img src="${appUrl}/logo.png" height="30" alt="Clarity Costs" style="display:block;margin-bottom:32px;"/>
  <div style="background:rgba(0,232,122,.08);border:1px solid rgba(0,232,122,.25);border-radius:16px;padding:28px;margin-bottom:28px;text-align:center;">
    <div style="font-size:2.5rem;margin-bottom:8px;">&#10003;</div>
    <h2 style="font-size:1.4rem;font-weight:800;color:#fff;margin:0 0 8px;">Payment confirmed</h2>
    <p style="font-size:14px;color:rgba(255,255,255,.6);margin:0;">Your full toolkit PDF is attached to this email.</p>
  </div>
  <h2 style="font-size:1.2rem;font-weight:800;color:#fff;margin:0 0 12px;">What is in your PDF</h2>
  <ul style="font-size:14px;color:rgba(255,255,255,.6);line-height:2;padding-left:20px;margin:0 0 28px;">
    <li>Your personalised rate card</li>
    <li>5 objection-handling scripts</li>
    <li>3 email templates</li>
    <li>Raise Your Rates Guide (10 strategies)</li>
    <li>6-month rate roadmap</li>
  </ul>
  ${result.rate?.dayRate ? '<p style="font-size:15px;color:rgba(255,255,255,.6);margin-bottom:28px;">Your day rate: <strong style="color:#00e87a;font-size:1.3rem;">' + result.rate.dayRate + '</strong></p>' : ''}
  <a href="${appUrl}/results" style="display:inline-block;background:#00e87a;color:#000;font-size:15px;font-weight:700;padding:15px 36px;border-radius:999px;text-decoration:none;margin-bottom:40px;">View your results online</a>
  <hr style="border:none;border-top:1px solid rgba(255,255,255,.08);margin-bottom:28px;"/>
  <p style="font-size:11px;color:rgba(255,255,255,.2);line-height:1.8;margin:0;">2025 Hello Clarity Ltd · Registered in England and Wales</p>
</body>
</html>`,
        })
      } catch (err) {
        console.error('Email send error:', err)
      }
    }
  }

  return res.status(200).json({ received: true })
}
