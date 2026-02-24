import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f1e35 0%, #1a3a5c 50%, #0f1e35 100%)',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '0 0 60px',
  },
  header: {
    padding: '24px 24px 0',
    textAlign: 'center',
  },
  logo: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#f0c040',
    letterSpacing: '-0.02em',
    textDecoration: 'none',
    display: 'inline-block',
  },
  hero: {
    padding: '40px 24px 32px',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(240,192,64,0.15)',
    border: '1px solid rgba(240,192,64,0.3)',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '13px',
    color: '#f0c040',
    fontWeight: '600',
    marginBottom: '20px',
    letterSpacing: '0.04em',
  },
  headline: {
    fontSize: 'clamp(26px, 6vw, 38px)',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.15',
    margin: '0 0 12px',
    letterSpacing: '-0.03em',
  },
  subline: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.6)',
    margin: '0',
    lineHeight: '1.5',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '0 16px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    marginBottom: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
  },
  cardHeader: {
    padding: '20px 24px 16px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  cardIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #0f1e35, #1a3a5c)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: '0',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    margin: '0 0 2px',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#64748b',
    margin: '0',
  },
  rateRow: {
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #f8fafc',
  },
  rateLabel: {
    fontSize: '15px',
    color: '#374151',
    fontWeight: '500',
  },
  rateValue: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f1e35',
    letterSpacing: '-0.02em',
  },
  textCard: {
    padding: '20px 24px',
  },
  textLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '10px',
  },
  textContent: {
    fontSize: '15px',
    color: '#1e293b',
    lineHeight: '1.6',
    margin: '0',
  },
  scriptBox: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '16px',
    borderLeft: '3px solid #f0c040',
    margin: '12px 0 0',
  },
  scriptText: {
    fontSize: '14px',
    color: '#334155',
    lineHeight: '1.7',
    fontStyle: 'italic',
    margin: '0',
  },
  tipBox: {
    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    borderRadius: '12px',
    padding: '16px',
    margin: '12px 0 0',
    border: '1px solid #bbf7d0',
  },
  tipText: {
    fontSize: '14px',
    color: '#166534',
    lineHeight: '1.6',
    margin: '0',
  },
  divider: {
    height: '1px',
    background: '#f1f5f9',
    margin: '0 24px',
  },
  ctaSection: {
    padding: '8px 16px 0',
  },
  primaryBtn: {
    display: 'block',
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #f0c040, #f59e0b)',
    color: '#0f1e35',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    textAlign: 'center',
    letterSpacing: '-0.01em',
    marginBottom: '12px',
    transition: 'transform 0.15s, box-shadow 0.15s',
    boxShadow: '0 4px 16px rgba(240,192,64,0.4)',
  },
  secondaryBtn: {
    display: 'block',
    width: '100%',
    padding: '16px',
    background: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: '12px',
    transition: 'background 0.15s',
  },
  ghostBtn: {
    display: 'block',
    width: '100%',
    padding: '14px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: '0',
  },
  upgradeTeaser: {
    background: 'linear-gradient(135deg, rgba(240,192,64,0.1), rgba(245,158,11,0.05))',
    border: '1px solid rgba(240,192,64,0.25)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  upgradeTeaserTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#f0c040',
    margin: '0 0 6px',
  },
  upgradeTeaserText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    margin: '0 0 16px',
    lineHeight: '1.5',
  },
  shareLink: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: '16px',
    paddingBottom: '0',
  },
  copiedBadge: {
    display: 'inline-block',
    background: 'rgba(34,197,94,0.2)',
    color: '#22c55e',
    borderRadius: '8px',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '600',
    marginLeft: '8px',
  },
}

