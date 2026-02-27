import Stripe from 'stripe'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import PDFDocument from 'pdfkit'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

function fmt(val) {
  if (!val && val !== 0) return '—'
  const num = typeof val === 'number' ? val : parseInt(String(val).replace(/[^0-9]/g, ''), 10)
  if (isNaN(num)) return String(val)
  return '£' + num.toLocaleString('en-GB')
}

async function generatePDF(rates, answers) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' })
    const chunks = []
    doc.on('data', chunk => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const navy = '#0f1e35'
    const gold = '#f0c040'
    const slate = '#64748b'
    const light = '#f8fafc'
    const green = '#166534'
    const greenBg = '#f0fdf4'

    const specialty = answers?.discipline || 'Freelancer'
    const location = answers?.location || 'UK'
    const experience = answers?.experience || ''

    // ── COVER PAGE ──
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(navy)

    // Gold accent bar
    doc.rect(0, 0, 6, doc.page.height).fill(gold)

    // Logo area
    doc.fontSize(13).fillColor(gold).font('Helvetica-Bold')
      .text('CLARITY COSTS', 70, 60, { characterSpacing: 3 })

    // Main headline
    doc.fontSize(38).fillColor('#ffffff').font('Helvetica-Bold')
      .text('Your Full', 70, 160)
      .text('Rate Card', 70, 205)
      .text('Report', 70, 250)

    // Gold underline
    doc.rect(70, 300, 120, 3).fill(gold)

    // Subtitle
    doc.fontSize(14).fillColor('rgba(255,255,255,0.7)').font('Helvetica')
      .text(`${specialty} · ${location}${experience ? ' · ' + experience : ''}`, 70, 318)

    // Rates preview on cover
    doc.rect(70, 370, doc.page.width - 140, 160).fill('rgba(255,255,255,0.06)').stroke('rgba(255,255,255,0.1)')

    const rateItems = [
      { label: 'DAY RATE', value: fmt(rates?.dayRate) },
      { label: 'PROJECT RATE', value: fmt(rates?.projectRate) },
      { label: 'MONTHLY RETAINER', value: fmt(rates?.retainerRate) },
    ]

    rateItems.forEach((item, i) => {
      const y = 395 + (i * 44)
      doc.fontSize(10).fillColor('rgba(255,255,255,0.5)').font('Helvetica-Bold')
        .text(item.label, 95, y, { characterSpacing: 1.5 })
      doc.fontSize(22).fillColor(gold).font('Helvetica-Bold')
        .text(item.value, 95, y + 14)
    })

    // Footer
    doc.fontSize(11).fillColor('rgba(255,255,255,0.35)').font('Helvetica')
      .text('claritycosts.co.uk', 70, doc.page.height - 60)
      .text(`Generated ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, 70, doc.page.height - 44)

    // ── PAGE 2: YOUR RATES ──
    doc.addPage()

    // Page header
    doc.rect(0, 0, doc.page.width, 8).fill(gold)
    doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
      .text('CLARITY COSTS · YOUR RATE CARD', 50, 28, { characterSpacing: 1.5 })
    doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')

    doc.fontSize(26).fillColor(navy).font('Helvetica-Bold').text('Your Rates', 50, 66)
    if (rates?.headline) {
      doc.fontSize(13).fillColor(slate).font('Helvetica').text(rates.headline, 50, 100)
    }

    let y = rates?.headline ? 130 : 110

    // Rate cards
    const rateCards = [
      {
        icon: '💰', label: 'Day Rate', value: fmt(rates?.dayRate),
        range: rates?.dayRateRange ? `Market range: ${fmt(rates.dayRateRange.low)} – ${fmt(rates.dayRateRange.high)}` : null,
        desc: 'Your recommended daily rate for project-based and ad-hoc work.',
      },
      {
        icon: '📁', label: 'Project Rate', value: fmt(rates?.projectRate),
        range: rates?.projectRateRange ? `Market range: ${fmt(rates.projectRateRange.low)} – ${fmt(rates.projectRateRange.high)}` : null,
        desc: 'A fixed-price rate for defined scope projects.',
      },
      {
        icon: '📅', label: 'Monthly Retainer', value: fmt(rates?.retainerRate),
        range: rates?.retainerRateRange ? `Market range: ${fmt(rates.retainerRateRange.low)} – ${fmt(rates.retainerRateRange.high)}` : null,
        desc: 'Ongoing monthly commitment rate for retained clients.',
      },
    ]

    rateCards.forEach(card => {
      doc.rect(50, y, doc.page.width - 100, 88).fill(light).stroke('#e2e8f0')
      doc.rect(50, y, 4, 88).fill(gold)

      doc.fontSize(11).fillColor(slate).font('Helvetica-Bold')
        .text(card.label.toUpperCase(), 70, y + 14, { characterSpacing: 1 })
      doc.fontSize(28).fillColor(navy).font('Helvetica-Bold')
        .text(card.value, 70, y + 28)
      if (card.range) {
        doc.fontSize(10).fillColor(slate).font('Helvetica').text(card.range, 70, y + 62)
      }
      doc.fontSize(10).fillColor(slate).font('Helvetica')
        .text(card.desc, 280, y + 30, { width: 240, lineGap: 3 })

      y += 100
    })

    // Positioning
    if (rates?.positioningStatement) {
      y += 10
      doc.fontSize(14).fillColor(navy).font('Helvetica-Bold').text('Your Positioning', 50, y)
      y += 22
      doc.rect(50, y, doc.page.width - 100, 2).fill(gold)
      y += 12
      doc.fontSize(12).fillColor('#1e293b').font('Helvetica')
        .text(rates.positioningStatement, 50, y, { width: doc.page.width - 100, lineGap: 4 })
      y += doc.heightOfString(rates.positioningStatement, { width: doc.page.width - 100 }) + 20
    }

    // Confidence tip
    if (rates?.confidenceTip) {
      doc.rect(50, y, doc.page.width - 100, 60).fill(greenBg).stroke('#bbf7d0')
      doc.fontSize(10).fillColor(green).font('Helvetica-Bold')
        .text('⚡ CONFIDENCE TIP', 66, y + 12, { characterSpacing: 1 })
      doc.fontSize(11).fillColor(green).font('Helvetica')
        .text(rates.confidenceTip, 66, y + 26, { width: doc.page.width - 132, lineGap: 3 })
    }

    // ── PAGE 3: CHARGE SCRIPTS ──
    doc.addPage()
    doc.rect(0, 0, doc.page.width, 8).fill(gold)
    doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
      .text('CLARITY COSTS · YOUR RATE CARD', 50, 28, { characterSpacing: 1.5 })
    doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')

    doc.fontSize(26).fillColor(navy).font('Helvetica-Bold').text('Charge Scripts', 50, 66)
    doc.fontSize(13).fillColor(slate).font('Helvetica')
      .text('Exactly what to say — word for word', 50, 100)

    y = 130

    // Main charge script
    if (rates?.chargeScript) {
      doc.rect(50, y, doc.page.width - 100, 12).fill(navy)
      doc.fontSize(10).fillColor(gold).font('Helvetica-Bold')
        .text('YOUR MAIN CHARGE SCRIPT', 62, y + 2, { characterSpacing: 1 })
      y += 20
      doc.rect(50, y, doc.page.width - 100, 4).fill(gold)
      y += 14

      const scriptHeight = doc.heightOfString(`"${rates.chargeScript}"`, { width: doc.page.width - 132, lineGap: 5 }) + 24
      doc.rect(50, y, doc.page.width - 100, scriptHeight).fill('#fffbeb').stroke('#fde68a')
      doc.rect(50, y, 4, scriptHeight).fill(gold)
      doc.fontSize(12).fillColor('#78350f').font('Helvetica-Oblique')
        .text(`"${rates.chargeScript}"`, 68, y + 12, { width: doc.page.width - 132, lineGap: 5 })
      y += scriptHeight + 20

      doc.fontSize(11).fillColor(slate).font('Helvetica')
        .text('After saying this — pause. Don\'t fill the silence. The client is processing, not objecting.', 50, y, { width: doc.page.width - 100, lineGap: 3 })
      y += 36
    }

    // Objection scripts
    const objections = [
      {
        trigger: '"That\'s too expensive"',
        response: `"I understand it's a significant investment. What's your budget for this? I'd like to understand if there's a version of this project that works for both of us — or whether it makes sense for me to refer you to someone who might be a better fit at your price point."`,
      },
      {
        trigger: '"Can you do it cheaper?"',
        response: `"I can reduce the scope to bring the cost down — what's least important to you? Alternatively, my rate is my rate. What I can offer is certainty: I deliver on time, to brief, without revisions drama."`,
      },
      {
        trigger: '"Someone else quoted less"',
        response: `"That's good to know. If they're the right fit, go with them — I mean that genuinely. My rate reflects the speed and certainty I bring. If you come back, I'm here."`,
      },
      {
        trigger: '"We don\'t have the budget right now"',
        response: `"Understood. When does budget typically free up? I'm happy to hold a slot for you next quarter if the work is a good fit. Shall I reach out in [month]?"`,
      },
      {
        trigger: '"Can we do a trial at a lower rate?"',
        response: `"I don't do reduced rates for trials — in my experience it sets the wrong dynamic. What I can offer is a smaller first project so you can see how I work before committing to a larger engagement."`,
      },
    ]

    doc.fontSize(14).fillColor(navy).font('Helvetica-Bold').text('Objection Handling Scripts', 50, y)
    y += 22
    doc.rect(50, y, doc.page.width - 100, 2).fill(gold)
    y += 14

    objections.forEach(obj => {
      if (y > 650) {
        doc.addPage()
        doc.rect(0, 0, doc.page.width, 8).fill(gold)
        doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
          .text('CLARITY COSTS · OBJECTION SCRIPTS', 50, 28, { characterSpacing: 1.5 })
        doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')
        y = 66
      }

      doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
        .text('WHEN THEY SAY:', 50, y, { characterSpacing: 1 })
      doc.fontSize(12).fillColor(navy).font('Helvetica-Bold').text(obj.trigger, 50, y + 14)
      y += 32

      const respHeight = doc.heightOfString(obj.response, { width: doc.page.width - 132, lineGap: 4 }) + 20
      doc.rect(50, y, doc.page.width - 100, respHeight).fill(light).stroke('#e2e8f0')
      doc.rect(50, y, 4, respHeight).fill('#94a3b8')
      doc.fontSize(11).fillColor('#334155').font('Helvetica-Oblique')
        .text(obj.response, 68, y + 10, { width: doc.page.width - 132, lineGap: 4 })
      y += respHeight + 16
    })

    // ── PAGE 4: RAISE YOUR RATES GUIDE ──
    doc.addPage()
    doc.rect(0, 0, doc.page.width, 8).fill(gold)
    doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
      .text('CLARITY COSTS · RAISE YOUR RATES', 50, 28, { characterSpacing: 1.5 })
    doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')

    doc.fontSize(26).fillColor(navy).font('Helvetica-Bold').text('Raise Your Rates', 50, 66)
    doc.fontSize(13).fillColor(slate).font('Helvetica')
      .text('10 strategies built for your exact situation', 50, 100)

    y = 130

    const strategies = [
      {
        title: 'Anchor with your highest rate first',
        body: `Always lead with your day rate — not your retainer or a lower number. The first number anchors expectations. If you open with ${fmt(rates?.retainerRate)} and then mention ${fmt(rates?.dayRate)}, the day rate feels expensive. Lead with ${fmt(rates?.dayRate)} and everything else feels reasonable by comparison.`,
      },
      {
        title: 'Stop justifying unprompted',
        body: 'When you explain your rate before anyone asks, you signal uncertainty. State your rate, then stop talking. Silence after quoting is not rejection — it\'s the client processing. The next person who speaks is at a disadvantage. Let it be them.',
      },
      {
        title: 'Raise 15–20% with your next new client',
        body: `Your next new client has no reference point for your previous rates. The time to raise is with a new enquiry, not an existing client. Test ${fmt(Math.round((rates?.dayRate || 500) * 1.175 / 5) * 5)} on your next proposal. If they accept without flinching, raise again on the one after.`,
      },
      {
        title: 'Reframe cost as value delivered',
        body: 'Before you quote, ask: "What does this project need to achieve for it to be worth the investment?" This one question shifts the conversation from your cost to their outcome — and makes your rate feel small compared to the result.',
      },
      {
        title: 'Review and raise every 6 months',
        body: 'Set a calendar reminder for 6 months from today. If you haven\'t been turned down on price at least twice in that period, your rates are too low. Two rejections per month is healthy. Zero rejections means you\'re leaving money on every single project.',
      },
      {
        title: 'Use the retainer to escape the feast-famine cycle',
        body: `A ${fmt(rates?.retainerRate)}/month retainer from one good client covers your baseline costs. When you have that security, you quote higher on everything else — because you can afford to walk away. Lead conversations toward retainers wherever the work suits it.`,
      },
      {
        title: 'Never discount — reframe instead',
        body: 'If a client can\'t meet your rate, reduce scope, not price. "I can do the core deliverables for that budget — we\'d need to remove X and Y." This protects your rate integrity and keeps you in the conversation without devaluing your time.',
      },
      {
        title: 'Charge more for urgency',
        body: 'Rush work, tight deadlines, and "can you start Monday?" requests should carry a premium of 25–50%. Your time is a finite resource. Urgency isn\'t a client\'s problem to solve — it\'s a service you provide, and it costs more.',
      },
      {
        title: 'Position before you price',
        body: `"${rates?.headline || specialty + ' specialist'}" lands very differently from "I do ${specialty?.toLowerCase() || 'freelance work'}". Before you quote in any conversation, say your headline. Position first, price second — in that order, every time.`,
      },
      {
        title: 'Track rejections as data, not failure',
        body: 'Every time someone says your rate is too high, record it. If you track 20 proposals and only 1 declines on price — raise your rates immediately. You\'re almost certainly undercharging. The rejection rate you\'re aiming for is 15–25%.',
      },
    ]

    strategies.forEach((s, i) => {
      if (y > 680) {
        doc.addPage()
        doc.rect(0, 0, doc.page.width, 8).fill(gold)
        doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
          .text('CLARITY COSTS · RAISE YOUR RATES', 50, 28, { characterSpacing: 1.5 })
        doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')
        y = 66
      }

      // Number circle
      doc.circle(63, y + 8, 11).fill(navy)
      doc.fontSize(10).fillColor(gold).font('Helvetica-Bold')
        .text(`${i + 1}`, 58, y + 3)

      doc.fontSize(13).fillColor(navy).font('Helvetica-Bold').text(s.title, 84, y)
      y += 18
      const bodyHeight = doc.heightOfString(s.body, { width: doc.page.width - 134, lineGap: 3 })
      doc.fontSize(11).fillColor('#334155').font('Helvetica')
        .text(s.body, 84, y, { width: doc.page.width - 134, lineGap: 3 })
      y += bodyHeight + 18
    })

    // ── PAGE 5: EMAIL TEMPLATES ──
    doc.addPage()
    doc.rect(0, 0, doc.page.width, 8).fill(gold)
    doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
      .text('CLARITY COSTS · EMAIL TEMPLATES', 50, 28, { characterSpacing: 1.5 })
    doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')

    doc.fontSize(26).fillColor(navy).font('Helvetica-Bold').text('Email Templates', 50, 66)
    doc.fontSize(13).fillColor(slate).font('Helvetica')
      .text('Copy, paste, adapt — and send with confidence', 50, 100)

    y = 130

    const emailTemplates = [
      {
        subject: 'Quote for [Project Name]',
        label: 'Quoting a new project',
        body: `Hi [Name],

Thanks for getting in touch. Based on what you've described, here's how I'd approach this:

[Brief 2-sentence description of their project and your approach]

Investment: ${fmt(rates?.projectRate)} + VAT

This covers [scope items]. My availability is [dates]. To get started, I'd need a 50% deposit.

Any questions, just ask.

[Your name]`,
      },
      {
        subject: 'Re: [Project] — Revised Scope',
        label: 'Responding to a budget pushback',
        body: `Hi [Name],

Understood on the budget. To bring this in at [their budget], I'd suggest we adjust the scope:

Remove: [item 1]
Remove: [item 2]
Keep: [core deliverable]

That brings it to [reduced price] + VAT. If that works, I can send over a revised brief for sign-off.

Alternatively, if the full scope is important, I can look at phasing the work across two invoices.

Let me know which direction makes sense.

[Your name]`,
      },
      {
        subject: 'Following up — [Project Name]',
        label: 'Following up on an unanswered quote',
        body: `Hi [Name],

Just following up on the quote I sent on [date]. Happy to answer any questions if you're still considering it.

If the timing or budget has changed, no problem — I'd rather know so I can plan accordingly.

[Your name]`,
      },
      {
        subject: 'Retainer proposal — [Month] onwards',
        label: 'Pitching a retainer',
        body: `Hi [Name],

Now that [project/period] is wrapping up, I wanted to raise the idea of a retainer arrangement.

Based on the work we've been doing, a monthly retainer of ${fmt(rates?.retainerRate)} + VAT would cover [X hours/deliverables per month]. This gives you guaranteed access to my time and priority scheduling.

Happy to jump on a call to talk through how that might work. Would [day] suit you?

[Your name]`,
      },
    ]

    emailTemplates.forEach(template => {
      if (y > 620) {
        doc.addPage()
        doc.rect(0, 0, doc.page.width, 8).fill(gold)
        doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
          .text('CLARITY COSTS · EMAIL TEMPLATES', 50, 28, { characterSpacing: 1.5 })
        doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')
        y = 66
      }

      doc.fontSize(12).fillColor(navy).font('Helvetica-Bold').text(template.label, 50, y)
      y += 16
      doc.fontSize(10).fillColor(slate).font('Helvetica')
        .text(`Subject: ${template.subject}`, 50, y)
      y += 14

      const bodyH = doc.heightOfString(template.body, { width: doc.page.width - 116, lineGap: 3 }) + 20
      doc.rect(50, y, doc.page.width - 100, bodyH).fill(light).stroke('#e2e8f0')
      doc.rect(50, y, 4, bodyH).fill(gold)
      doc.fontSize(10).fillColor('#334155').font('Helvetica')
        .text(template.body, 68, y + 10, { width: doc.page.width - 132, lineGap: 3 })
      y += bodyH + 20
    })

    // ── PAGE 6: 6-MONTH ROADMAP ──
    doc.addPage()
    doc.rect(0, 0, doc.page.width, 8).fill(gold)
    doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
      .text('CLARITY COSTS · 6-MONTH ROADMAP', 50, 28, { characterSpacing: 1.5 })
    doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')

    doc.fontSize(26).fillColor(navy).font('Helvetica-Bold').text('Your 6-Month Rate Roadmap', 50, 66)
    doc.fontSize(13).fillColor(slate).font('Helvetica')
      .text('A step-by-step plan to get from here to where you should be', 50, 100)

    y = 130

    const nextRate = fmt(Math.round((rates?.dayRate || 500) * 1.175 / 5) * 5)
    const stretchRate = fmt(Math.round((rates?.dayRate || 500) * 1.35 / 5) * 5)

    const roadmap = [
      {
        month: 'Month 1',
        title: 'Lock in your positioning',
        tasks: [
          `Update your website, LinkedIn, and email signature with: "${rates?.headline || specialty + ' specialist'}"`,
          'Say your charge script out loud 5 times. It should feel natural, not rehearsed.',
          `Set your rate to ${fmt(rates?.dayRate)} on all platforms and in all conversations.`,
        ],
      },
      {
        month: 'Month 2',
        title: 'Test the market',
        tasks: [
          `Quote ${nextRate} on your next new enquiry. First test. Note the reaction.`,
          'Track every quote you send this month — who accepted, who didn\'t, what they said.',
          'If you receive no price objections this month, raise immediately.',
        ],
      },
      {
        month: 'Month 3',
        title: 'Convert one client to a retainer',
        tasks: [
          `Identify one current or past client who could benefit from a ${fmt(rates?.retainerRate)}/month retainer.`,
          'Send the retainer pitch email template from this guide.',
          'Whether they say yes or no, send another one to a second client.',
        ],
      },
      {
        month: 'Month 4',
        title: 'Refine and consolidate',
        tasks: [
          'Review your quote tracking. What\'s your acceptance rate? Target: 75–85%.',
          'If above 85% — your rate is still too low. Raise by another 10%.',
          'Start adding urgency premiums to any rush requests.',
        ],
      },
      {
        month: 'Month 5',
        title: 'Raise again',
        tasks: [
          `Your target for all new work this month: ${nextRate} day rate.`,
          'Notify any clients on rolling arrangements that your rate increases next renewal.',
          'Update your positioning if your niche or client type has evolved.',
        ],
      },
      {
        month: 'Month 6',
        title: 'Review and set your stretch goal',
        tasks: [
          `Review: are you consistently billing at ${fmt(rates?.dayRate)} or above?`,
          `Set your 12-month target: ${stretchRate} day rate. Map out what needs to change to get there.`,
          'Run your questionnaire again at claritycosts.co.uk to recalibrate.',
        ],
      },
    ]

    roadmap.forEach(item => {
      if (y > 650) {
        doc.addPage()
        doc.rect(0, 0, doc.page.width, 8).fill(gold)
        doc.fontSize(10).fillColor(slate).font('Helvetica-Bold')
          .text('CLARITY COSTS · 6-MONTH ROADMAP', 50, 28, { characterSpacing: 1.5 })
        doc.rect(50, 48, doc.page.width - 100, 1).fill('#e2e8f0')
        y = 66
      }

      const taskText = item.tasks.map(t => `• ${t}`).join('\n')
      const blockH = 24 + doc.heightOfString(taskText, { width: doc.page.width - 180, lineGap: 4 }) + 20

      doc.rect(50, y, 80, blockH).fill(navy)
      doc.fontSize(9).fillColor(gold).font('Helvetica-Bold')
        .text(item.month.toUpperCase(), 55, y + 10, { width: 70, align: 'center', characterSpacing: 1 })

      doc.rect(130, y, doc.page.width - 180, blockH).fill(light).stroke('#e2e8f0')
      doc.fontSize(12).fillColor(navy).font('Helvetica-Bold').text(item.title, 146, y + 10)
      doc.fontSize(10).fillColor('#334155').font('Helvetica')
        .text(taskText, 146, y + 28, { width: doc.page.width - 196, lineGap: 4 })

      y += blockH + 10
    })

    // ── BACK COVER ──
    doc.addPage()
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(navy)
    doc.rect(0, 0, 6, doc.page.height).fill(gold)

    doc.fontSize(13).fillColor(gold).font('Helvetica-Bold')
      .text('CLARITY COSTS', 70, 60, { characterSpacing: 3 })

    doc.fontSize(28).fillColor('#ffffff').font('Helvetica-Bold')
      .text('You know your worth.', 70, 160)
    doc.fontSize(28).fillColor(gold).font('Helvetica-Bold')
      .text('Now charge it.', 70, 198)

    doc.rect(70, 250, 400, 1).fill('rgba(255,255,255,0.2)')

    doc.fontSize(13).fillColor('rgba(255,255,255,0.6)').font('Helvetica')
      .text('Run your questionnaire again in 6 months at:', 70, 272)
    doc.fontSize(14).fillColor(gold).font('Helvetica-Bold')
      .text('claritycosts.co.uk', 70, 294)

    doc.fontSize(11).fillColor('rgba(255,255,255,0.4)').font('Helvetica')
      .text('Questions? hello@claritycosts.co.uk', 70, doc.page.height - 60)

    doc.end()
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { sessionId } = req.body
  if (!sessionId) return res.status(400).json({ error: 'Session ID required' })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') return res.status(402).json({ error: 'Payment not confirmed' })

    const email = session.metadata?.email || session.customer_email
    const submissionId = session.metadata?.submissionId
    if (!email) return res.status(400).json({ error: 'No email on session' })

    let rates = null
    let answers = null

    if (submissionId) {
      const { data } = await supabase
        .from('submissions')
        .select('rate_card, answers')
        .eq('id', submissionId)
        .single()
      if (data) { rates = data.rate_card; answers = data.answers }
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(rates, answers)
    const pdfBase64 = pdfBuffer.toString('base64')

    const specialty = answers?.discipline || 'freelancer'
    const dayRate = fmt(rates?.dayRate)

    const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">

  <div style="background:linear-gradient(135deg,#0f1e35,#1a3a5c);border-radius:20px 20px 0 0;padding:36px 32px;text-align:center;">
    <p style="font-size:13px;font-weight:700;color:#f0c040;letter-spacing:3px;margin:0 0 12px;text-transform:uppercase;">Clarity Costs</p>
    <h1 style="font-size:28px;font-weight:800;color:#ffffff;margin:0 0 8px;letter-spacing:-0.02em;">Your full report is attached</h1>
    <p style="font-size:15px;color:rgba(255,255,255,0.6);margin:0;">Open the PDF for your complete rate card, scripts, and raise-your-rates guide</p>
  </div>

  <div style="background:#ffffff;padding:32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">

    <p style="font-size:15px;color:#1e293b;line-height:1.6;margin:0 0 24px;">Your <strong>Clarity Costs Full Report</strong> is attached as a PDF. Here's what's inside:</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      ${[
        ['📄', 'Your Rate Card', `Day rate, project rate, and retainer — with market ranges`],
        ['💬', 'Charge Scripts', `Your personalised script + 5 objection responses`],
        ['📈', 'Raise Your Rates Guide', `10 strategies built for ${specialty}`],
        ['✉️', 'Email Templates', `4 ready-to-send templates for quotes and follow-ups`],
        ['🗓️', '6-Month Roadmap', `A step-by-step plan to reach ${dayRate} and beyond`],
      ].map(([icon, title, desc]) => `
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:12px 0;width:36px;font-size:20px;">${icon}</td>
        <td style="padding:12px 8px;">
          <p style="font-size:14px;font-weight:700;color:#0f1e35;margin:0 0 2px;">${title}</p>
          <p style="font-size:13px;color:#64748b;margin:0;">${desc}</p>
        </td>
      </tr>`).join('')}
    </table>

    <div style="background:#fffbeb;border-left:4px solid #f0c040;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
      <p style="font-size:13px;font-weight:700;color:#92400e;margin:0 0 4px;">Your top action this week</p>
      <p style="font-size:14px;color:#78350f;margin:0;line-height:1.6;">Quote your new day rate on your next enquiry. Don't explain it. State it, then stop talking.</p>
    </div>

    <p style="font-size:13px;color:#94a3b8;margin:0;">Can't see the attachment? Reply to this email and we'll resend it.</p>
  </div>

  <div style="background:#0f1e35;border-radius:0 0 20px 20px;padding:24px 32px;text-align:center;">
    <p style="font-size:13px;color:rgba(255,255,255,0.5);margin:0 0 6px;">Clarity Costs · claritycosts.co.uk</p>
    <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">Questions? Reply to this email or write to hello@claritycosts.co.uk</p>
  </div>

</div>
</body>
</html>`

    const { error: emailError } = await resend.emails.send({
      from: 'Clarity Costs <hello@claritycosts.co.uk>',
      to: email,
      subject: `Your full rate card + raise-your-rates guide`,
      html: emailHtml,
      attachments: [{
        filename: 'Clarity-Costs-Full-Report.pdf',
        content: pdfBase64,
      }],
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      return res.status(500).json({ error: 'Email delivery failed' })
    }

    if (submissionId) {
      await supabase.from('submissions')
        .update({ paid: true, paid_at: new Date().toISOString() })
        .eq('id', submissionId)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Deliver paid content error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
