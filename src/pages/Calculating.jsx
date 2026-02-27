import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  'Analysing your discipline and experience…',
  'Checking UK market rates for your region…',
  'Factoring in tax, overheads, and target income…',
  'Calibrating for your client type…',
  'Building your personalised rate card…',
]

const G = 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 55%, #ec4899 100%)'

export default function Calculating() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState('')
  const [apiDone, setApiDone] = useState(false)
  const [animDone, setAnimDone] = useState(false)

  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex(s => s + 1), 1400)
      return () => clearTimeout(t)
    } else {
      setAnimDone(true)
    }
  }, [stepIndex])

  useEffect(() => { callApi() }, [])

  useEffect(() => {
    if (animDone && apiDone) navigate('/results')
  }, [animDone, apiDone])

  const callApi = async () => {
    try {
      const raw = sessionStorage.getItem('cc_answers')
      if (!raw) { setError('Your answers were not saved. Please go back and try again.'); return }
      const answers = JSON.parse(raw)
      const res = await fetch('/api/generate-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || `Server error ${res.status}`)
      }
      const data = await res.json()
      sessionStorage.setItem('rateCardData', JSON.stringify(data))
      sessionStorage.setItem('userAnswers', raw)
      if (answers.email) sessionStorage.setItem('userEmail', answers.email)
      setApiDone(true)
    } catch (err) {
      console.error('API error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const getState = i => i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'pending'

  return (
    <div style={{
      background: '#05061a', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', fontFamily: "'Inter', sans-serif",
      position: 'relative', overflow: 'hidden', color: '#fff',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinR { to { transform: rotate(-360deg); } }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes stepSlide { from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:none} }
      `}</style>

      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', top: '25%', left: '20%', width: '500px', height: '500px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)',
        animation: 'pulse 6s ease infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '15%', width: '360px', height: '360px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 65%)',
        animation: 'pulse 8s ease infinite 2.5s',
      }} />
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Tri-colour spinner */}
        <div style={{ width: '76px', height: '76px', margin: '0 auto 40px', position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.05)',
            borderTop: '2px solid #7c3aed', borderRight: '2px solid transparent',
            animation: 'spin 1.1s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '10px', borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.04)',
            borderBottom: '2px solid #06b6d4', borderLeft: '2px solid transparent',
            animation: 'spinR 1.6s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '20px', borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.03)',
            borderTop: '2px solid #ec4899', borderRight: '2px solid transparent',
            animation: 'spin 2s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '30px', borderRadius: '50%',
            background: G, opacity: 0.85, animation: 'pulse 2s ease infinite',
          }} />
        </div>

        {/* AI badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: '100px', padding: '5px 14px', marginBottom: '18px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            AI Processing
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Outfit', fontWeight: '900',
          fontSize: 'clamp(28px, 5vw, 40px)',
          letterSpacing: '-0.04em', lineHeight: '1.1',
          color: '#fff', marginBottom: '36px',
        }}>
          Calculating your{' '}
          <span style={{ background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            rate card…
          </span>
        </h1>

        {/* Steps card */}
        <div style={{
          background: 'rgba(8,10,32,0.9)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px', padding: '8px',
          boxShadow: '0 4px 40px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
          {STEPS.map((s, i) => {
            const state = getState(i)
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 16px', borderRadius: '13px',
                background: state === 'active' ? 'rgba(124,58,237,0.1)' : 'transparent',
                transition: 'all 0.3s',
                opacity: state === 'pending' ? 0.22 : 1,
                animation: state === 'active' ? 'stepSlide 0.3s ease' : 'none',
              }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '700',
                  background: state === 'done' ? 'rgba(34,197,94,0.12)'
                    : state === 'active' ? 'rgba(124,58,237,0.2)'
                    : 'rgba(255,255,255,0.04)',
                  border: state === 'done' ? '1px solid rgba(34,197,94,0.3)'
                    : state === 'active' ? '1px solid rgba(124,58,237,0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: state === 'done' ? '#22c55e' : state === 'active' ? '#a78bfa' : 'rgba(255,255,255,0.2)',
                }}>
                  {state === 'done' ? '✓' : state === 'active' ? '◉' : i + 1}
                </div>
                <span style={{
                  fontFamily: 'Inter', fontSize: '14px', fontWeight: state === 'active' ? '500' : '400',
                  color: state === 'active' ? '#fff' : 'rgba(255,255,255,0.55)',
                  textAlign: 'left', flex: 1,
                }}>{s}</span>
              </div>
            )
          })}
        </div>

        {error && (
          <div style={{
            marginTop: '20px', background: 'rgba(239,68,68,0.09)',
            border: '1px solid rgba(239,68,68,0.22)', borderRadius: '16px', padding: '20px',
          }}>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#fca5a5', marginBottom: '14px', lineHeight: '1.5' }}>{error}</p>
            <button onClick={() => navigate('/start')} style={{
              background: G, color: '#fff', border: 'none', borderRadius: '10px',
              padding: '10px 24px', fontFamily: 'Outfit', fontSize: '14px',
              fontWeight: '700', cursor: 'pointer',
            }}>
              Go back and try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
