import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f1e35 0%, #1a3a5c 50%, #0f1e35 100%)',
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '0 0 60px',
  },
  header: {
    padding: '24px',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  logo: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#f0c040',
    letterSpacing: '-0.02em',
    display: 'block',
    marginBottom: '4px',
  },
  headerSub: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.4)',
  },
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '36px 16px 0',
  },
  shareBanner: {
    background: 'rgba(240,192,64,0.08)',
    border: '1px solid rgba(240,192,64,0.2)',
    borderRadius: '14px',
    padding: '14px 18px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  shareBannerText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.4',
    flex: '1',
  },
  headline: {
    fontSize: 'clamp(24px, 6vw, 36px)',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.1',
    margin: '0 0 8px',
    letterSpacing: '-0.03em',
  },
  specialtyTag: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '20px',
    padding: '5px 14px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '28px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    marginBottom: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
  },
  cardHeader: {
    padding: '18px 22px 16px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  cardIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '9px',
    background: 'linear-gradient(135deg, #0f1e35, #1a3a5c)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: '0',
  },
  cardTitleText: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    margin: '0',
  },
  rateRow: {
    padding: '18px 22px',
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
  textBlock: {
    padding: '18px 22px',
    fontSize: '14px',
    color: '#1e293b',
    lineHeight: '1.6',
  },
  scriptBox: {
    background: '#f8fafc',
    borderRadius: '10px',
    padding: '14px',
    borderLeft: '3px solid #f0c040',
  },
  scriptText: {
    fontSize: '14px',
    color: '#334155',
    lineHeight: '1.7',
    fontStyle: 'italic',
    margin: '0',
  },
  ctaCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '28px 24px',
    textAlign: 'center',
    marginTop: '8px',
  },
  ctaTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 8px',
    letterSpacing: '-0.02em',
  },
  ctaText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: '1.5',
    margin: '0 0 20px',
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
    marginBottom: '10px',
    boxShadow: '0 4px 16px rgba(240,192,64,0.35)',
    boxSizing: 'border-box',
    transition: 'transform 0.15s',
  },
  copyBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '14px',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  copiedBadge: {
    background: 'rgba(34,197,94,0.2)',
    color: '#22c55e',
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '700',
  },
  loadingWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '16px',
    color: 'rgba(255,255,255,0.5)',
  },
  notFoundWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'center',
    padding: '24px',
  },
  notFoundTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0',
  },
  notFoundText: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '1.5',
    margin: '0',
    maxWidth: '320px',
  },
  backBtn: {
    padding: '12px 24px',
    background: '#f0c040',
    color: '#0f1e35',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
  },
  dateLine: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    marginTop: '16px',
    paddingBottom: '0',
  },
}

export default function Share() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) {
      setNotFound(true)
      setLoading(false)
      return
    }
    fetchSubmission()
  }, [id])

  const fetchSubmission = async () => {
    try {
      const res = await fetch(`/api/get-submission?id=${encodeURIComponent(id)}`)
      if (res.status === 404) {
        setNotFound(true)
        return
      }
      const json = await res.json()
      if (!res.ok || !json.rates) {
        setNotFound(true)
        return
      }
      setData(json)
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      window.prompt('Copy your share link:', url)
    })
  }

  const formatDate = (ts) => {
    if (!ts) return ''
    return new Date(ts).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingWrap}>
          <span style={{ fontSize: '28px' }}>⏳</span>
          <span>Loading rate card…</span>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div style={styles.page}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <div style={styles.notFoundWrap}>
          <span style={{ fontSize: '40px' }}>🔍</span>
          <h1 style={styles.notFoundTitle}>Rate card not found</h1>
          <p style={styles.notFoundText}>This link may have expired or the rate card doesn't exist. Generate your own in seconds.</p>
          <button style={styles.backBtn} onClick={() => navigate('/')}>
            Get my rate card
          </button>
        </div>
      </div>
    )
  }

  const rates = data.rates || {}

  return (
    <div style={styles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={styles.header}>
        <span style={styles.logo}>Clarity Costs</span>
        <span style={styles.headerSub}>Personalised freelance rate card</span>
      </div>

      <div style={styles.container}>

        <div style={styles.shareBanner}>
          <span style={{ fontSize: '18px' }}>👋</span>
          <span style={styles.shareBannerText}>
            A freelancer shared their Clarity Costs rate card with you. Generate yours free in 2 minutes.
          </span>
        </div>

        <h1 style={styles.headline}>Their rate card</h1>
        {data.specialty && (
          <div style={styles.specialtyTag}>
            {data.specialty}
          </div>
        )}

        {/* Rates */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>💰</div>
            <p style={styles.cardTitleText}>Rates</p>
          </div>
          {rates.dayRate && (
            <div style={styles.rateRow}>
              <span style={styles.rateLabel}>Day Rate</span>
              <span style={styles.rateValue}>{rates.dayRate}</span>
            </div>
          )}
          {rates.projectRate && (
            <div style={styles.rateRow}>
              <span style={styles.rateLabel}>Project Rate</span>
              <span style={styles.rateValue}>{rates.projectRate}</span>
            </div>
          )}
          {rates.retainerRate && (
            <div style={{ ...styles.rateRow, borderBottom: 'none' }}>
              <span style={styles.rateLabel}>Monthly Retainer</span>
              <span style={styles.rateValue}>{rates.retainerRate}</span>
            </div>
          )}
        </div>

        {/* Positioning */}
        {rates.positioningStatement && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>🎯</div>
              <p style={styles.cardTitleText}>Their positioning</p>
            </div>
            <div style={styles.textBlock}>{rates.positioningStatement}</div>
          </div>
        )}

        {/* Charge Script */}
        {rates.chargeScript && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>💬</div>
              <p style={styles.cardTitleText}>Their charge script</p>
            </div>
            <div style={styles.textBlock}>
              <div style={styles.scriptBox}>
                <p style={styles.scriptText}>"{rates.chargeScript}"</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={styles.ctaCard}>
          <p style={styles.ctaTitle}>What should you charge?</p>
          <p style={styles.ctaText}>
            Get your own personalised rate card in 2 minutes. Free. No account needed.
          </p>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/start')}
            onMouseOver={e => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={e => e.target.style.transform = 'translateY(0)'}
          >
            Get my rate card — free
          </button>
          <button
            style={styles.copyBtn}
            onClick={handleCopyLink}
            onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
            onMouseOut={e => e.target.style.background = 'transparent'}
          >
            🔗 Copy link to share
            {copied && <span style={styles.copiedBadge}>Copied!</span>}
          </button>
        </div>

        {data.createdAt && (
          <p style={styles.dateLine}>
            Generated on {formatDate(data.createdAt)} · claritycosts.co.uk
          </p>
        )}

      </div>
    </div>
  )
}
