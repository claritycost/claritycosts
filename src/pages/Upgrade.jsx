import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PDFPreview() {
  const pages = [
    {
      tag: 'Page 1',
      content: (
        <div style={{ background: '#080b12', borderRadius: 8, padding: '20px', fontFamily: 'Helvetica, sans-serif', minHeight: 200 }}>
          <div style={{ fontSize: 11, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>CLARITY COSTS</div>
          <div style={{ fontSize: 10, color: '#4a6070', marginBottom: 20 }}>claritycosts.co.uk</div>
          <div style={{ fontSize: 10, color: '#8b9eb0', letterSpacing: 1.5, marginBottom: 4 }}>YOUR RECOMMENDED DAY RATE</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: '#00e87a', letterSpacing: -2, lineHeight: 1 }}>£650</div>
          <div style={{ fontSize: 11, color: '#8b9eb0', marginBottom: 16 }}>per day · ex. VAT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {[
              { l: 'Market Range', v: '£520 – £810' },
              { l: 'Project Rate', v: '£3,250' },
              { l: 'Retainer',     v: '£5,200' },
              { l: 'Monthly',      v: '£4,100' },
              { l: 'Annual',       v: '£45,100' },
              { l: 'Specialty',    v: 'Your field' },
            ].map(c => (
              <div key={c.l} style={{ background: '#0f1521', borderRadius: 4, padding: '8px 10px' }}>
                <div style={{ fontSize: 8, color: '#4a6070', letterSpacing: 1, marginBottom: 3 }}>{c.l.toUpperCase()}</div>
                <div style={{ fontSize: 11, color: '#ffffff', fontWeight: 700 }}>{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      tag: 'Page 2',
      content: (
        <div style={{ background: '#080b12', borderRadius: 8, padding: '20px', fontFamily: 'Helvetica, sans-serif' }}>
          <div style={{ fontSize: 9, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>YOUR TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 12 }}>Positioning &amp; Script</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 12 }} />
          <div style={{ fontSize: 10, color: '#00e87a', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>YOUR POSITIONING STATEMENT</div>
          <div style={{ fontSize: 11, color: '#ffffff', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 16 }}>
            "I help [client type] achieve [outcome] through specialist [discipline] — so they can [benefit] without [pain point]."
          </div>
          <div style={{ fontSize: 10, color: '#00e87a', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>YOUR CHARGE SCRIPT</div>
          <div style={{ borderLeft: '3px solid #00e87a', paddingLeft: 10, fontSize: 11, color: '#ffffff', lineHeight: 1.6 }}>
            "My day rate is £650. For a project like this I would typically estimate 5 days, so around £3,250 all in. I can send you a brief scope so you can see exactly what is covered."
          </div>
        </div>
      ),
    },
    {
      tag: 'Page 3',
      content: (
        <div style={{ background: '#080b12', borderRadius: 8, padding: '20px', fontFamily: 'Helvetica, sans-serif' }}>
          <div style={{ fontSize: 9, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>FULL TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 12 }}>Objection Scripts</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 12 }} />
          {[
            { q: 'That is more than we usually pay.', a: 'I understand — my rate reflects specialist experience. I am happy to scope a smaller initial project so you can see the value first.' },
            { q: 'Can you do it for a fixed price?', a: 'Absolutely. Based on the scope I would price this at £3,250. That covers everything we discussed with no surprises.' },
            { q: 'We are comparing a few freelancers.', a: 'That makes sense. I am not the cheapest, but clients come back because I deliver on time and communicate clearly. Happy to share a reference.' },
          ].map((o, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, color: '#00e87a', fontWeight: 700, letterSpacing: 1 }}>OBJECTION {i + 1}</div>
              <div style={{ fontSize: 10, color: '#ffffff', fontWeight: 700, marginBottom: 3 }}>{o.q}</div>
              <div style={{ fontSize: 10, color: '#8b9eb0', lineHeight: 1.5 }}>{o.a}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      tag: 'Page 4',
      content: (
        <div style={{ background: '#080b12', borderRadius: 8, padding: '20px', fontFamily: 'Helvetica, sans-serif' }}>
          <div style={{ fontSize: 9, color: '#00e87a', fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>FULL TOOLKIT</div>
          <div style={{ fontSize: 18, color: '#ffffff', fontWeight: 800, marginBottom: 12 }}>6-Month Rate Roadmap</div>
          <div style={{ borderTop: '1px solid #1e2a38', marginBottom: 12 }} />
          {[
            { month: 'Month 1-2', title: 'Consolidate',      body: 'Charge your rate consistently. Do not discount. Track every project outcome.' },
            { month: 'Month 3',   title: 'Test the ceiling', body: 'Quote your upper range to two new clients. See what happens. You may be surprised.' },
            { month: 'Month 4',   title: 'Review retainers', body: 'Write to retainer clients with a rate review. Give 60 days notice.' },
            { month: 'Month 5',   title: 'Raise the floor',  body: 'Stop taking projects below your minimum. Redirect those enquiries.' },
            { month: 'Month 6',   title: 'Full increase',    body: 'Apply your new rate across all new work. Update your website and proposals.' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, paddingLeft: 8, borderLeft: '3px solid #00e87a' }}>
              <div>
                <div style={{ fontSize: 8, color: '#00e87a', fontWeight: 700, letterSpacing: 1 }}>{r.month.toUpperCase()}</div>
                <div style={{ fontSize: 10, color: '#ffffff', fontWeight: 700 }}>{r.title}</div>
                <div style={{ fontSize: 10, color: '#8b9eb0', lineHeight: 1.4 }}>{r.body}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const [page, setPage] = useState(0)

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)', marginBottom: 12 }}>
        Sample PDF preview
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        {/* Page tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--card2)' }}>
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{ flex: 1, padding: '10px 4px', fontSize: 11, fontWeight: 700, background: 'none', border: 'none', borderBottom: page === i ? '2px solid var(--green)' : '2px solid transparent', color: page === i ? 'var(--green)' : 'var(--muted2)', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {p.tag}
            </button>
          ))}
        </div>

        {/* Page content */}
        <div style={{ padding: 16, background: '#0d1117' }}>
          {pages[page].content}
        </div>

        {/* Nav arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: 'var(--card2)', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{ background: 'none', border: 'none', color: page === 0 ? 'var(--border)' : 'var(--muted)', cursor: page === 0 ? 'default' : 'pointer', fontSize: 13, fontFamily: 'inherit' }}
          >
            ← Prev
          </button>
          <span style={{ fontSize: 11, color: 'var(--muted2)' }}>Page {page + 1} of {pages.length}</span>
          <button
            onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))}
            disabled={page === pages.length - 1}
            style={{ background: 'none', border: 'none', color: page === pages.length - 1 ? 'var(--border)' : 'var(--muted)', cursor: page === pages.length - 1 ? 'default' : 'pointer', fontSize: 13, fontFamily: 'inherit' }}
          >
            Next →
          </button>
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--muted2)', textAlign: 'center', marginTop: 8 }}>
        Sample only — your report is personalised to your discipline, experience, and market.
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

  useEffect(() => {
    const raw = sessionStorage.getItem('cc_results')
    if (raw) {
      const data = JSON.parse(raw)
      if (data.email) setEmail(data.email)
      if (data.id)    setResultId(data.id)
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

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px' }}>

        <PDFPreview />

        {/* Price card */}
        <div style={{ background: 'linear-gradient(140deg,#0a1f14,#061510)', border: '1px solid rgba(0,232,122,.25)', borderRadius: 20, padding: '32px', textAlign: 'center', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,232,122,.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 64, fontWeight: 900, color: 'var(--green)', letterSpacing: '-0.04em', lineHeight: 1 }}>£9</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6 }}>One-time payment — yours to keep</p>
        </div>

        {/* What you get */}
        <div className="card" style={{ marginBottom: 24 }}>
          {[
            { title: '7-page PDF report',           desc: 'Your personalised rate card formatted for reference or client-facing use.' },
            { title: '5 objection-handling scripts', desc: 'Word-for-word responses to "that\'s too expensive" and "can you do it cheaper?".' },
            { title: '3 email templates',            desc: 'Ready-to-send templates for new enquiries, rate increases, and quote follow-ups.' },
            { title: 'Raise Your Rates Guide',       desc: '10 strategies to increase what you charge, built for your discipline and market.' },
            { title: '6-month rate roadmap',         desc: 'A month-by-month plan to consolidate and raise your rates without losing clients.' },
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
