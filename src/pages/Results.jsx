import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SAMPLE_REPORT = [
  {
    section: '01 — Rate Rationale',
    content: 'Your rate is benchmarked against current UK market data for your discipline and region, adjusted for your experience level and target income. The calculation factors in 20% income tax, 9% National Insurance, and 15% overhead allowance — leaving your target take-home intact.',
  },
  {
    section: '02 — Objection Scripts (×5)',
    content: '"That\'s more than we usually pay." → "I understand — my rate reflects [X] years of specialist experience and the quality of output you\'ll get. I\'m happy to scope a smaller initial project so you can see the value firsthand. Would that work?"',
  },
  {
    section: '03 — Email Templates (×3)',
    content: 'Subject: Project proposal — [Your Name]\n\nHi [Name], great to connect. Based on our conversation, I\'d approach this as a [X]-day project at my standard rate of [rate]/day, bringing the total to [project rate]. I\'ve attached a brief scope. Happy to jump on a call to discuss.',
  },
  {
    section: '04 — Raise Your Rates Guide',
    content: '10 strategies personalised to your discipline — including when to raise, how to communicate it to existing clients, how to anchor new clients at a higher rate from day one, and how to reframe value when clients push back on price.',
  },
  {
    section: '05 — 6-Month Rate Roadmap',
    content: 'Month 1–2: Consolidate at current rate. Month 3: Introduce higher rate for new clients only. Month 4: Review existing retainers. Month 5: Raise minimum project threshold. Month 6: Full rate increase across all work.',
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

  const fmt = (n) => n ? (typeof n === 'string' ? n : `£${Number(n).toLocaleString('en-GB')}`) : '—'

  const copyScript = () => {
    navigator.clipboard.writeText(script || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 80 }}>

      {/* Header */}
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-tag">Your results</div>
          <h1>Your rate is <span className="green">{fmt(dayRate)}</span><span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--muted)' }}> /day</span></h1>
          <p>Based on your specialty, experience, and UK market data.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* Rate card grid — top row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Day Rate',     value: fmt(dayRate), sub: 'Recommended' },
            { label: 'Market Range', value: `${fmt(rangeLow)}–${fmt(rangeHigh)}`, sub: 'Your discipline & region' },
            { label: 'Project Rate', value: fmt(project), sub: '5-day estimate' },
          ].map(c => (
            <div key={c.label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 10 }}>{c.label}</div>
              <div style={{ fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', fontWeight: 900, color: 'var(--green)', letterSpacing: '-0.03em', marginBottom: 6 }}>{c.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted2)' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Rate card grid — bottom row */}
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

        {/* Positioning */}
        {positioning && (
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 14 }}>Your positioning statement</div>
            <p style={{ fontSize: 16, color: 'var(--white)', lineHeight: 1.7, fontStyle: 'italic' }}>"{positioning}"</p>
          </div>
        )}

        {/* Charge script */}
        {script && (
          <div className="card" style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)' }}>Your charge script</div>
              <button onClick={copyScript} style={{ background: copied ? 'rgba(0,232,122,.15)' : 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: copied ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.75 }}>"{script}"</p>
          </div>
        )}

        {/* Sample report preview */}
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => setPreview(p => !p)}
            style={{ width: '100%', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 4 }}>Full toolkit preview</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>See what's inside the £9 report →</div>
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

        {/* Upgrade CTA */}
        <div style={{ background: 'linear-gradient(140deg,#0a1f14,#061510)', border: '1px solid rgba(0,232,122,.25)', borderRadius: 20, padding: '40px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,232,122,.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <span className="badge badge-green" style={{ marginBottom: 16, display: 'inline-block' }}>Full Toolkit — £9</span>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Take your rate further
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
            Get the 7-page PDF report, 5 objection-handling scripts, 3 email templates, and a personalised 6-month roadmap to keep raising your rates.
          </p>
          <Link to="/upgrade" className="btn-green">Get the full toolkit — £9 →</Link>
          <p style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 14 }}>One-time · No subscription · Instant delivery</p>
        </div>

       {/* Buy me a coffee — subtle */}
<div style={{ textAlign: 'center', paddingTop: 8 }}>
  
    href="https://buymeacoffee.com/claritycosts"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13,
      color: 'var(--muted2)',
      textDecoration: 'none',
      padding: '8px 16px',
      borderRadius: 999,
      border: '1px solid var(--border2)',
    }}
  >
    ☕ Found this useful? Buy me a coffee
  </a>
</div>

      </div>
    </div>
  )
}
