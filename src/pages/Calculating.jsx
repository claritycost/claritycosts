import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const NAVY  = '#1E3A5F'
const GOLD  = '#E8A020'
const BG    = '#F5F7FA'
const WHITE = '#ffffff'
const MUTED = '#64748b'
const BORDER= '#D1D9E0'

const STEPS = [
  'Analysing your discipline and experience…',
  'Checking UK market rates for your region…',
  'Factoring in tax, overheads, and target income…',
  'Calibrating for your client type…',
  'Building your personalised rate card…',
]

export default function Calculating() {
  const nav = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState('')
  const [apiDone, setApiDone] = useState(false)
  const [animDone, setAnimDone] = useState(false)

  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex(s => s + 1), 1400)
      return () => clearTimeout(t)
    } else setAnimDone(true)
  }, [stepIndex])

  useEffect(() => { callApi() }, [])
  useEffect(() => { if (animDone && apiDone) nav('/results') }, [animDone, apiDone])

  const callApi = async () => {
    try {
      const raw = sessionStorage.getItem('cc_answers')
      if (!raw) { setError('Your answers were not saved. Please go back and try again.'); return }
      const res = await fetch('/api/generate-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: JSON.parse(raw) }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || `Server error ${res.status}`)
      }
      const data = await res.json()
      sessionStorage.setItem('rateCardData', JSON.stringify(data))
      sessionStorage.setItem('userAnswers', raw)
      const a = JSON.parse(raw)
      if (a.email) sessionStorage.setItem('userEmail', a.email)
      setApiDone(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const state = i => i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'pending'

  return (
    <div style={{
      background: BG, minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinR { to { transform: rotate(-360deg); } }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes stepIn { from{opacity:0;transform:translateX(6px)} to{opacity:1;transform:none} }
      `}</style>

      {/* Header */}
      <header style={{
        background: WHITE, borderBottom: `1px solid ${BORDER}`,
        height: 280, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '0 24px',
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ height: 260, width: 'auto' }}>
            <img src="/logo.png" alt="Clarity Costs" style={{ height: 260, width: 'auto', display: 'block' }} />
          </span>
        </Link>
      </header>

      {/* Main */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>

          {/* Spinner */}
          <div style={{ width: 72, height: 72, margin: '0 auto 36px', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `3px solid ${BORDER}`,
              borderTop: `3px solid ${GOLD}`,
              animation: 'spin 1.1s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 10, borderRadius: '50%',
              border: `2px solid transparent`,
              borderBottom: `2px solid rgba(30,58,95,0.4)`,
              animation: 'spinR 1.7s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 22, borderRadius: '50%',
              background: GOLD, opacity: 0.85,
              animation: 'pulse 2s ease infinite',
            }} />
          </div>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(232,160,32,0.1)',
            border: '1px solid rgba(232,160,32,0.25)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 16,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: GOLD, animation: 'pulse 1.5s infinite',
            }} />
            <span style={{
              fontFamily: 'Inter', fontSize: 11, fontWeight: 700,
              color: GOLD, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              AI Processing
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Poppins, Inter', fontWeight: 800,
            fontSize: 'clamp(22px, 4vw, 30px)',
            color: NAVY, letterSpacing: '-0.02em',
            lineHeight: 1.2, marginBottom: 32,
          }}>
            Calculating your{' '}
            <span style={{ color: GOLD }}>rate card…</span>
          </h1>

          {/* Steps card */}
          <div style={{
            background: WHITE, borderRadius: 16,
            border: `1px solid ${BORDER}`,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(30,58,95,0.08)',
            textAlign: 'left',
          }}>
            {STEPS.map((s, i) => {
              const st = state(i)
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px',
                  background: st === 'active' ? 'rgba(232,160,32,0.05)' : 'transparent',
                  borderBottom: i < STEPS.length - 1 ? `1px solid ${BORDER}` : 'none',
                  transition: 'background 0.3s',
                  opacity: st === 'pending' ? 0.35 : 1,
                  animation: st === 'active' ? 'stepIn 0.3s ease' : 'none',
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    background: st === 'done' ? 'rgba(34,197,94,0.12)'
                              : st === 'active' ? 'rgba(232,160,32,0.12)'
                              : '#f1f5f9',
                    border: st === 'done' ? '1.5px solid rgba(34,197,94,0.4)'
                          : st === 'active' ? `1.5px solid ${GOLD}`
                          : `1.5px solid ${BORDER}`,
                    color: st === 'done' ? '#16a34a'
                         : st === 'active' ? GOLD
                         : MUTED,
                  }}>
                    {st === 'done' ? '✓' : st === 'active' ? '◉' : i + 1}
                  </div>
                  <span style={{
                    fontFamily: 'Inter', fontSize: 14,
                    fontWeight: st === 'active' ? 600 : 400,
                    color: st === 'active' ? NAVY : MUTED,
                    flex: 1,
                  }}>{s}</span>
                </div>
              )
            })}
          </div>

          {error && (
            <div style={{
              marginTop: 24,
              background: 'rgba(239,68,68,0.05)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 12, padding: '20px',
            }}>
              <p style={{
                fontFamily: 'Inter', fontSize: 14, color: '#dc2626',
                marginBottom: 14, lineHeight: 1.6,
              }}>{error}</p>
              <button onClick={() => nav('/start')} style={{
                background: NAVY, color: WHITE,
                border: 'none', borderRadius: 8,
                padding: '10px 24px',
                fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
                cursor: 'pointer',
              }}>
                Go back and try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
