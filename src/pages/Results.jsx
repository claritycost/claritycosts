import { useEffect, useState } from 'react'
import { useNavigate, Link } import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function PDFPreview({ dayRate, project, retainer, rangeLow, rangeHigh, monthly, annual, specialty }) {
  const [page, setPage] = useState(0)

  const rate = dayRate  || '£650'
  const proj = project  || '£3,250'
  const ret  = retainer || '£5,200'
  const rLow = rangeLow || '£520'
  const rHigh = rangeHigh || '£810'
  const mon  = monthly  || '£4,100'
  const ann  = annual   || '£45,100'
  const spec = specialty || 'Your discipline'

  const pageStyle = {
    background: '#080b12',
    borderRadius: 8,
    padding: '24px 20px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    minHeight: 300,
  }

  const pages = [
    {
      label: 'Cover',
      content: (
        <div style={pageStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#00e87a' }}>Clarity</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#ffffff' }}> Costs</span>
              <div style={{ fontSize: 9, color: '#4a6070', marginTop: 2 }}>claritycosts.co.uk</div>
            </div>
            <div style={{ fontSize: 9, color: '#2a3a4a' }}>CONFIDENTIAL</div>
          </div>
          <div style={{ fontSize: 9, color: '#8b9eb0', letterSpacing: 2, marginBottom: 6 }}>YOUR RECOMMENDED DAY RATE</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#00e87a', letterSpacing: -2, lineHeight: 1 }}>{rate}</div>
          <div style={{ fontSize: 11, color: '#8b9eb0', marginTop: 4, marginBottom: 18 }}>per day · ex. VAT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {[
              { l: 'Market Range', v: `${rLow} – ${rHigh}` },
              { l: 'Project Rate', v: proj },
              { l: 'Retainer/mo',  v: ret },
              { l: 'Monthly',      v: mon },
              { l: 'Annual',       v: ann },
              { l: 'Discipline',   v: spec },
            ].map(c => (
              <div key={c.l} style={{ background: '#0f1521', borderRadius: 4, padding: '8px 10px' }}>
                <div style={{ fontSize: 8, color: '#4a6070', letterSpacing: 1, marginBottom: 3, textTransform: 'uppercase' }}>{c.l}</div>
                <div style={{ fontSize: 11, color: '#ffffff', fontWeight: 700 }}>{c.v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid #1e2a38', fontSize: 8, color: '#2a3a4a', textAlign: 'center' }}>
            2025 Hello Clarity Ltd · Registered in England and Wales · Confidential
          </div>
        </div>
      ),
    },
    {
      label: 'Scripts',
      content: (
        <div style={pageStyle}>
          <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>YOUR TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10 }}>Positioning &amp; Script</div>
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
              "My day rate is {rate}. For a project like this I would typically estimate 5 days, bringing it to {proj} all in. I will send a brief scope so you can see exactly what is covered."
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '8px 12px', background: 'rgba(0,232,122,.04)', borderRadius: 6, border: '1px solid rgba(0,232,122,.1)' }}>
            <div style={{ fontSize: 9, color: '#8b9eb0', fontStyle: 'italic' }}>Tip: Practise saying your rate out loud before your next call. Confidence comes from repetition, not certainty.</div>
          </div>
        </div>
      ),
    },
    {
      label: 'Objections',
      content: (
        <div style={pageStyle}>
          <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>FULL TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10 }}>5 Objection Scripts</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 14 }} />
          {[
            { q: 'That is more than we usually pay.',       a: `I understand — my rate reflects specialist experience. Happy to scope a smaller project at ${proj} so you can see the value first.` },
            { q: 'Can you do it for a fixed price?',        a: `Absolutely. For this scope I would price it at ${proj} — everything included, no surprises.` },
            { q: 'We are comparing a few freelancers.',     a: 'I am not the cheapest, but clients return because I deliver on time and communicate clearly. Happy to share a reference.' },
            { q: 'We have a tight budget.',                 a: 'If the budget is fixed, let us reduce the scope to match. Tell me the priority deliverables and I will build from there.' },
            { q: 'Can we start small and see how it goes?', a: 'Definitely — I often begin with a paid discovery session. Low-risk way to confirm we are a good fit.' },
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
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10 }}>3 Email Templates</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 14 }} />
          {[
            { title: 'New enquiry — initial response', body: `Hi [Name],\n\nThanks for reaching out. I work at ${rate}/day — for this scope I'd estimate 5 days, so around ${proj} all in.\n\nAvailable from [date]. Does [time] work for a call?\n\nBest, [Your name]` },
            { title: 'Rate increase — existing client', body: `Hi [Name],\n\nFrom [date] my day rate moves to ${rHigh}. Any projects agreed before then stay at the current rate.\n\nHappy to talk through any questions.\n\nBest, [Your name]` },
            { title: 'Following up on a quote', body: `Hi [Name],\n\nJust checking in on the proposal from [date]. I have a window opening from [date] that would work well.\n\nAny questions on the scope?\n\nBest, [Your name]` },
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
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 10 }}>6-Month Rate Roadmap</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 14 }} />
          {[
            { month: 'Month 1–2', title: 'Consolidate',       body: `Charge ${rate} consistently. Do not discount. Track every project outcome.` },
            { month: 'Month 3',   title: 'Test the ceiling',  body: `Quote ${rHigh} to two new clients. See what happens. You may be surprised.` },
            { month: 'Month 4',   title: 'Review retainers',  body: 'Write to retainer clients with a rate review. Give 60 days notice. Frame it as a service improvement.' },
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
    <div style={{ background: '#f5f0e8', borderRadius: 16, padding: '24px', marginBottom: 32, border: '1px solid #e8e0d0' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#8b7355', marginBottom: 4 }}>Sample report</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3 }}>See exactly what is inside the £9 toolkit</div>
        <div style={{ fontSize: 13, color: '#6b5c45', marginTop: 4 }}>Browse all 5 sections below before you decide. Your report uses your actual rates.</div>
      </div>

      <div style={{ border: '1px solid #d4c9b5', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.15)' }}>
        <div style={{ display: 'flex', background: '#ede8de', borderBottom: '1px solid #d4c9b5', overflowX: 'auto' }}>
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                flex: 1,
                minWidth: 64,
                padding: '10px 6px',
                fontSize: 11,
                fontWeight: 700,
                background: 'none',
                border: 'none',
                borderBottom: page === i ? '2px solid #00e87a' : '2px solid transparent',
                color: page === i ? '#1a1a1a' : '#8b7355',
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div>
          {pages[page].content}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#ede8de', borderTop: '1px solid #d4c9b5' }}>
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{ background: 'none', border: 'none', color: page === 0 ? '#c9bfae' : '#6b5c45', cursor: page === 0 ? 'default' : 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600 }}
          >
            ← Prev
          </button>
          <span style={{ fontSize: 11, color: '#8b7355' }}>Section {page + 1} of {pages.length} · 7-page PDF</span>
          <button
            onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))}
            disabled={page === pages.length - 1}
            style={{ background: 'none', border: 'none', color: page === pages.length - 1 ? '#c9bfae' : '#6b5c45', cursor: page === pages.length - 1 ? 'default' : 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 600 }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Results() {
  const navigate              = useNavigate()
  const [data, setData]       = useState(null)
  const [copied, setCopied]   = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('cc_results')
    if (!raw) { navigate('/start'); return }
    setData(JSON.parse(raw))
  }, [])

  if (!data) return null

  const { dayRate, rangeLow, rangeHigh, monthly, annual, project, retainer, positioning, script, answers } = data

  const fmt = (n) => {
    if (!n) return '—'
    if (typeof n === 'string') return n
    return 'GBP' + Number(n).toLocaleString('en-GB')
  }

  const copyScript = () => {
    navigator.clipboard.writeText(script || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openCoffee = () => {
    window.open('https://buymeacoffee.com/claritycosts', '_blank')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 80 }}>

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-tag">Your results</div>
          <h1>
            Your rate is <span className="green">{fmt(dayRate)}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--muted)' }}> /day</span>
          </h1>
          <p>Based on your specialty, experience, and UK market data.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Day Rate',     value: fmt(dayRate), sub: 'Recommended' },
            { label: 'Market Range', value: fmt(rangeLow) + ' – ' + fmt(rangeHigh), sub: 'Your discipline & region' },
            { label: 'Project Rate', value: fmt(project), sub: '5-day estimate' },
          ].map(c => (
            <div key={c.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 10 }}>{c.label}</div>
              <div style={{ fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', fontWeight: 900, color: 'var(--green)', letterSpacing: '-0.03em', marginBottom: 6 }}>{c.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted2)' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Monthly',  value: fmt(monthly),  sub: 'Est. take-home' },
            { label: 'Annual',   value: fmt(annual),   sub: 'Est. take-home' },
            { label: 'Retainer', value: fmt(retainer), sub: 'Monthly benchmark' },
          ].map(c => (
            <div key={c.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 10 }}>{c.label}</div>
              <div style={{ fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.03em', marginBottom: 6 }}>{c.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted2)' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {positioning && (
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 14 }}>Your positioning statement</div>
            <p style={{ fontSize: 16, color: 'var(--white)', lineHeight: 1.7, fontStyle: 'italic' }}>{positioning}</p>
          </div>
        )}

        {script && (
          <div className="card" style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)' }}>Your charge script</div>
              <button
                onClick={copyScript}
                style={{ background: copied ? 'rgba(0,232,122,.15)' : 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: copied ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.75 }}>{script}</p>
          </div>
        )}

        <PDFPreview
          dayRate={dayRate}
          project={project}
          retainer={retainer}
          rangeLow={rangeLow}
          rangeHigh={rangeHigh}
          monthly={monthly}
          annual={annual}
          specialty={answers?.specialty}
        />

        <div style={{ background: 'linear-gradient(140deg,#0a1f14,#061510)', border: '1px solid rgba(0,232,122,.25)', borderRadius: 20, padding: '40px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,232,122,.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <span className="badge badge-green" style={{ marginBottom: 16, display: 'inline-block' }}>Full Toolkit — £9</span>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Take your rate further
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
            Get the 7-page PDF report, 5 objection-handling scripts, 3 email templates, and a personalised 6-month roadmap to keep raising your rates.
          </p>
          <Link to="/upgrade" className="btn-green">Get the full toolkit — £9</Link>
          <p style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 14 }}>One-time · No subscription · Instant delivery</p>
        </div>

        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <button
            onClick={openCoffee}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted2)', background: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 999, border: '1px solid var(--border2)', fontFamily: 'inherit' }}
          >
            Found this useful? Buy me a coffee
          </button>
        </div>

      </div>
    </div>
  )
} 'react-router-dom'

