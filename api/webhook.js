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
    const CARD  = '#0f1521'
    const W     = 595 - 112

    // ── Extract all data safely ───────────────────────────────────────────
    const rate        = result.rate        || {}
    const answers     = result.answers     || {}
    const positioning = result.positioning || ''
    const script      = result.script      || ''

    const dayRate   = rate.dayRate   || answers.dayRate   || '—'
    const rangeLow  = rate.rangeLow  || '—'
    const rangeHigh = rate.rangeHigh || '—'
    const project   = rate.project   || '—'
    const retainer  = rate.retainer  || '—'
    const monthly   = rate.monthly   || '—'
    const annual    = rate.annual    || '—'

    const specialty   = answers.specialty   || 'your discipline'
    const experience  = answers.experience  || 'your experience level'
    const location    = answers.location    || 'your region'
    const income      = answers.income      || 'your target income'
    const clients     = answers.clients     || 'your target clients'
    const email       = result.email        || ''

    // ── Helpers ───────────────────────────────────────────────────────────
    const rule = () => {
      doc.moveTo(56, doc.y).lineTo(56 + W, doc.y).strokeColor('#1e2a38').lineWidth(1).stroke()
      doc.moveDown(0.5)
    }

    const sectionHeader = (tag, title) => {
      doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold')
         .text(tag.toUpperCase(), { characterSpacing: 1.5 })
      doc.fontSize(24).fillColor(WHITE).font('Helvetica-Bold').text(title)
      doc.moveDown(0.3)
      rule()
    }

    const newPage = () => {
      doc.addPage({ size: 'A4', margin: 56 })
      doc.rect(0, 0, 595, 842).fill(DARK)
    }

    const footer = (text) => {
      doc.fontSize(8).fillColor('#2a3a4a').font('Helvetica')
         .text(text, 56, 800, { align: 'center', width: W })
    }

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 1 — COVER
    // ══════════════════════════════════════════════════════════════════════
    doc.rect(0, 0, 595, 842).fill(DARK)

    // Logo
    doc.fontSize(20).fillColor(GREEN).font('Helvetica-Bold')
       .text('Clarity', 56, 56, { continued: true })
       .fillColor(WHITE).text(' Costs')
    doc.fontSize(10).fillColor(MUTED).font('Helvetica')
       .text('claritycosts.co.uk', 56, 82)

    // Prepared for
    doc.fontSize(10).fillColor(MUTED).font('Helvetica')
       .text('Prepared for: ' + email, 56, 112)
    doc.fontSize(10).fillColor(MUTED).font('Helvetica')
       .text('Generated: ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), 56, 128)

    // Main rate
    doc.fontSize(11).fillColor(MUTED).font('Helvetica')
       .text('YOUR RECOMMENDED DAY RATE', 56, 210, { characterSpacing: 1.5 })
    doc.fontSize(80).fillColor(GREEN).font('Helvetica-Bold')
       .text(dayRate, 56, 228)
    doc.fontSize(16).fillColor(MUTED).font('Helvetica')
       .text('per day · ex. VAT', 56, 318)

    // Rate grid
    const gridY = 370
    const colW  = W / 3
    const grid  = [
      { l: 'Market Range',  v: rangeLow + ' – ' + rangeHigh },
      { l: 'Project Rate',  v: project },
      { l: 'Retainer/mo',   v: retainer },
      { l: 'Monthly',       v: monthly },
      { l: 'Annual',        v: annual },
      { l: 'Specialty',     v: specialty },
    ]
    grid.forEach((c, i) => {
      const x = 56 + (i % 3) * colW
      const y = gridY + Math.floor(i / 3) * 70
      doc.rect(x, y, colW - 8, 60).fill(CARD)
      doc.fontSize(8).fillColor(MUTED).font('Helvetica')
         .text(c.l.toUpperCase(), x + 10, y + 10, { characterSpacing: 0.8 })
      doc.fontSize(14).fillColor(WHITE).font('Helvetica-Bold')
         .text(c.v, x + 10, y + 28, { width: colW - 20 })
    })

    // About you
    const aboutY = gridY + 160
    doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold')
       .text('ABOUT YOU', 56, aboutY, { characterSpacing: 1.5 })
    doc.moveDown(0.3)
    const about = [
      ['Specialty',   specialty],
      ['Experience',  experience],
      ['Location',    location],
      ['Target income', income],
      ['Client type', clients],
    ]
    about.forEach(([label, value]) => {
      doc.fontSize(10).fillColor(MUTED).font('Helvetica')
         .text(label + ':', 56, doc.y, { continued: true, width: 140 })
         .fillColor(WHITE).font('Helvetica-Bold').text(' ' + value)
    })

    footer('2025 Hello Clarity Ltd · Registered in England and Wales · Confidential')

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 2 — POSITIONING & CHARGE SCRIPT
    // ══════════════════════════════════════════════════════════════════════
    newPage()
    sectionHeader('Your Toolkit', 'Positioning & Script')

    doc.fontSize(11).fillColor(GREEN).font('Helvetica-Bold').text('YOUR POSITIONING STATEMENT')
    doc.moveDown(0.3)
    doc.rect(56, doc.y, W, 2).fill(GREEN)
    doc.moveDown(0.5)
    doc.fontSize(13).fillColor(WHITE).font('Helvetica-Oblique')
       .text('"' + positioning + '"', { lineGap: 5, width: W })

    doc.moveDown(1.5)
    doc.fontSize(11).fillColor(GREEN).font('Helvetica-Bold').text('YOUR CHARGE SCRIPT')
    doc.moveDown(0.3)
    doc.rect(56, doc.y, W, 2).fill(GREEN)
    doc.moveDown(0.5)
    doc.rect(56, doc.y, W, 80).fill(CARD)
    const scriptY = doc.y + 12
    doc.fontSize(12).fillColor(WHITE).font('Helvetica')
       .text('"' + script + '"', 68, scriptY, { width: W - 24, lineGap: 5 })
    doc.moveDown(4)

    doc.moveDown(1)
    doc.rect(56, doc.y, W, 44).fill('#061510')
    const tipY = doc.y + 10
    doc.fontSize(10).fillColor(GREEN).font('Helvetica-Bold').text('TIP', 68, tipY)
    doc.fontSize(10).fillColor(MUTED).font('Helvetica-Oblique')
       .text('Practise saying your rate out loud before your next call. Confidence comes from repetition, not certainty.', 68, tipY + 14, { width: W - 24 })

    footer('2025 Hello Clarity Ltd · claritycosts.co.uk')

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 3 — OBJECTION SCRIPTS
    // ══════════════════════════════════════════════════════════════════════
    newPage()
    sectionHeader('Full Toolkit', '5 Objection Scripts')

    const objections = [
      {
        q: 'That is more than we usually pay.',
        a: 'I understand — my rate reflects ' + experience + ' of specialist experience in ' + specialty + ' and the quality of output you will get. I am happy to scope a smaller initial project at ' + project + ' so you can see the value first. Would that work?',
      },
      {
        q: 'Can you do it for a fixed price?',
        a: 'Absolutely. Based on the scope, I would price this at ' + project + '. That covers everything we have discussed with no surprises — and you know the total cost upfront.',
      },
      {
        q: 'We have a tight budget.',
        a: 'If the budget is fixed, let us reduce the scope to match it. Tell me the priority deliverables and I will build from there. I would rather do a smaller piece of work well than a large piece badly.',
      },
      {
        q: 'We are comparing a few freelancers.',
        a: 'That makes sense. What I would say is — I am not the cheapest option, but clients come back to me because I deliver on time and communicate clearly throughout. Happy to share a reference from a similar project.',
      },
      {
        q: 'Can we start small and see how it goes?',
        a: 'Definitely. I often begin with a paid discovery session — it is a low-risk way for both of us to see if we are a good fit before committing to a larger piece of work. I can send you details of how that works.',
      },
    ]

    objections.forEach((o, i) => {
      if (doc.y > 680) { newPage() }
      doc.rect(56, doc.y, W, 1).fill('#1e2a38')
      doc.moveDown(0.5)
      doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold')
         .text('OBJECTION ' + (i + 1), { characterSpacing: 1 })
      doc.fontSize(12).fillColor(WHITE).font('Helvetica-Bold')
         .text(o.q, { lineGap: 2 })
      doc.moveDown(0.3)
      doc.fontSize(11).fillColor(MUTED).font('Helvetica')
         .text(o.a, { lineGap: 4, width: W })
      doc.moveDown(0.8)
    })

    footer('2025 Hello Clarity Ltd · claritycosts.co.uk')

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 4 — EMAIL TEMPLATES
    // ══════════════════════════════════════════════════════════════════════
    newPage()
    sectionHeader('Full Toolkit', '3 Email Templates')

    const templates = [
      {
        title: 'New enquiry — initial response',
        body:  'Subject: Re: Your project enquiry\n\nHi [Name],\n\nThanks for reaching out. Based on what you have described, this sounds like a great fit for my work in ' + specialty + '.\n\nMy day rate is ' + dayRate + ', and for a project of this scope I would estimate 5 days, bringing the total to approximately ' + project + '.\n\nI have availability from [date]. Happy to jump on a quick call — does [day/time] work?\n\nBest,\n[Your name]',
      },
      {
        title: 'Rate increase — existing client',
        body:  'Subject: A note on my rates from [Month]\n\nHi [Name],\n\nI wanted to give you advance notice that from [date] my day rate will be moving to ' + rangeHigh + '.\n\nThis reflects the increasing demand for my ' + specialty + ' work and the rising cost of running my practice. Any projects agreed before [date] will remain at ' + dayRate + '.\n\nI really value working with you and wanted you to hear this from me directly.\n\nBest,\n[Your name]',
      },
      {
        title: 'Following up after sending a quote',
        body:  'Subject: Following up — [Project name]\n\nHi [Name],\n\nJust checking in on the proposal I sent on [date] for ' + project + '. I am keen to get started and have a window opening from [date] that would work well for this project.\n\nLet me know if you have any questions or want to talk through any part of the scope.\n\nBest,\n[Your name]',
      },
    ]

    templates.forEach((t, i) => {
      if (doc.y > 620) { newPage() }
      doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold')
         .text('TEMPLATE ' + (i + 1), { characterSpacing: 1 })
      doc.fontSize(13).fillColor(WHITE).font('Helvetica-Bold').text(t.title)
      doc.moveDown(0.3)
      doc.rect(56, doc.y, W, 1).fill('#1e2a38')
      doc.moveDown(0.4)
      doc.fontSize(10).fillColor(MUTED).font('Courier')
         .text(t.body, { lineGap: 3, width: W })
      doc.moveDown(1.2)
    })

    footer('2025 Hello Clarity Ltd · claritycosts.co.uk')

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 5 — RAISE YOUR RATES GUIDE
    // ══════════════════════════════════════════════════════════════════════
    newPage()
    sectionHeader('Full Toolkit', 'Raise Your Rates Guide')

    const strategies = [
      'Raise for new clients first. Never touch existing client rates until you have tested ' + rangeHigh + ' on 2 or 3 new projects successfully.',
      'Anchor high in discovery calls. Open with ' + rangeHigh + ', then negotiate down if needed. Never open at ' + dayRate + ' — that is your floor, not your ceiling.',
      'Stop itemising your time. Quote ' + project + ' as a project price, not a day rate. This shifts the conversation from cost to value.',
      'Specialise visibly as a ' + specialty + ' expert. The more specific your niche, the less you compete on price. Generalists get commoditised.',
      'Raise after every 3 projects. If you are winning ' + specialty + ' work easily at ' + dayRate + ', your rate is too low.',
      'Add a rush rate. Any project starting within 5 working days gets a 25% premium — this filters clients and rewards good planning.',
      'Review retainers every 6 months. Your current retainer of ' + retainer + '/month is a starting point, not a permanent rate.',
      'Document your outcomes. Rates go up when you can say "I delivered X result for a ' + clients + ' client" not just "I did ' + specialty + ' work".',
      'Let some clients go. When you raise to ' + rangeHigh + ', lower-budget clients may fall away. That is positioning, not failure.',
      'Say your rate out loud daily. Before every call, say "My rate is ' + dayRate + '/day." Confidence in quoting is a skill built through repetition.',
    ]

    strategies.forEach((s, i) => {
      if (doc.y > 720) { newPage() }
      doc.fontSize(10).fillColor(GREEN).font('Helvetica-Bold')
         .text(String(i + 1).padStart(2, '0'), { continued: true })
         .fillColor(WHITE).font('Helvetica').text('  ' + s, { lineGap: 4, width: W })
      doc.moveDown(0.7)
    })

    footer('2025 Hello Clarity Ltd · claritycosts.co.uk')

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 6 — 6-MONTH ROADMAP
    // ══════════════════════════════════════════════════════════════════════
    newPage()
    sectionHeader('Full Toolkit', '6-Month Rate Roadmap')

    const roadmap = [
      {
        month: 'Month 1–2',
        title: 'Consolidate at ' + dayRate,
        body:  'Charge ' + dayRate + ' consistently across all new work. Do not discount. Track every project outcome — client name, result delivered, value created. This becomes your evidence base.',
      },
      {
        month: 'Month 3',
        title: 'Test the ceiling at ' + rangeHigh,
        body:  'Quote ' + rangeHigh + ' to the next two new ' + clients + ' clients. Do not explain or apologise. See what happens. Many freelancers are surprised to find it is accepted.',
      },
      {
        month: 'Month 4',
        title: 'Review your retainer clients',
        body:  'Write to any clients on a retainer. Your current benchmark is ' + retainer + '/month. Give 60 days notice of a rate review. Frame it as a reflection of growing demand and improved service.',
      },
      {
        month: 'Month 5',
        title: 'Raise the project floor to ' + project,
        body:  'Stop accepting projects below ' + project + '. Redirect smaller enquiries politely or decline. Use the freed capacity for higher-value work or business development.',
      },
      {
        month: 'Month 6',
        title: 'Full rate increase',
        body:  'Apply ' + rangeHigh + ' as your new standard rate across all new work. Update your website, proposals, LinkedIn, and any platforms where your rate appears. You have earned it.',
      },
    ]

    roadmap.forEach(r => {
      if (doc.y > 680) { newPage() }
      const rowY = doc.y
      doc.rect(56, rowY, 4, 64).fill(GREEN)
      doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold')
         .text(r.month.toUpperCase(), 70, rowY, { characterSpacing: 1 })
      doc.fontSize(13).fillColor(WHITE).font('Helvetica-Bold')
         .text(r.title, 70, rowY + 14)
      doc.fontSize(11).fillColor(MUTED).font('Helvetica')
         .text(r.body, 70, rowY + 32, { width: W - 20, lineGap: 3 })
      doc.moveDown(3)
    })

    footer('2025 Hello Clarity Ltd · claritycosts.co.uk')

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 7 — CLOSING
    // ══════════════════════════════════════════════════════════════════════
    newPage()

    doc.fontSize(20).fillColor(GREEN).font('Helvetica-Bold')
       .text('Clarity', 56, 56, { continued: true })
       .fillColor(WHITE).text(' Costs')

    doc.fontSize(40).fillColor(WHITE).font('Helvetica-Bold')
       .text('Your rate is ' + dayRate + '.', 56, 200, { width: W })
    doc.fontSize(40).fillColor(GREEN).font('Helvetica-Bold')
       .text('Go charge it.', 56, 256)

    doc.fontSize(14).fillColor(MUTED).font('Helvetica')
       .text('You now have everything you need: your number, your script, your strategy, and your roadmap.', 56, 340, { width: W, lineGap: 5 })
    doc.moveDown(0.8)
    doc.fontSize(14).fillColor(MUTED).font('Helvetica')
       .text('The only thing left is to use it.', { width: W })

    doc.moveDown(2)
    doc.rect(56, doc.y, W, 1).fill('#1e2a38')
    doc.moveDown(1)
    doc.fontSize(11).fillColor(MUTED).font('Helvetica').text('Your summary', { width: W })
    doc.moveDown(0.4)
    const summary = [
      ['Day rate',         dayRate],
      ['Market range',     rangeLow + ' – ' + rangeHigh],
      ['Project rate',     project],
      ['Monthly retainer', retainer],
      ['Specialty',        specialty],
      ['Location',         location],
    ]
    summary.forEach(([label, value]) => {
      doc.fontSize(11).fillColor(MUTED).font('Helvetica')
         .text(label + ':', 56, doc.y, { continued: true, width: 180 })
         .fillColor(WHITE).font('Helvetica-Bold').text(' ' + value)
    })

    footer('2025 Hello Clarity Ltd · Registered in England and Wales · claritycosts.co.uk')

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
      const dayRate = result.rate?.dayRate || '—'

      let pdfBuffer = null
      try {
        pdfBuffer = await buildPDF(result)
        console.log('PDF generated successfully, size:', pdfBuffer.length)
      } catch (err) {
        console.error('PDF generation error:', err)
      }

      try {
        await resend.emails.send({
          from:        process.env.RESEND_FROM_EMAIL || 'report@claritycosts.co.uk',
          to:          email,
          subject:     'Your Clarity Costs Full Toolkit — ' + dayRate + '/day',
          attachments: pdfBuffer ? [{ filename: 'clarity-costs-full-toolkit.pdf', content: pdfBuffer.toString('base64') }] : [],
          html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:48px 20px;background:#080b12;font-family:Inter,-apple-system,sans-serif;color:rgba(255,255,255,.88);">
  <div style="max-width:600px;margin:0 auto;">
    <div style="font-size:20px;font-weight:900;margin-bottom:32px;">
      <span style="color:#00e87a;">Clarity</span><span style="color:#ffffff;"> Costs</span>
    </div>
    <div style="background:rgba(0,232,122,.08);border:1px solid rgba(0,232,122,.25);border-radius:16px;padding:28px;margin-bottom:28px;text-align:center;">
      <div style="font-size:2rem;margin-bottom:8px;color:#00e87a;">&#10003;</div>
      <h2 style="font-size:1.4rem;font-weight:800;color:#fff;margin:0 0 8px;">Payment confirmed</h2>
      <p style="font-size:14px;color:rgba(255,255,255,.6);margin:0;">Your full toolkit PDF is attached to this email.</p>
    </div>
    <p style="font-size:15px;color:rgba(255,255,255,.6);margin-bottom:8px;">Your day rate:</p>
    <div style="font-size:2.5rem;font-weight:900;color:#00e87a;margin-bottom:28px;">${dayRate}</div>
    <h2 style="font-size:1.1rem;font-weight:800;color:#fff;margin:0 0 12px;">What is in your PDF</h2>
    <ul style="font-size:14px;color:rgba(255,255,255,.6);line-height:2.2;padding-left:20px;margin:0 0 32px;">
      <li>Personalised rate card with all your figures</li>
      <li>Your positioning statement and charge script</li>
      <li>5 objection-handling scripts using your rates</li>
      <li>3 email templates with your actual numbers</li>
      <li>Raise Your Rates Guide — 10 personalised strategies</li>
      <li>6-month roadmap with your specific rate targets</li>
    </ul>
    <a href="${appUrl}/results" style="display:inline-block;background:#00e87a;color:#000;font-size:15px;font-weight:700;padding:15px 36px;border-radius:999px;text-decoration:none;margin-bottom:32px;">View your results online</a>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,.08);margin-bottom:24px;"/>
    <p style="font-size:11px;color:rgba(255,255,255,.2);line-height:1.8;margin:0;">
      2025 Hello Clarity Ltd · Registered in England and Wales<br/>
      Questions? Email hello@claritycosts.co.uk
    </p>
  </div>
</body>
</html>`,
        })
        console.log('Email sent successfully to', email)
      } catch (err) {
        console.error('Email send error:', err)
      }
    }
  }

  return res.status(200).json({ received: true })
}
