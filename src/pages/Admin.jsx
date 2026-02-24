import { useState } from 'react'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f172a',
    fontFamily: '"DM Mono", "Courier New", monospace',
    color: '#e2e8f0',
    padding: '0',
  },
  loginWrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  loginCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '360px',
    textAlign: 'center',
  },
  loginLogo: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#f0c040',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '8px',
    display: 'block',
  },
  loginTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#f1f5f9',
    margin: '0 0 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    background: '#0f172a',
    border: '1px solid #475569',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '14px',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  },
  loginBtn: {
    width: '100%',
    padding: '12px',
    background: '#f0c040',
    color: '#0f172a',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  errorMsg: {
    color: '#f87171',
    fontSize: '13px',
    marginTop: '10px',
  },
  dashboard: {
    padding: '0',
  },
  topBar: {
    background: '#1e293b',
    borderBottom: '1px solid #334155',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  topLogo: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#f0c040',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  topTitle: {
    fontSize: '13px',
    color: '#94a3b8',
    fontFamily: '-apple-system, sans-serif',
  },
  statsRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  statBadge: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    color: '#94a3b8',
    display: 'flex',
    gap: '6px',
  },
  statVal: {
    color: '#f1f5f9',
    fontWeight: '700',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #334155',
    color: '#94a3b8',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.04em',
  },
  tableWrap: {
    padding: '24px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    minWidth: '700px',
  },
  th: {
    textAlign: 'left',
    padding: '10px 14px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderBottom: '1px solid #1e293b',
    whiteSpace: 'nowrap',
  },
  tdBase: {
    padding: '14px 14px',
    borderBottom: '1px solid #1e293b',
    verticalAlign: 'top',
  },
  emailCell: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  rateCell: {
    color: '#86efac',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  timestampCell: {
    color: '#64748b',
    whiteSpace: 'nowrap',
    fontSize: '12px',
  },
  paidBadge: {
    display: 'inline-block',
    background: 'rgba(34,197,94,0.2)',
    color: '#22c55e',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  freeBadge: {
    display: 'inline-block',
    background: 'rgba(148,163,184,0.1)',
    color: '#64748b',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  specialtyText: {
    color: '#94a3b8',
    fontSize: '12px',
    maxWidth: '160px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 24px',
    color: '#475569',
    fontFamily: '-apple-system, sans-serif',
  },
  loadingState: {
    textAlign: 'center',
    padding: '60px 24px',
    color: '#64748b',
  },
  rowHover: {
    background: '#1e293b',
  },
}

function formatTimestamp(ts) {
  if (!ts) return '—'
  const d = new Date(ts)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function getSpecialty(answers) {
  if (!answers) return '—'
  if (typeof answers === 'object' && answers.specialty) return answers.specialty
  if (Array.isArray(answers) && answers[0]) return answers[0]
  return '—'
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hoveredRow, setHoveredRow] = useState(null)

  const handleLogin = async () => {
    if (!password) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/get-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Authentication failed')
      }

      setSubmissions(json.submissions || [])
      setAuthed(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  const paidCount = submissions.filter(s => s.paid).length
  const freeCount = submissions.length - paidCount

  if (!authed) {
    return (
      <div style={styles.page}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={styles.loginWrap}>
          <div style={styles.loginCard}>
            <span style={styles.loginLogo}>Clarity Costs</span>
            <h1 style={styles.loginTitle}>Admin Dashboard</h1>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
              autoFocus
            />
            <button
              style={{ ...styles.loginBtn, opacity: loading ? 0.6 : 1 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Loading…' : 'Enter →'}
            </button>
            {error && <p style={styles.errorMsg}>{error}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <span style={styles.topLogo}>Clarity Costs</span>
          <span style={styles.topTitle}>/admin</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={styles.statsRow}>
            <div style={styles.statBadge}>
              Total <span style={styles.statVal}>{submissions.length}</span>
            </div>
            <div style={styles.statBadge}>
              Paid <span style={{ ...styles.statVal, color: '#22c55e' }}>{paidCount}</span>
            </div>
            <div style={styles.statBadge}>
              Free <span style={styles.statVal}>{freeCount}</span>
            </div>
            {paidCount > 0 && (
              <div style={styles.statBadge}>
                Revenue <span style={{ ...styles.statVal, color: '#f0c040' }}>£{paidCount * 9}</span>
              </div>
            )}
          </div>
          <button
            style={styles.logoutBtn}
            onClick={() => setAuthed(false)}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={styles.tableWrap}>
        {submissions.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ fontSize: '32px', margin: '0 0 12px' }}>📭</p>
            <p style={{ fontSize: '16px', color: '#94a3b8' }}>No submissions yet</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Specialty</th>
                <th style={styles.th}>Day Rate</th>
                <th style={styles.th}>Project Rate</th>
                <th style={styles.th}>Retainer</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, i) => (
                <tr
                  key={sub.id || i}
                  style={hoveredRow === i ? { ...styles.rowHover } : {}}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={{ ...styles.tdBase, ...styles.emailCell }}>
                    {sub.email || '—'}
                  </td>
                  <td style={styles.tdBase}>
                    <span style={styles.specialtyText} title={getSpecialty(sub.answers)}>
                      {getSpecialty(sub.answers)}
                    </span>
                  </td>
                  <td style={{ ...styles.tdBase, ...styles.rateCell }}>
                    {sub.rates?.dayRate || '—'}
                  </td>
                  <td style={{ ...styles.tdBase, ...styles.rateCell }}>
                    {sub.rates?.projectRate || '—'}
                  </td>
                  <td style={{ ...styles.tdBase, ...styles.rateCell }}>
                    {sub.rates?.retainerRate || '—'}
                  </td>
                  <td style={styles.tdBase}>
                    {sub.paid
                      ? <span style={styles.paidBadge}>Paid</span>
                      : <span style={styles.freeBadge}>Free</span>
                    }
                  </td>
                  <td style={{ ...styles.tdBase, ...styles.timestampCell }}>
                    {formatTimestamp(sub.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