const SAMPLE_REPORT = [
  {
    section: '01 — Rate Rationale',
    content: 'Your rate is benchmarked against current UK market data for your discipline and region, adjusted for your experience level and target income. The calculation factors in 20% income tax, 9% National Insurance, and 15% overhead allowance — leaving your target take-home intact.',
  },
  {
    section: '02 — Objection Scripts x5',
    content: 'That is more than we usually pay. → I understand — my rate reflects specialist experience and the quality of output you will get. I am happy to scope a smaller initial project so you can see the value firsthand. Would that work?',
  },
  {
    section: '03 — Email Templates x3',
    content: 'Subject: Project proposal\n\nHi [Name], great to connect. Based on our conversation, I would approach this as a [X]-day project at my standard rate of [rate]/day, bringing the total to [project rate]. I have attached a brief scope. Happy to jump on a call to discuss.',
  },
  {
    section: '04 — Raise Your Rates Guide',
    content: '10 strategies personalised to your discipline — including when to raise, how to communicate it to existing clients, how to anchor new clients at a higher rate from day one, and how to reframe value when clients push back on price.',
  },
  {
    section: '05 — 6-Month Rate Roadmap',
    content: 'Month 1-2: Consolidate at current rate. Month 3: Introduce higher rate for new clients only. Month 4: Review existing retainers. Month 5: Raise minimum project threshold. Month 6: Full rate increase across all work.',
  },
]

