import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const G = 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 55%, #ec4899 100%)'
const GText = { background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

function fmt(val) {
  if (!val && val !== 0) return '—'
  const num = typeof val === 'number' ? val : parseInt(String(val).replace(/[^0-9]/g, ''), 10)
  if (isNaN(num)) return String(val)
  return '£' + num.toLocaleString('en-GB')
}

function Card({ icon, label, sublabel, children, accent }) {
  const borderColor = accent || 'rgba(255,255,255,0.08)'
  const glowColor = accent ? accent.replace(')', ',0.06)').replace('rgb', 'rgba') : 'transparent'
  return (
    <div style={{
      background: 'rgba(8,10,32,0.9)',
      border: `1px solid ${borderColor}`,
      borderRadius: '20px', overflow: 'hidden', marginBottom: '12px',
      boxShadow: `0 4px 32px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.04)`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '18px 22px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px',
          background: accent ? `${accent}18` : 'rgba(124,58,237,0.12)',
          border: `1px solid ${accent ? `${accent}30` : 'rgba(124,58,237,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '17px', flexShrink: 0,
        }}>{icon}</div>
        <div>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>{label}</p>
          {sublabel && <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{sublabel}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Results() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [copied, setCopied] = useState(false)
  const submissionId = sessionStorage.getItem('submissionId')

  useEffect(() => {
    const raw = sessionStorage.getItem('rateCardData')
    if (!raw) { navigate('/'); return }
    try { setData(JSON.parse(raw)) } catch { navigate('/') }
  }, [navigate])

  if (!data) {
    return (
      <div style={{ background: '#05061a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Outfit', fontSize: '18px', color: '#fff', opacity: 0.5 }}>Loading…</div>
      </div>
    )
  }

  const handleShare = () => {
    if (!submissionId) { navigate('/save?then=share'); return }
    const url = `${window.location.origin}/share/${submissionId}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2500)
    }).catch(() => window.prompt('Copy your share link:', url))
  }

  const rates = [
    { label: 'Day Rate', value: data.dayRate, range: data.dayRateRange, accent: '#7c3aed' },
    { label: 'Project Rate', value: data.projectRate, range: data.projectRateRange, accent: '#06b6d4' },
    { label: 'Monthly Retainer', value: data.retainerRate, range: data.retainerRateRange, accent: '#ec4899' },
  ]

  return (
    <div style={{ background: '#05061a', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff', paddingBottom: '60px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .btn-p { transition: all 0.2s; }
        .btn-p:hover { transform: translateY(-2px); filter: brightness(1.08); }
        .btn-g { transition: all 0.2s; }
        .btn-g:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.2) !important; }
      `}</style>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(5,6,26,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', cursor: 'pointer',
      }} onClick={() => navigate('/')}>
        <div style={{
          width: '26px', height: '26px', borderRadius: '7px', background: G,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 12px rgba(124,58,237,0.4)',
        }}>
          <span style={{ fontFamily: 'Outfit', fontSize: '10px', fontWeight: '800', color: '#fff' }}>CC</span>
        </div>
        <span style={{ fontFamily: 'Outfit', fontSize: '15px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.02em' }}>Clarity Costs</span>
      </header>

      {/* Hero */}
      <div style={{ padding: '48px 24px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '500px', height: '300px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 65%)',
        }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: '100px', padding: '5px 14px', marginBottom: '20px',
          animation: 'fadeUp 0.5s ease',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Your personalised rate card
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Outfit', fontWeight: '900',
          fontSize: 'clamp(30px, 6vw, 48px)',
          letterSpacing: '-0.04em', lineHeight: '1.08',
          color: '#fff', marginBottom: '10px',
          animation: 'fadeUp 0.5s 0.1s ease both',
        }}>
          Here's what you should<br />
          <span style={GText}>be charging</span>
        </h1>
        <p style={{
          fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.5',
          animation: 'fadeUp 0.5s 0.2s ease both',
        }}>
          Based on your experience, market, and specialty
        </p>
      </div>

      <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 16px' }}>

        {/* Rate card */}
        <div style={{
          background: 'rgba(8,10,32,0.95)', border: '1px solid rgba(124,58,237,0.18)',
          borderRadius: '22px', overflow: 'hidden', marginBottom: '12px',
          boxShadow: '0 8px 48px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
          animation: 'fadeUp 0.5s 0.25s ease both',
        }}>
          {/* Card top bar */}
          <div style={{
            height: '3px',
            background: G,
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 22px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'rgba(124,58,237,0.14)', border: '1px solid rgba(124,58,237,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px',
            }}>💰</div>
            <div>
              <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>Your Rates</p>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Calculated for your market position</p>
            </div>
          </div>

          {rates.map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '18px 22px',
              borderBottom: i < rates.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '3px', height: '28px', borderRadius: '2px', background: r.accent, flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>{r.label}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'Outfit', fontSize: '26px', fontWeight: '900',
                  letterSpacing: '-0.03em', color: '#fff',
                }}>{fmt(r.value)}</div>
                {r.range && (
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                    Range: {fmt(r.range.low)} – {fmt(r.range.high)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Headline / Title */}
        {data.headline && (
          <div style={{ animation: 'fadeUp 0.5s 0.3s ease both' }}>
            <Card icon="🏷️" label="Your Title" sublabel="How to introduce yourself" accent="rgba(124,58,237">
              <div style={{ padding: '20px 22px' }}>
                <p style={{
                  fontFamily: 'Outfit', fontWeight: '800', fontSize: '19px',
                  letterSpacing: '-0.03em', color: '#fff', lineHeight: '1.3',
                }}>{data.headline}</p>
              </div>
            </Card>
          </div>
        )}

        {/* Positioning */}
        {data.positioningStatement && (
          <div style={{ animation: 'fadeUp 0.5s 0.35s ease both' }}>
            <Card icon="🎯" label="Your Positioning" sublabel="How to describe your value" accent="rgba(6,182,212">
              <div style={{ padding: '20px 22px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65' }}>
                  {data.positioningStatement}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Charge Script */}
        {data.chargeScript && (
          <div style={{ animation: 'fadeUp 0.5s 0.4s ease both' }}>
            <Card icon="💬" label="Charge Script" sublabel='Exactly what to say when asked your rate' accent="rgba(236,72,153">
              <div style={{ padding: '20px 22px' }}>
                <div style={{
                  background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)',
                  borderLeft: '3px solid #7c3aed',
                  borderRadius: '0 10px 10px 0', padding: '16px 18px',
                }}>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7', fontStyle: 'italic', margin: 0 }}>
                    "{data.chargeScript}"
                  </p>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '12px' }}>
                  After saying this — pause. Don't fill the silence.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Confidence Tip */}
        {data.confidenceTip && (
          <div style={{ animation: 'fadeUp 0.5s 0.45s ease both' }}>
            <Card icon="⚡" label="Confidence Tip" sublabel="For your next rate conversation" accent="rgba(34,197,94">
              <div style={{ padding: '20px 22px' }}>
                <div style={{
                  background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)',
                  borderRadius: '12px', padding: '16px 18px',
                }}>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.65', margin: 0 }}>
                    {data.confidenceTip}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Upgrade upsell */}
        <div style={{
          background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.22)',
          borderRadius: '20px', padding: '24px', marginBottom: '12px', textAlign: 'center',
          boxShadow: '0 4px 32px rgba(124,58,237,0.1)',
          animation: 'fadeUp 0.5s 0.5s ease both',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📄</div>
          <p style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: '800', letterSpacing: '-0.03em', color: '#fff', marginBottom: '8px' }}>
            Want the full report?
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px', lineHeight: '1.6' }}>
            7-page PDF with objection scripts, email templates, 10 raise-your-rates strategies, and a 6-month rate roadmap — built for your exact situation.
          </p>
          <button className="btn-p" onClick={() => navigate('/upgrade')} style={{
            display: 'block', width: '100%', padding: '16px',
            background: G, color: '#fff', border: 'none',
            borderRadius: '14px', fontFamily: 'Outfit', fontSize: '16px',
            fontWeight: '800', letterSpacing: '-0.02em', cursor: 'pointer',
            boxShadow: '0 6px 28px rgba(124,58,237,0.4)',
          }}>
            Get your full report — £9
          </button>
        </div>

        {/* Secondary actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', animation: 'fadeUp 0.5s 0.55s ease both' }}>
          <button className="btn-g" onClick={() => navigate('/save')} style={{
            display: 'block', width: '100%', padding: '15px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px', fontFamily: 'Inter', fontSize: '15px',
            fontWeight: '500', color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            📧 Email me my rate card — free
          </button>
          <button className="btn-g" onClick={handleShare} style={{
            display: 'block', width: '100%', padding: '15px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px', fontFamily: 'Inter', fontSize: '15px',
            fontWeight: '500', color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            🔗 Share your rate card{copied && (
              <span style={{
                display: 'inline-block', background: 'rgba(34,197,94,0.15)', color: '#22c55e',
                borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: '600', marginLeft: '8px',
              }}>Copied!</span>
            )}
          </button>
        </div>

        {!submissionId && (
          <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.22)', textAlign: 'center', marginTop: '10px' }}>
            Save your rate card first to get a share link
          </p>
        )}
      </div>
    </div>
  )
}