export default function Results() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [copied, setCopied] = useState(false)
  const submissionId = sessionStorage.getItem('submissionId')

  useEffect(() => {
    const raw = sessionStorage.getItem('rateCardData')
    if (!raw) {
      navigate('/')
      return
    }
    try {
      setData(JSON.parse(raw))
    } catch {
      navigate('/')
    }
  }, [navigate])

  if (!data) {
    return (
      <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#ffffff', fontSize: '18px' }}>Loading your rate card…</div>
      </div>
    )
  }

  const handleShare = () => {
    if (!submissionId) {
      navigate('/save?then=share')
      return
    }
    const shareUrl = `${window.location.origin}/share/${submissionId}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      window.prompt('Copy your share link:', shareUrl)
    })
  }

  return (
    <div style={styles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <div style={styles.header}>
        <span style={styles.logo}>Clarity Costs</span>
      </div>

      <div style={styles.hero}>
        <div style={styles.badge}>✦ Your personalised rate card</div>
        <h1 style={styles.headline}>Here's what you<br />should be charging</h1>
        <p style={styles.subline}>Based on your experience, market, and specialty</p>
      </div>

      <div style={styles.container}>

        {/* Rates Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>💰</div>
            <div>
              <p style={styles.cardTitle}>Your Rates</p>
              <p style={styles.cardSubtitle}>Calculated for your market position</p>
            </div>
          </div>

          <div style={styles.rateRow}>
            <span style={styles.rateLabel}>Day Rate</span>
            <span style={styles.rateValue}>{data.dayRate || '—'}</span>
          </div>
          <div style={styles.rateRow}>
            <span style={styles.rateLabel}>Project Rate</span>
            <span style={styles.rateValue}>{data.projectRate || '—'}</span>
          </div>
          <div style={{ ...styles.rateRow, borderBottom: 'none' }}>
            <span style={styles.rateLabel}>Monthly Retainer</span>
            <span style={styles.rateValue}>{data.retainerRate || '—'}</span>
          </div>
        </div>

        {/* Positioning Card */}
        {data.positioningStatement && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>🎯</div>
              <div>
                <p style={styles.cardTitle}>Your Positioning</p>
                <p style={styles.cardSubtitle}>How to describe your value</p>
              </div>
            </div>
            <div style={styles.textCard}>
              <p style={styles.textContent}>{data.positioningStatement}</p>
            </div>
          </div>
        )}

        {/* Charge Script Card */}
        {data.chargeScript && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>💬</div>
              <div>
                <p style={styles.cardTitle}>Charge Script</p>
                <p style={styles.cardSubtitle}>Exactly what to say when asked your rate</p>
              </div>
            </div>
            <div style={styles.textCard}>
              <div style={styles.scriptBox}>
                <p style={styles.scriptText}>"{data.chargeScript}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Confidence Tip Card */}
        {data.confidenceTip && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>⚡</div>
              <div>
                <p style={styles.cardTitle}>Confidence Tip</p>
                <p style={styles.cardSubtitle}>For your next rate conversation</p>
              </div>
            </div>
            <div style={styles.textCard}>
              <div style={styles.tipBox}>
                <p style={styles.tipText}>{data.confidenceTip}</p>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade Teaser */}
        <div style={styles.upgradeTeaser}>
          <p style={styles.upgradeTeaserTitle}>📄 Want the full report + Raise Your Rates guide?</p>
          <p style={styles.upgradeTeaserText}>
            Get a downloadable PDF of your rate card plus a personalised guide on how to raise your rates — step by step, for your exact situation.
          </p>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/upgrade')}
            onMouseOver={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 20px rgba(240,192,64,0.5)' }}
            onMouseOut={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 16px rgba(240,192,64,0.4)' }}
          >
            Get your full report — £9
          </button>
        </div>

        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate('/save')}
            onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
            onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
          >
            📧 Email me my rate card — free
          </button>

          <button
            style={styles.ghostBtn}
            onClick={handleShare}
            onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
            onMouseOut={e => e.target.style.background = 'transparent'}
          >
            🔗 Share your rate card
            {copied && <span style={styles.copiedBadge}>Link copied!</span>}
          </button>

          {!submissionId && (
            <p style={styles.shareLink}>Save your rate card first to get a share link</p>
          )}
        </div>

      </div>
    </div>
  )
}
