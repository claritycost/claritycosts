import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  'Analysing your discipline and experience…',
  'Checking UK market rates for your region…',
  'Factoring in tax, overheads, and target income…',
  'Calibrating for your client type…',
  'Building your personalised rate card…',
]

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f1e35 0%, #1a3a5c 50%, #0f1e35 100%)',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  },
  card: {
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
  },
  spinnerWrap: {
    width: '64px',
    height: '64px',
    margin: '0 auto 28px',
    position: 'relative',
  },
  spinnerRing: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: '3px solid rgba(240,192,64,0.2)',
    borderTop: '3px solid #f0c040',
    animation: 'spin 1s linear infinite',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  spinnerInner: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.1)',
    borderBottom: '2px solid rgba(255,255,255,0.4)',
    animation: 'spinReverse 1.5s linear infinite',
    position: 'absolute',
    top: '12px',
    left: '12px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 32px',
    letterSpacing: '-0.02em',
  },
  steps: {
    listStyle: 'none',
    padding: '0',
    margin: '0 0 24px',
    textAlign: 'left',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
    transition: 'opacity 0.3s',
  },
  stepDone: {
    opacity: '1',
  },
  stepActive: {
    opacity: '1',
  },
  stepPending: {
    opacity: '0.25',
  },
  stepIcon: {
    fontSize: '14px',
    width: '20px',
    textAlign: 'center',
    flexShrink: '0',
  },
  stepText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: '1.4',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '20px',
  },
  errorText: {
    fontSize: '14px',
    color: '#fca5a5',
    margin: '0 0 12px',
    lineHeight: '1.5',
  },
  retryBtn: {
    background: '#f0c040',
    color: '#0f1e35',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
}

export default function Calculating() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState('')
  const [apiDone, setApiDone] = useState(false)
  const [animDone, setAnimDone] = useState(false)

  // Step animation — advance every 1400ms
  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex(s => s + 1), 1400)
      return () => clearTimeout(t)
    } else {
      // Animation finished
      setAnimDone(true)
    }
  }, [stepIndex])

  // Call the API once on mount
  useEffect(() => {
    callApi()
  }, [])

  // Navigate when BOTH animation and API are done
  useEffect(() => {
    if (animDone && apiDone) {
      navigate('/results')
    }
  }, [animDone, apiDone])

  const callApi = async () => {
    try {
      const raw = sessionStorage.getItem('cc_answers')
      if (!raw) {
        setError('Your answers were not saved. Please go back and try again.')
        return
      }

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

      // Store results for Results.jsx
      sessionStorage.setItem('rateCardData', JSON.stringify(data))
      // Also store answers for Upgrade page
      sessionStorage.setItem('userAnswers', raw)
      // Store email for pre-filling
      if (answers.email) {
        sessionStorage.setItem('userEmail', answers.email)
      }

      setApiDone(true)
    } catch (err) {
      console.error('API error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const getStepState = (i) => {
    if (i < stepIndex) return 'done'
    if (i === stepIndex) return 'active'
    return 'pending'
  }

  const getStepIcon = (i) => {
    const state = getStepState(i)
    if (state === 'done') return '✓'
    if (state === 'active') return '◉'
    return '○'
  }

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinReverse { to { transform: rotate(-360deg); } }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div style={styles.card}>
        <div style={styles.spinnerWrap}>
          <div style={styles.spinnerRing} />
          <div style={styles.spinnerInner} />
        </div>

        <h1 style={styles.heading}>Calculating your rate…</h1>

        <ul style={styles.steps}>
          {STEPS.map((s, i) => {
            const state = getStepState(i)
            return (
              <li
                key={i}
                style={{
                  ...styles.step,
                  ...(state === 'done' ? styles.stepDone : state === 'active' ? styles.stepActive : styles.stepPending),
                }}
              >
                <span style={{
                  ...styles.stepIcon,
                  color: state === 'done' ? '#22c55e' : state === 'active' ? '#f0c040' : 'rgba(255,255,255,0.4)',
                }}>
                  {getStepIcon(i)}
                </span>
                <span style={styles.stepText}>{s}</span>
              </li>
            )
          })}
        </ul>

        {error && (
          <div style={styles.errorBox}>
            <p style={styles.errorText}>{error}</p>
            <button style={styles.retryBtn} onClick={() => navigate('/start')}>
              Go back and try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