export default function Results() {
  const navigate              = useNavigate()
  const [data, setData]       = useState(null)
  const [copied, setCopied]   = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('cc_results')
    if (!raw) { navigate('/start'); return }
    setData(JSON.parse(raw))
  }, [])

  if (!data) return null

  const { dayRate, rangeLow, rangeHigh, monthly, annual, project, retainer, positioning, script } = data

  const fmt = (n) => {
    if (!n) return '—'
    if (typeof n === 'string') return n
    return 'GBP' + Number(n).toLocaleString('en-GB')
  }

  const copyScript = () => {
    navigator.clipboard.writeText(script || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openCoffee = () => {
    window.open('https://buymeacoffee.com/claritycosts', '_blank')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 80 }}>

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-tag">Your results</div>
          <h1>
            Your rate is <span className="green">{fmt(dayRate)}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--muted)' }}> /day</span>
          </h1>
          <p>Based on your specialty, experience, and UK market data.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Day Rate',     value: fmt(dayRate), sub: 'Recommended' },
            { label: 'Market Range', value: fmt(rangeLow) + ' – ' + fmt(rangeHigh), sub: 'Your discipline & region' },
            { label: 'Project Rate', value: fmt(project), sub: '5-day estimate' },
          ].map(c => (
            <div key={c.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 10 }}>{c.label}</div>
              <div style={{ fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', fontWeight: 900, color: 'var(--green)', letterSpacing: '-0.03em', marginBottom: 6 }}>{c.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted2)' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Monthly',  value: fmt(monthly),  sub: 'Est. take-home' },
            { label: 'Annual',   value: fmt(annual),   sub: 'Est. take-home' },
            { label: 'Retainer', value: fmt(retainer), sub: 'Monthly benchmark' },
          ].map(c => (
            <div key={c.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 10 }}>{c.label}</div>
              <div style={{ fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.03em', marginBottom: 6 }}>{c.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted2)' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {positioning && (
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 14 }}>Your positioning statement</div>
            <p style={{ fontSize: 16, color: 'var(--white)', lineHeight: 1.7, fontStyle: 'italic' }}>{positioning}</p>
          </div>
        )}

        {script && (
          <div className="card" style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)' }}>Your charge script</div>
              <button
                onClick={copyScript}
                style={{ background: copied ? 'rgba(0,232,122,.15)' : 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: copied ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.75 }}>{script}</p>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => setPreview(p => !p)}
            style={{ width: '100%', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: preview ? '14px 14px 0 0' : 14, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 4 }}>Full toolkit preview</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>See what is inside the £9 report</div>
            </div>
            <span style={{ fontSize: '1.2rem', color: 'var(--muted)', display: 'inline-block', transition: 'transform .25s', transform: preview ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
          </button>

          {preview && (
            <div style={{ border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 14px 14px', overflow: 'hidden' }}>
              {SAMPLE_REPORT.map((item, i) => (
                <div key={i} style={{ padding: '24px 28px', borderTop: i > 0 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'var(--card)' : 'var(--card2)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--green)', marginBottom: 10 }}>{item.section}</div>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{item.content}</p>
                </div>
              ))}
              <div style={{ padding: '20px 28px', background: 'rgba(0,232,122,.04)', borderTop: '1px solid rgba(0,232,122,.15)', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 0 }}>
                  This is a sample — your full report is personalised to your discipline, experience, and market.
                </p>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: 'linear-gradient(140deg,#0a1f14,#061510)', border: '1px solid rgba(0,232,122,.25)', borderRadius: 20, padding: '40px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,232,122,.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <span className="badge badge-green" style={{ marginBottom: 16, display: 'inline-block' }}>Full Toolkit — £9</span>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Take your rate further
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
            Get the 7-page PDF report, 5 objection-handling scripts, 3 email templates, and a personalised 6-month roadmap to keep raising your rates.
          </p>
          <Link to="/upgrade" className="btn-green">Get the full toolkit — £9</Link>
          <p style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 14 }}>One-time · No subscription · Instant delivery</p>
        </div>

        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <button
            onClick={openCoffee}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted2)', background: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 999, border: '1px solid var(--border2)', fontFamily: 'inherit' }}
          >
            Found this useful? Buy me a coffee
          </button>
        </div>

      </div>
    </div>
  )
}
