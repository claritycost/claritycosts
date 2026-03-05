import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Results() {
  const navigate = useNavigate()
  const [data, setData]   = useState(null)
  const [copied, setCopied] = useState(false)

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

        {/* Rate card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Day Rate',       value: fmt(dayRate),  sub: 'Recommended' },
            { label: 'Market Range',   value: `${fmt(rangeLow)}–${fmt(rangeHigh)}`, sub: 'Your discipline & region' },
            { label: 'Project Rate',   value: fmt(project),  sub: '5-day estimate' },
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

        {/* Upgrade CTA */}
        <div style={{ background: 'linear-gradient(140deg,#0a1f14,#061510)', border: '1px solid rgba(0,232,122,.25)', borderRadius: 20, padding: '40px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,232,122,.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <span className="badge badge-green" style={{ marginBottom: 16, display: 'inline-block' }}>Full Toolkit — £9</span>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', fontWeight: 800, color: 'var(--white)', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Take your rate further
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 28px' }}>
            Get the 7-page PDF report, 5 objection-handling scripts, 3 email templates, and a personalised 6-month roadmap to keep raising your rates.
          </p>
          <Link to="/upgrade" className="btn-green">Get the full toolkit — £9 →</Link>
          <p style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 14 }}>One-time · No subscription · Instant delivery</p>
        </div>
      </div>
    </div>
  )
}
