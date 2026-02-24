import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0f1e35 0%, #1a3a5c 60%, #0c2340 100%)',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '0 0 60px',
  },
  header: {
    padding: '24px 24px 0',
    textAlign: 'center',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '0',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  logo: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#f0c040',
    letterSpacing: '-0.02em',
    margin: '8px 0 0',
    display: 'block',
  },
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '32px 16px 0',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(240,192,64,0.15)',
    border: '1px solid rgba(240,192,64,0.3)',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '12px',
    color: '#f0c040',
    fontWeight: '700',
    marginBottom: '16px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 'clamp(28px, 7vw, 40px)',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.1',
    margin: '0 0 14px',
    letterSpacing: '-0.03em',
  },
  subline: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: '1.6',
    margin: '0 0 32px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
  },
  cardTop: {
    background: 'linear-gradient(135deg, #0f1e35, #1a3a5c)',
    padding: '24px',
    textAlign: 'center',
  },
  priceTag: {
    fontSize: '56px',
    fontWeight: '900',
    color: '#f0c040',
    lineHeight: '1',
    letterSpacing: '-0.04em',
    margin: '0 0 4px',
  },
  priceNote: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    margin: '0',
  },
  includesList: {
    padding: '24px',
    listStyle: 'none',
    margin: '0',
  },
  includesItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  includesItemLast: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 0',
    borderBottom: 'none',
  },
  checkCircle: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    flexShrink: '0',
    marginTop: '1px',
  },
  includesTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f1e35',
    margin: '0 0 3px',
  },
  includesDesc: {
    fontSize: '13px',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.4',
  },
  formSection: {
    padding: '0 0 16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '15px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    fontSize: '16px',
    color: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },
  inputFocus: {
    borderColor: 'rgba(240,192,64,0.6)',
  },
  payBtn: {
    display: 'block',
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #f0c040, #f59e0b)',
    color: '#0f1e35',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: '800',
    cursor: 'pointer',
    textAlign: 'center',
    letterSpacing: '-0.01em',
    marginTop: '16px',
    transition: 'transform 0.15s, box-shadow 0.15s, opacity 0.15s',
    boxShadow: '0 4px 20px rgba(240,192,64,0.45)',
  },
  payBtnDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '12px',
  },
  errorMsg: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#fca5a5',
    marginTop: '12px',
  },
  guarantee: {
    textAlign: 'center',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    marginTop: '20px',
    lineHeight: '1.5',
  },
}

export default function Upgrade() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('userEmail')
    if (saved) setEmail(saved)
  }, [])

  const handlePay = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address so we can deliver your report.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const rateCardData = sessionStorage.getItem('rateCardData')
      const userAnswers = sessionStorage.getItem('userAnswers')
      const existingId = sessionStorage.getItem('submissionId')

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          submissionId: existingId || null,
          rateCardData: rateCardData ? JSON.parse(rateCardData) : null,
          answers: userAnswers ? JSON.parse(userAnswers) : null,
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.url) {
        throw new Error(json.error || 'Failed to start checkout')
      }

      sessionStorage.setItem('userEmail', email)
      window.location.href = json.url
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/results')}>
          ← Back to rate card
        </button>
        <span style={styles.logo}>Clarity Costs</span>
      </div>

      <div style={styles.container}>
        <div style={styles.badge}>⚡ One-time upgrade</div>
        <h1 style={styles.headline}>Get your<br />full report</h1>
        <p style={styles.subline}>
          A downloadable PDF rate card plus a personalised guide to confidently raising your rates — built for your exact situation.
        </p>

        <div style={styles.card}>
          <div style={styles.cardTop}>
            <p style={styles.priceTag}>£9</p>
            <p style={styles.priceNote}>One-time payment — yours to keep</p>
          </div>
          <ul style={styles.includesList}>
            <li style={styles.includesItem}>
              <div style={styles.checkCircle}>✓</div>
              <div>
                <p style={styles.includesTitle}>Printable PDF rate card</p>
                <p style={styles.includesDesc}>Your rates, positioning statement, and charge script formatted for reference or client-facing use</p>
              </div>
            </li>
            <li style={styles.includesItem}>
              <div style={styles.checkCircle}>✓</div>
              <div>
                <p style={styles.includesTitle}>Raise Your Rates guide</p>
                <p style={styles.includesDesc}>5 personalised strategies to increase what you charge — based on your specialty and current rates</p>
              </div>
            </li>
            <li style={styles.includesItem}>
              <div style={styles.checkCircle}>✓</div>
              <div>
                <p style={styles.includesTitle}>Client objection responses</p>
                <p style={styles.includesDesc}>Word-for-word scripts to handle "that's too expensive" and "can you do it cheaper?"</p>
              </div>
            </li>
            <li style={styles.includesItemLast}>
              <div style={styles.checkCircle}>✓</div>
              <div>
                <p style={styles.includesTitle}>Rate review reminder</p>
                <p style={styles.includesDesc}>Delivered to your inbox — when and how to revisit your rates every 6 months</p>
              </div>
            </li>
          </ul>
        </div>

        <div style={styles.formSection}>
          <label style={styles.label} htmlFor="upgrade-email">
            Where should we send it?
          </label>
          <input
            id="upgrade-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...styles.input, ...(focused ? styles.inputFocus : {}) }}
          />
        </div>

        <button
          style={{
            ...styles.payBtn,
            ...(loading ? styles.payBtnDisabled : {}),
          }}
          onClick={handlePay}
          disabled={loading}
          onMouseOver={e => !loading && (e.target.style.transform = 'translateY(-1px)')}
          onMouseOut={e => (e.target.style.transform = 'translateY(0)')}
        >
          {loading ? 'Redirecting to payment…' : '🔒 Pay £9 securely via Stripe'}
        </button>

        {error && <div style={styles.errorMsg}>{error}</div>}

        <div style={styles.securityNote}>
          🔒 Secure payment by Stripe · No card details stored
        </div>

        <p style={styles.guarantee}>
          Delivered to your inbox within 2 minutes of payment.<br />
          Not what you expected? Email hello@claritycosts.co.uk for a full refund.
        </p>
      </div>
    </div>
  )
}
