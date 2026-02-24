import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0f1e35 0%, #0c2340 100%)',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  },
  container: {
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
  },
  iconWrap: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    margin: '0 auto 24px',
    boxShadow: '0 0 40px rgba(34,197,94,0.4)',
  },
  headline: {
    fontSize: 'clamp(28px, 7vw, 38px)',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 12px',
    letterSpacing: '-0.03em',
    lineHeight: '1.1',
  },
  subline: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: '1.6',
    margin: '0 0 36px',
  },
  card: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '20px 24px',
    marginBottom: '24px',
    textAlign: 'left',
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#f0c040',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '10px',
  },
  deliverableRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
  },
  deliverableRowLast: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
  },
  checkMark: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'rgba(34,197,94,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    color: '#22c55e',
    flexShrink: '0',
  },
  loadingSpinner: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid rgba(240,192,64,0.3)',
    borderTop: '2px solid #f0c040',
    animation: 'spin 0.8s linear infinite',
    flexShrink: '0',
  },
  primaryBtn: {
    display: 'block',
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #f0c040, #f59e0b)',
    color: '#0f1e35',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '800',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: '12px',
    boxShadow: '0 4px 16px rgba(240,192,64,0.3)',
  },
  ghostBtn: {
    display: 'block',
    width: '100%',
    padding: '14px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    color: '#fca5a5',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  logo: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#f0c040',
    letterSpacing: '-0.02em',
    display: 'block',
    marginBottom: '32px',
  },
}

export default function Success() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading') // loading | sending | done | error
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')

    if (!sessionId) {
      setStatus('error')
      setError('No payment session found. If you completed payment, email hello@claritycosts.co.uk and we\'ll send your report manually.')
      return
    }

    setStatus('sending')
    deliverContent(sessionId)
  }, [])

  const deliverContent = async (sessionId) => {
    try {
      const res = await fetch('/api/deliver-paid-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Delivery failed')
      }

      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError('Payment confirmed but email delivery failed. Email hello@claritycosts.co.uk with your order and we\'ll send it within 1 hour.')
    }
  }

  return (
    <div style={styles.page}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={styles.container}>
        <span style={styles.logo}>Clarity Costs</span>

        {(status === 'loading' || status === 'sending') && (
          <>
            <div style={{ ...styles.iconWrap, background: 'linear-gradient(135deg, #f0c040, #f59e0b)' }}>⏳</div>
            <h1 style={styles.headline}>
              {status === 'loading' ? 'Confirming payment…' : 'Sending your report…'}
            </h1>
            <p style={styles.subline}>
              {status === 'loading'
                ? 'Verifying your payment with Stripe.'
                : 'Your full report and guide are being prepared and sent to your inbox. This takes about 30 seconds.'}
            </p>
            <div style={styles.card}>
              <p style={styles.cardLabel}>What's on its way</p>
              <div style={styles.deliverableRow}>
                <div style={styles.loadingSpinner} />
                PDF rate card
              </div>
              <div style={styles.deliverableRow}>
                <div style={styles.loadingSpinner} />
                Raise Your Rates guide
              </div>
              <div style={styles.deliverableRow}>
                <div style={styles.loadingSpinner} />
                Objection handling scripts
              </div>
              <div style={styles.deliverableRowLast}>
                <div style={styles.loadingSpinner} />
                Rate review reminder
              </div>
            </div>
          </>
        )}

        {status === 'done' && (
          <>
            <div style={styles.iconWrap}>✓</div>
            <h1 style={styles.headline}>Check your inbox!</h1>
            <p style={styles.subline}>
              Your full report is on its way. Check your inbox — and spam folder just in case. Sent from hello@claritycosts.co.uk.
            </p>
            <div style={styles.card}>
              <p style={styles.cardLabel}>Delivered to your inbox</p>
              <div style={styles.deliverableRow}>
                <div style={{ ...styles.checkMark }}>✓</div>
                PDF rate card
              </div>
              <div style={styles.deliverableRow}>
                <div style={{ ...styles.checkMark }}>✓</div>
                Raise Your Rates guide
              </div>
              <div style={styles.deliverableRow}>
                <div style={{ ...styles.checkMark }}>✓</div>
                Objection handling scripts
              </div>
              <div style={styles.deliverableRowLast}>
                <div style={{ ...styles.checkMark }}>✓</div>
                Rate review reminder
              </div>
            </div>

            <button
              style={styles.primaryBtn}
              onClick={() => navigate('/results')}
            >
              Back to my rate card
            </button>
            <button
              style={styles.ghostBtn}
              onClick={() => navigate('/')}
            >
              Start over for a different project
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ ...styles.iconWrap, background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>!</div>
            <h1 style={styles.headline}>Something went wrong</h1>
            <div style={styles.errorBox}>{error}</div>
            <button
              style={styles.ghostBtn}
              onClick={() => navigate('/results')}
            >
              Back to my rate card
            </button>
          </>
        )}
      </div>
    </div>
  )
}
