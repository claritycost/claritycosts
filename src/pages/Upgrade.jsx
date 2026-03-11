import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PDFPreview({ dayRate, project, retainer, rangeLow, rangeHigh, monthly, annual, specialty }) {
  const [page, setPage] = useState(0)

  const rate    = dayRate   || '£650'
  const proj    = project   || '£3,250'
  const ret     = retainer  || '£5,200'
  const rLow    = rangeLow  || '£520'
  const rHigh   = rangeHigh || '£810'
  const mon     = monthly   || '£4,100'
  const ann     = annual    || '£45,100'
  const spec    = specialty || 'Your discipline'

  const pageStyle = {
    background: '#080b12',
    borderRadius: 8,
    padding: '24px 20px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    minHeight: 320,
    position: 'relative',
  }

  const pages = [
    {
      label: 'Cover',
      content: (
        <div style={pageStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#00e87a', letterSpacing: -0.5 }}>Clarity</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#ffffff' }}> Costs</span>
              <div style={{ fontSize: 9, color: '#4a6070', marginTop: 2 }}>claritycosts.co.uk</div>
            </div>
            <div style={{ fontSize: 9, color: '#2a3a4a', textAlign: 'right' }}>CONFIDENTIAL</div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 9, color: '#8b9eb0', letterSpacing: 2, marginBottom: 6 }}>YOUR RECOMMENDED DAY RATE</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: '#00e87a', letterSpacing: -2, lineHeight: 1 }}>{rate}</div>
            <div style={{ fontSize: 11, color: '#8b9eb0', marginTop: 4 }}>per day · ex. VAT</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {[
              { l: 'Market Range',  v: `${rLow} – ${rHigh}` },
              { l: 'Project Rate',  v: proj },
              { l: 'Retainer/mo',   v: ret },
              { l: 'Monthly',       v: mon },
              { l: 'Annual',        v: ann },
              { l: 'Discipline',    v: spec },
            ].map(c => (
              <div key={c.l} style={{ background: '#0f1521', borderRadius: 4, padding: '8px 10px' }}>
                <div style={{ fontSize: 8, color: '#4a6070', letterSpacing: 1, marginBottom: 3, textTransform: 'uppercase' }}>{c.l}</div>
                <div style={{ fontSize: 11, color: '#ffffff', fontWeight: 700 }}>{c.v}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #1e2a38', fontSize: 8, color: '#2a3a4a', textAlign: 'center' }}>
            © 2025 Hello Clarity Ltd · Registered in England and Wales · Confidential
          </div>
        </div>
      ),
    },
    {
      label: 'Scripts',
      content: (
        <div style={pageStyle}>
          <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>YOUR TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10, letterSpacing: -0.5 }}>Positioning &amp; Script</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 14 }} />

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: '#00e87a', fontWeight: 700, letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' }}>Your Positioning Statement</div>
            <div style={{ fontSize: 12, color: '#ffffff', fontStyle: 'italic', lineHeight: 1.65, background: '#0f1521', padding: '10px 14px', borderRadius: 6, borderLeft: '3px solid rgba(0,232,122,.4)' }}>
              "I help [client type] achieve [specific outcome] through specialist {spec.toLowerCase()} — delivering clarity and results from day one."
            </div>
          </div>

          <div>
            <div style={{ fontSize: 9, color: '#00e87a', fontWeight: 700, letterSpacing: 1.5, marginBottom: 6, textTransform: 'uppercase' }}>Your Charge Script</div>
            <div style={{ fontSize: 11, color: '#ffffff', lineHeight: 1.7, background: '#0f1521', padding: '10px 14px', borderRadius: 6, borderLeft: '3px solid #00e87a' }}>
              "My day rate is {rate}. For a project like this I would typically estimate 5 days, bringing it to {proj} all in. I will send a brief scope so you can see exactly what is covered — when works for a quick call?"
            </div>
          </div>

          <div style={{ marginTop: 14, padding: '8px 12px', background: 'rgba(0,232,122,.04)', borderRadius: 6, border: '1px solid rgba(0,232,122,.1)' }}>
            <div style={{ fontSize: 9, color: '#8b9eb0', fontStyle: 'italic' }}>
              Tip: Practise saying your rate out loud before your next call. Confidence comes from repetition, not certainty.
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Objections',
      content: (
        <div style={pageStyle}>
          <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>FULL TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10, letterSpacing: -0.5 }}>5 Objection Scripts</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 14 }} />

          {[
            { q: 'That is more than we usually pay.',       a: `I understand — my rate reflects specialist experience. Happy to scope a smaller initial project at ${proj} so you can see the value first.` },
            { q: 'Can you do it for a fixed price?',        a: `Absolutely. For this scope I would price it at ${proj} — that covers everything we discussed with no surprises.` },
            { q: 'We are comparing a few freelancers.',     a: 'I am not the cheapest, but clients return because I deliver on time and communicate throughout. Happy to share a reference.' },
            { q: 'We have a tight budget.',                 a: 'If the budget is fixed, let us reduce the scope to match. Tell me the priority deliverables and I will build from there.' },
            { q: 'Can we start small and see how it goes?', a: 'Definitely — I often begin with a paid discovery session. Low-risk way to see if we are a good fit before a larger commitment.' },
          ].map((o, i) => (
            <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < 4 ? '1px solid #1e2a38' : 'none' }}>
              <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>OBJECTION {i + 1}</div>
              <div style={{ fontSize: 10, color: '#ffffff', fontWeight: 700, marginBottom: 3 }}>{o.q}</div>
              <div style={{ fontSize: 10, color: '#8b9eb0', lineHeight: 1.5 }}>{o.a}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Emails',
      content: (
        <div style={pageStyle}>
          <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>FULL TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10, letterSpacing: -0.5 }}>3 Email Templates</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 14 }} />

          {[
            {
              title: 'New enquiry — initial response',
              body: `Hi [Name],\n\nThanks for reaching out. I work at ${rate}/day — for this scope I'd estimate 5 days, so around ${proj} all in.\n\nAvailable from [date]. Does [time] work for a call?\n\nBest, [Your name]`,
            },
            {
              title: 'Rate increase — existing client',
              body: `Hi [Name],\n\nFrom [date] my day rate moves to ${rHigh}. Any projects agreed before then stay at the current rate.\n\nHappy to talk through any questions.\n\nBest, [Your name]`,
            },
            {
              title: 'Following up on a quote',
              body: `Hi [Name],\n\nJust checking in on the proposal from [date]. I have a window opening from [date] that would work well.\n\nAny questions on the scope?\n\nBest, [Your name]`,
            },
          ].map((t, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>TEMPLATE {i + 1}</div>
              <div style={{ fontSize: 10, color: '#ffffff', fontWeight: 700, marginBottom: 4 }}>{t.title}</div>
              <div style={{ fontSize: 9, color: '#8b9eb0', lineHeight: 1.6, background: '#0f1521', padding: '8px 10px', borderRadius: 4, fontFamily: 'Courier, monospace', whiteSpace: 'pre-line' }}>{t.body}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Roadmap',
      content: (
        <div style={pageStyle}>
          <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>FULL TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10, letterSpacing: -0.5 }}>6-Month Rate Roadmap</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 14 }} />

          {[
            { month: 'Month 1–2', title: 'Consolidate',       body: `Charge ${rate} consistently. Do not discount. Track every project outcome.` },
            { month: 'Month 3',   title: 'Test the ceiling',  body: `Quote ${rHigh} to two new clients. See what happens. You may be surprised.` },
            { month: 'Month 4',   title: 'Review retainers',  body: `Write to retainer clients with a rate review. Give 60 days notice. Frame it as a service improvement.` },
            { month: 'Month 5',   title: 'Raise the floor',   body: 'Stop taking projects below your minimum threshold. Redirect or decline politely.' },
            { month: 'Month 6',   title: 'Full rate increase', body: 'Apply your new rate across all new work. Update your website, proposals, and contracts.' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, paddingLeft: 10, borderLeft: '3px solid #00e87a' }}>
              <div>
                <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{r.month}</div>
                <div style={{ fontSize: 11, color: '#ffffff', fontWeight: 700 }}>{r.title}</div>
                <div style={{ fontSize: 10, color: '#8b9eb0', lineHeight: 1.4, marginTop: 2 }}>{r.body}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--white)' }}>See exactly what you get</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>Browse all 7 pages of the report below</div>
        </div>
        <span className="badge badge-green">Sample</span>
      </div>

      <div style={{ border: '1px solid rgba(0,232,122,.2)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,.4)' }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', background: '#0d1117', borderBottom: '1px solid #1e2a38', overflowX: 'auto' }}>
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                flex: 1,
                minWidth: 60,
                padding: '10px 6px',
                fontSize: 11,
                fontWeight: 700,
                background: 'none',
                border: 'none',
                borderBottom: page === i ? '2px solid #00e87a' : '2px solid transparent',
                color: page === i ? '#00e87a' : '#4a6070',
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                transition: 'color .15s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Page content */}
        <div style={{ background: '#0d1117', padding: '4px 4px 0' }}>
          {pages[page].content}
        </div>

        {/* Bottom nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#0d1117', borderTop: '1px solid #1e2a38' }}>
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{ background: 'none', border: 'none', color: page === 0 ? '#1e2a38' : '#8b9eb0', cursor: page === 0 ? 'default' : 'pointer', fontSize: 12, fontFamily: 'inherit' }}
          >
            ← Prev
          </button>
          <span style={{ fontSize: 11, color: '#4a6070' }}>Page {page + 1} of {pages.length} · 7-page PDF</span>
          <button
            onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))}
            disabled={page === pages.length - 1}
            style={{ background: 'none', border: 'none', color: page === pages.length - 1 ? '#1e2a38' : '#8b9eb0', cursor: page === pages.length - 1 ? 'default' : 'pointer', fontSize: 12, fontFamily: 'inherit' }}
          >
            Next →
          </button>
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--muted2)', textAlign: 'center', marginTop: 8 }}>
        Sample only — your report uses your actual rates, discipline, and market data.
      </p>
    </div>
  )
}

export default function Upgrade() {
  const navigate   = useNavigate()
  const [email,    setEmail]    = useState('')
  const [resultId, setResultId] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [rateData, setRateData] = useState({})

  useEffect(() => {
    const raw = sessionStorage.getItem('cc_results')
    if (raw) {
      const data = JSON.parse(raw)
      if (data.email) setEmail(data.email)
      if (data.id)    setResultId(data.id)
      setRateData(data)
    }
  }, [])

  const handlePay = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address so we can deliver your report.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res  = await fetch('/api/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, resultId }),
      })

      const json = await res.json()

      if (!res.ok || !json.url) {
        throw new Error(json.error || 'Failed to start checkout')
      }

      window.location.href = json.url
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 80 }}>

      <div className="page-header">
        <div className="page-header-inner">
          <button
            onClick={() => navigate('/results')}
            style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16, fontFamily: 'inherit' }}
          >
            ← Back to results
          </button>
          <div className="page-tag">One-time upgrade · £9</div>
          <h1>Get the <span className="green">full toolkit</span></h1>
          <p>Everything you need to charge confidently, handle objections, and raise your rates — personalised to you and delivered as a PDF in minutes.</p>
        </div>
      </div>

      <div style={{ maxWidth: 580, margin: '0 auto', padding: '0 24px' }}>

        <PDFPreview
          dayRate={rateData.dayRate}
          project={rateData.project}
          retainer={rateData.retainer}
          rangeLow={rateData.rangeLow}
          rangeHigh={rateData.rangeHigh}
          monthly={rateData.monthly}
          annual={rateData.annual}
          specialty={rateData.answers?.specialty}
        />

        {/* Price + CTA */}
        <div style={{ background: 'linear-gradient(140deg,#0a1f14,#061510)', border: '1px solid rgba(0,232,122,.25)', borderRadius: 20, padding: '32px', textAlign: 'center', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,232,122,.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 64, fontWeight: 900, color: 'var(--green)', letterSpacing: '-0.04em', lineHeight: 1 }}>£9</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6, marginBottom: 0 }}>One-time · No subscription · Instant delivery</p>
        </div>

        {/* What you get */}
        <div className="card" style={{ marginBottom: 24 }}>
          {[
            { title: '7-page PDF report',           desc: 'Your personalised rate card, cover page, and full toolkit formatted for reference or client-facing use.' },
            { title: '5 objection-handling scripts', desc: 'Word-for-word responses to the 5 most common pricing objections, tailored to your rates.' },
            { title: '3 email templates',            desc: 'Ready-to-send templates for new enquiries, rate increases, and quote follow-ups.' },
            { title: 'Raise Your Rates Guide',       desc: '10 strategies to increase what you charge — built specifically for your discipline and market.' },
            { title: '6-month rate roadmap',         desc: 'A month-by-month plan to consolidate, test, and raise your rates without losing clients.' },
          ].map((item, i, arr) => (
            <div key={item.title} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,232,122,.15)', border: '1px solid rgba(0,232,122,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--green)', flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)', marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Email input */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 8 }}>
            Delivery email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '13px 16px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 15, color: 'var(--white)', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#fca5a5', marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="btn-green"
          style={{ width: '100%', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Redirecting to payment…' : 'Pay £9 securely via Stripe'}
        </button>

        <p style={{ fontSize: 12, color: 'var(--muted2)', textAlign: 'center', marginTop: 12 }}>
          Secure payment by Stripe · No card details stored · Instant delivery
        </p>
        <p style={{ fontSize: 12, color: 'var(--muted2)', textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>
          Not what you expected? Email hello@claritycosts.co.uk for a full refund.
        </p>

      </div>
    </div>
  )
}
