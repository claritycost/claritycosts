import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Upgrade() {
  const navigate  = useNavigate()
  const [email,   setEmail]   = useState('')
  const [resultId, setResultId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    const raw = sessionStorage.getItem('cc_results')
    if (raw) {
      const data = JSON.parse(raw)
      if (data.email)    setEmail(data.email)
      if (data.id)       setResultId(data.id)
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
          <div className="page-tag">One-time upgrade</div>
          <h1>Get the <span className="green">full toolkit</span></h1>
          <p>PDF report, objection scripts, email templates, and a 6-month roadmap — personalised to you.</p>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 24px' }}>

        {/* Price card */}
        <div style={{ background: 'linear-gradient(140deg,#0a1f14,#061510)', border: '1px solid rgba(0,232,122,.25)', borderRadius: 20, padding: '32px', textAlign: 'center', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,232,122,.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 64, fontWeight: 900, color: 'var(--green)', letterSpacing: '-0.04em', lineHeight: 1 }}>£9</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6 }}>One-time payment — yours to keep</p>
        </div>

        {/* What you get */}
        <div className="card" style={{ marginBottom: 24 }}>
          {[
            { title: '7-page PDF report',          desc: 'Your personalised rate card formatted for reference or client-facing use.' },
            { title: '5 objection-handling scripts', desc: 'Word-for-word responses to "that\'s too expensive" and "can you do it cheaper?".' },
            { title: '3 email templates',           desc: 'Ready-to-send templates for new enquiries, rate increases, and quote follow-ups.' },
            { title: 'Raise Your Rates Guide',      desc: '10 strategies to increase what you charge, built for your discipline and market.' },
            { title: '6-month rate roadmap',        desc: 'A month-by-month plan to consolidate and raise your rates without losing clients.' },
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
          Secure payment by Stripe · No card details stored
        </p>

        <p style={{ fontSize: 12, color: 'var(--muted2)', textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>
          Delivered to your inbox within 2 minutes of payment.<br />
          Not what you expected? Email hello@claritycosts.co.uk for a full refund.
        </p>

      </div>
    </div>
  )
}
