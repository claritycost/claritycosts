import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  'Analysing your specialty and region…',
  'Cross-referencing UK market rates…',
  'Factoring in your experience level…',
  'Calibrating your income target…',
  'Generating your positioning statement…',
  'Writing your charge script…',
  'Finalising your rate card…',
]

export default function Calculating() {
  const navigate = useNavigate()
  const ran      = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const raw = sessionStorage.getItem('cc_answers')
    if (!raw) { navigate('/start'); return }

    const answers = JSON.parse(raw)

    fetch('/api/calculate', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(answers),
    })
      .then(r => r.json())
      .then(data => {
        sessionStorage.setItem('cc_results', JSON.stringify(data))
        navigate('/results')
      })
      .catch((err) => {
        console.error('Calculate error:', err)
        navigate('/start?error=1')
      })
  }, [])   // ← this closing bracket was missing

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 48 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(0,232,122,.15)' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: 'var(--green)', animation: 'spin 1s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '2px solid transparent', borderTopColor: 'rgba(0,232,122,.4)', animation: 'spin 1.5s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💷</div>
      </div>

      <h1 style={{ fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.025em', marginBottom: 12, textAlign: 'center' }}>
        Calculating your rate…
      </h1>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 48, textAlign: 'center' }}>
        Analysing UK market data for your discipline and region.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 380 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeUp 0.4s ease both', animationDelay: `${i * 0.35}s`, opacity: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, animation: 'pulse 1.5s ease infinite', animationDelay: `${i * 0.35}s` }} />
            <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.4 }}>{s}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin   { to { transform: rotate(360deg) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @keyframes pulse  { 0%,100% { opacity:.4; transform:scale(.8) } 50% { opacity:1; transform:scale(1.2) } }
      `}</style>
    </div>
  )
}
