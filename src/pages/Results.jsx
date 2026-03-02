import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const NAVY    = '#1E3A5F'
const GOLD    = '#E8A020'
const GOLDHOV = '#d4911a'
const BG      = '#F5F7FA'
const WHITE   = '#ffffff'
const TEXT    = '#1A1A2E'
const MUTED   = '#64748b'
const BORDER  = '#D1D9E0'

function fmt(val) {
  if (!val && val !== 0) return '—'
  const n = typeof val === 'number' ? val : parseInt(String(val).replace(/[^0-9]/g, ''), 10)
  return isNaN(n) ? String(val) : '£' + n.toLocaleString('en-GB')
}

function InfoCard({ icon, title, subtitle, accentGold, children }) {
  return (
    <div style={{
      background: WHITE, borderRadius: 12,
      border: `1px solid ${accentGold ? 'rgba(232,160,32,0.3)' : BORDER}`,
      overflow: 'hidden', marginBottom: 12,
      boxShadow: '0 2px 12px rgba(30,58,95,0.06)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 18px', borderBottom: `1px solid ${BORDER}`,
        background: accentGold ? 'rgba(232,160,32,0.04)' : BG,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: accentGold ? 'rgba(232,160,32,0.12)' : 'rgba(30,58,95,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>{icon}</div>
        <div>
          <p style={{
            fontFamily: 'Inter', fontSize: 10, fontWeight: 700,
            color: MUTED, textTransform: 'uppercase', letterSpacing: '0.09em', margin: '0 0 2px',
          }}>{title}</p>
          {subtitle && <p style={{ fontFamily: 'Inter', fontSize: 13, color: MUTED, margin: 0 }}>{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Results() {
  const nav = useNavigate()
  const [data, setData] = useState(null)
  const [copied, setCopied] = useState(false)
  const submissionId = sessionStorage.getItem('submissionId')

  useEffect(() => {
    const raw = sessionStorage.getItem('rateCardData')
    if (!raw) { nav('/'); return }
    try { setData(JSON.parse(raw)) } catch { nav('/') }
  }, [])

  if (!data) return (
    <div style={{
      background: BG, minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontFamily: 'Inter', fontSize: 16, color: MUTED }}>Loading…</span>
    </div>
  )

  const share = () => {
    if (!submissionId) { nav('/save?then=share'); return }
    const url = `${window.location.origin}/share/${submissionId}`
    navigator.clipboard.writeText(url)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) })
      .catch(() => window.prompt('Copy link:', url))
  }

  const rates = [
    { label: 'Day Rate', val: data.dayRate, range: data.dayRateRange, color: GOLD },
    { label: 'Project Rate', val: data.projectRate, range: data.projectRateRange, color: NAVY },
    { label: 'Monthly Retainer', val: data.retainerRate, range: data.retainerRateRange, color: '#475569' },
  ]

  return (
    <div style={{
      background: BG, minHeight: '100vh',
      fontFamily: 'Inter, sans-serif', color: TEXT,
      paddingBottom: 64,
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .upgrade-btn:hover { background: ${GOLDHOV} !important; transform: translateY(-1px) !important; }
        .secondary-btn:hover { border-color: ${NAVY} !important; color: ${NAVY} !important; }
      `}</style>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: WHITE, borderBottom: `1px solid ${BORDER}`,
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      }}>
        <button onClick={() => nav('/')} style={{
          background: 'none', border: 'none',
          fontFamily: 'Inter', fontSize: 14, fontWeight: 500,
          color: MUTED, cursor: 'pointer',
        }}>
          ← Home
        </button>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ height: 32, width: 'auto' }}>
            <img src="/logo.png" alt="Clarity Costs" style={{ height: 32, width: 'auto', display: 'block' }} />
          </span>
        </Link>
        <div style={{ width: 60 }} />
      </header>

      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #162d4a 100%)`,
        padding: '40px 24px 36px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(232,160,32,0.15)',
          border: '1px solid rgba(232,160,32,0.3)',
          borderRadius: 100, padding: '5px 14px', marginBottom: 16,
          animation: 'fadeUp 0.4s ease',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: GOLD, animation: 'pulse 2s infinite',
          }} />
          <span style={{
            fontFamily: 'Inter', fontSize: 11, fontWeight: 700,
            color: GOLD, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Your personalised rate card
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Poppins, Inter', fontWeight: 800,
          fontSize: 'clamp(24px, 4.5vw, 36px)',
          color: WHITE, letterSpacing: '-0.02em',
          lineHeight: 1.15, marginBottom: 8,
          animation: 'fadeUp 0.4s 0.08s ease both',
        }}>
          Here's what you should{' '}
          <span style={{ color: GOLD }}>be charging</span>
        </h1>
        <p style={{
          fontFamily: 'Inter', fontSize: 15,
          color: 'rgba(255,255,255,0.6)',
          animation: 'fadeUp 0.4s 0.15s ease both',
        }}>
          Based on your experience, market, and specialty
        </p>
      </section>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px 0' }}>

        {/* ── Rate card ── */}
        <div style={{
          background: WHITE, borderRadius: 14,
          border: `1px solid ${BORDER}`,
          overflow: 'hidden', marginBottom: 12,
          boxShadow: '0 4px 24px rgba(30,58,95,0.1)',
          animation: 'fadeUp 0.4s 0.2s ease both',
        }}>
          {/* Gold top stripe */}
          <div style={{ height: 4, background: `linear-gradient(90deg, ${NAVY}, ${GOLD})` }} />

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '16px 20px 14px', borderBottom: `1px solid ${BORDER}`,
            background: BG,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(232,160,32,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>💰</div>
            <div>
              <p style={{
                fontFamily: 'Inter', fontSize: 10, fontWeight: 700,
                color: MUTED, textTransform: 'uppercase', letterSpacing: '0.09em', margin: '0 0 2px',
              }}>Your Rates</p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: MUTED, margin: 0 }}>
                Calculated for your market position
              </p>
            </div>
          </div>

          {rates.map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '18px 20px',
              borderBottom: i < rates.length - 1 ? `1px solid ${BORDER}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 4, height: 28, borderRadius: 2,
                  background: r.color, flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color: MUTED }}>
                  {r.label}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'Poppins, Inter', fontWeight: 800,
                  fontSize: 26, letterSpacing: '-0.03em', color: NAVY,
                }}>{fmt(r.val)}</div>
                {r.range && (
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: MUTED, marginTop: 2 }}>
                    Range: {fmt(r.range.low)} – {fmt(r.range.high)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Title ── */}
        {data.headline && (
          <div style={{ animation: 'fadeUp 0.4s 0.26s ease both' }}>
            <InfoCard icon="🏷️" title="Your Title" subtitle="How to introduce yourself">
              <div style={{ padding: '16px 20px' }}>
                <p style={{
                  fontFamily: 'Poppins, Inter', fontWeight: 700, fontSize: 17,
                  color: NAVY, letterSpacing: '-0.02em', lineHeight: 1.3,
                }}>{data.headline}</p>
              </div>
            </InfoCard>
          </div>
        )}

        {/* ── Positioning ── */}
        {data.positioningStatement && (
          <div style={{ animation: 'fadeUp 0.4s 0.3s ease both' }}>
            <InfoCard icon="🎯" title="Your Positioning" subtitle="How to describe your value">
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: MUTED, lineHeight: 1.7 }}>
                  {data.positioningStatement}
                </p>
              </div>
            </InfoCard>
          </div>
        )}

        {/* ── Charge script ── */}
        {data.chargeScript && (
          <div style={{ animation: 'fadeUp 0.4s 0.34s ease both' }}>
            <InfoCard icon="💬" title="Charge Script" subtitle="What to say when asked your rate" accentGold>
              <div style={{ padding: '16px 20px' }}>
                <div style={{
                  background: 'rgba(232,160,32,0.05)',
                  border: '1px solid rgba(232,160,32,0.2)',
                  borderLeft: `3px solid ${GOLD}`,
                  borderRadius: '0 8px 8px 0', padding: '14px 16px',
                }}>
                  <p style={{
                    fontFamily: 'Inter', fontSize: 14,
                    color: TEXT, lineHeight: 1.7,
                    fontStyle: 'italic', margin: 0,
                  }}>"{data.chargeScript}"</p>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: MUTED, marginTop: 10 }}>
                  After saying this — pause. Don't fill the silence.
                </p>
              </div>
            </InfoCard>
          </div>
        )}

        {/* ── Confidence tip ── */}
        {data.confidenceTip && (
          <div style={{ animation: 'fadeUp 0.4s 0.38s ease both' }}>
            <InfoCard icon="⚡" title="Confidence Tip" subtitle="For your next rate conversation">
              <div style={{ padding: '16px 20px' }}>
                <div style={{
                  background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 8, padding: '14px 16px',
                }}>
                  <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#166534', lineHeight: 1.7, margin: 0 }}>
                    {data.confidenceTip}
                  </p>
                </div>
              </div>
            </InfoCard>
          </div>
        )}

        {/* ── Upgrade card ── */}
        <div style={{
          background: NAVY, borderRadius: 14,
          border: `2px solid ${GOLD}`,
          padding: '24px', marginBottom: 12, textAlign: 'center',
          boxShadow: '0 8px 32px rgba(30,58,95,0.2)',
          animation: 'fadeUp 0.4s 0.42s ease both',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
            background: GOLD, color: NAVY,
            borderRadius: 100, padding: '3px 14px',
            fontFamily: 'Inter', fontWeight: 700, fontSize: 11,
            whiteSpace: 'nowrap',
          }}>Most Popular</div>

          <div style={{ fontSize: 28, marginBottom: 10 }}>📄</div>
          <p style={{
            fontFamily: 'Poppins, Inter', fontWeight: 800, fontSize: 18,
            color: WHITE, marginBottom: 8, letterSpacing: '-0.02em',
          }}>
            Want the full report?
          </p>
          <p style={{
            fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.6)',
            marginBottom: 20, lineHeight: 1.65,
          }}>
            7-page PDF with objection scripts, email templates, 10 raise-your-rates strategies,
            and a 6-month roadmap — built for your exact situation.
          </p>
          <button
            className="upgrade-btn"
            onClick={() => nav('/upgrade')}
            style={{
              display: 'block', width: '100%', padding: '15px',
              background: GOLD, color: NAVY, border: 'none', borderRadius: 10,
              fontFamily: 'Poppins, Inter', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(232,160,32,0.35)',
            }}
          >
            Get your full report — £9
          </button>
        </div>

        {/* ── Secondary actions ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 8,
          animation: 'fadeUp 0.4s 0.46s ease both',
        }}>
          <button
            className="secondary-btn"
            onClick={() => nav('/save')}
            style={{
              display: 'block', width: '100%', padding: '13px',
              background: WHITE, border: `1.5px solid ${BORDER}`,
              borderRadius: 10, fontFamily: 'Inter', fontSize: 14, fontWeight: 500,
              color: MUTED, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            📧 Email me my rate card — free
          </button>
          <button
            className="secondary-btn"
            onClick={share}
            style={{
              display: 'block', width: '100%', padding: '13px',
              background: WHITE, border: `1.5px solid ${BORDER}`,
              borderRadius: 10, fontFamily: 'Inter', fontSize: 14, fontWeight: 500,
              color: MUTED, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            🔗 Share your rate card
            {copied && (
              <span style={{
                display: 'inline-block',
                background: 'rgba(34,197,94,0.1)', color: '#16a34a',
                borderRadius: 4, padding: '2px 8px',
                fontSize: 11, fontWeight: 600, marginLeft: 8,
              }}>Copied!</span>
            )}
          </button>
        </div>

        {!submissionId && (
          <p style={{
            fontFamily: 'Inter', fontSize: 12, color: MUTED,
            textAlign: 'center', marginTop: 10,
          }}>
            Save your rate card first to get a share link
          </p>
        )}

        {/* Footer links */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 20,
          flexWrap: 'wrap', marginTop: 40, paddingTop: 24,
          borderTop: `1px solid ${BORDER}`,
        }}>
          {[['Privacy', '/privacy'], ['Cookies', '/cookie-policy'], ['Terms', '/terms'], ['About', '/about']].map(([l, p]) => (
            <Link key={p} to={p} style={{
              fontFamily: 'Inter', fontSize: 12, color: MUTED,
              textDecoration: 'none',
            }}>{l}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
