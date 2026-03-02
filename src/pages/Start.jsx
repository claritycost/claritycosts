import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// ─── Design tokens ────────────────────────────────────────────────────────────
const NAVY    = '#1E3A5F'
const NAVY2   = '#162d4a'
const GOLD    = '#E8A020'
const GOLDHOV = '#d4911a'
const BG      = '#F5F7FA'
const WHITE   = '#ffffff'
const TEXT    = '#1A1A2E'
const MUTED   = '#64748b'
const BORDER  = '#D1D9E0'

const QUESTIONS = [
  {
    id: 'discipline', step: 1,
    q: 'What kind of freelance work do you do?',
    hint: 'Pick the one that best describes your main service.',
    type: 'choice',
    opts: [['Design & Creative','🎨'],['Development & Tech','💻'],['Writing & Content','✍️'],['Marketing & Strategy','📈'],['Consulting & Advisory','🧠'],['Video & Photography','🎬'],['Other','✦']],
  },
  {
    id: 'experience', step: 2,
    q: 'How many years of experience do you have?',
    hint: 'Count all professional experience, not just freelance.',
    type: 'choice',
    opts: [['Under 2 years','🌱'],['2–5 years','📗'],['5–10 years','📘'],['10+ years','🏆']],
  },
  {
    id: 'location', step: 3,
    q: 'Where are you based?',
    hint: 'Rates vary significantly by region.',
    type: 'choice',
    opts: [['London','🏙️'],['South East England','🏘️'],['Midlands','🌆'],['North of England','🌉'],['Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿'],['Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿'],['Northern Ireland','🍀'],['Remote-first / anywhere','🌍']],
  },
  {
    id: 'target_income', step: 4,
    q: 'What do you want to take home per year?',
    hint: 'After-tax income — what lands in your bank account.',
    type: 'choice',
    opts: [['Under £30k',''],['£30k–£40k',''],['£40k–£55k',''],['£55k–£75k',''],['£75k–£100k',''],['Over £100k','']],
  },
  {
    id: 'billable_days', step: 5,
    q: 'How many days per week do you plan to work for clients?',
    hint: 'The rest goes on admin, sales, and having a life.',
    type: 'choice',
    opts: [['1–2 days/week','🌤️'],['3 days/week','🌥️'],['4 days/week','⛅'],['5 days/week','☁️']],
  },
  {
    id: 'client_type', step: 6,
    q: 'Who do you mostly want to work with?',
    hint: 'Different clients expect very different rates.',
    type: 'choice',
    opts: [['Early-stage startups','🚀'],['Funded scale-ups','📊'],['SMEs & small businesses','🏪'],['Large corporates & enterprise','🏢'],['Agencies & studios','✦'],['Non-profits & public sector','🌿'],['Mix of the above','🎯']],
  },
  {
    id: 'confidence', step: 7,
    q: 'How do you currently feel about your rate?',
    hint: 'Be honest — this is just for calibration.',
    type: 'choice',
    opts: [["I know I'm undercharging",'😬'],["I think I'm about right",'🤔'],["I have no idea where I sit",'😶'],["I might be overpriced",'😅']],
  },
  {
    id: 'email', step: 8,
    q: 'Where should we send your rate card?',
    hint: "We'll email your personalised results. No spam — ever.",
    type: 'email',
  },
]

export default function Start() {
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [fading, setFading] = useState(false)

  const q = QUESTIONS[step]
  const progress = ((step) / QUESTIONS.length) * 100
  const useGrid = q.type === 'choice' && q.opts && q.opts.length > 4

  function next(val) {
    if (fading) return
    setAnswers(p => ({ ...p, [q.id]: val }))
    if (step < QUESTIONS.length - 1) {
      setFading(true)
      setTimeout(() => { setStep(s => s + 1); setFading(false) }, 180)
    }
  }

  function back() {
    if (step === 0 || fading) return
    setFading(true)
    setTimeout(() => { setStep(s => s - 1); setFading(false) }, 180)
  }

  function submit() {
    const v = email.trim()
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setErr('Please enter a valid email address.')
      return
    }
    const final = { ...answers, email: v }
    sessionStorage.setItem('cc_answers', JSON.stringify(final))
    sessionStorage.setItem('userEmail', v)
    nav('/calculating')
  }

  return (
    <div style={{
      background: BG, minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        .opt-btn:hover { border-color: ${GOLD} !important; background: rgba(232,160,32,0.06) !important; }
        .opt-btn:hover .opt-label { color: ${NAVY} !important; }
        .back-btn:hover { color: ${NAVY} !important; }
        input[type=email]:focus { outline: none; border-color: ${GOLD} !important; box-shadow: 0 0 0 3px rgba(232,160,32,0.12) !important; }
        input[type=email]::placeholder { color: #a0aec0; }
        .submit-btn:hover { background: ${GOLDHOV} !important; transform: translateY(-1px); }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: WHITE, borderBottom: `1px solid ${BORDER}`,
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px',
        boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      }}>
        <button className="back-btn" onClick={step === 0 ? () => nav('/') : back} style={{
          background: 'none', border: 'none',
          fontFamily: 'Inter', fontSize: 14, fontWeight: 500,
          color: MUTED, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5,
          transition: 'color 0.15s',
        }}>
          ← {step === 0 ? 'Home' : 'Back'}
        </button>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ height: 32, width: 'auto' }}>
            <img src="/logo.png" alt="Clarity Costs" style={{ height: 32, width: 'auto', display: 'block' }} />
          </span>
        </Link>

        <span style={{
          fontFamily: 'Inter', fontSize: 13, color: MUTED,
          background: BG, borderRadius: 100, padding: '4px 12px',
          border: `1px solid ${BORDER}`,
        }}>
          {step + 1} <span style={{ color: '#cbd5e1' }}>/ {QUESTIONS.length}</span>
        </span>
      </header>

      {/* ── PROGRESS BAR ── */}
      <div style={{
        position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
        height: 3, background: '#e2e8f0',
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: `linear-gradient(90deg, ${NAVY}, ${GOLD})`,
          transition: 'width 0.4s ease',
          borderRadius: '0 2px 2px 0',
        }} />
      </div>

      {/* ── CONTENT ── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 80px',
        minHeight: '100vh',
      }}>
        <div style={{
          maxWidth: useGrid ? 720 : 520, width: '100%',
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(8px)' : 'none',
          transition: 'opacity 0.18s, transform 0.18s',
          animation: 'fadeUp 0.3s ease',
        }}>
          {/* Step indicator */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(232,160,32,0.1)',
            border: '1px solid rgba(232,160,32,0.25)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 20,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: GOLD,
            }} />
            <span style={{
              fontFamily: 'Inter', fontSize: 11, fontWeight: 700,
              color: GOLD, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Question {q.step} of {QUESTIONS.length}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Poppins, Inter', fontWeight: 800,
            fontSize: 'clamp(22px, 3.5vw, 30px)',
            color: NAVY, letterSpacing: '-0.02em',
            lineHeight: 1.2, marginBottom: 8,
          }}>{q.q}</h1>

          {q.hint && (
            <p style={{
              fontFamily: 'Inter', fontSize: 15, color: MUTED,
              marginBottom: 28, lineHeight: 1.5,
            }}>{q.hint}</p>
          )}

          {/* ── CHOICE ── */}
          {q.type === 'choice' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: useGrid ? 'repeat(auto-fill, minmax(200px, 1fr))' : '1fr',
              gap: 10,
            }}>
              {q.opts.map(([label, emoji]) => {
                const sel = answers[q.id] === label
                return (
                  <button
                    key={label}
                    className="opt-btn"
                    onClick={() => next(label)}
                    style={{
                      background: sel ? 'rgba(232,160,32,0.08)' : WHITE,
                      border: sel ? `2px solid ${GOLD}` : `1.5px solid ${BORDER}`,
                      borderRadius: 10, padding: '13px 16px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      cursor: 'pointer', textAlign: 'left', width: '100%',
                      transition: 'all 0.15s',
                      boxShadow: sel ? '0 2px 12px rgba(232,160,32,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {emoji && (
                      <span style={{ fontSize: 18, flexShrink: 0, width: 22 }}>{emoji}</span>
                    )}
                    <span className="opt-label" style={{
                      flex: 1, fontFamily: 'Inter', fontSize: 15,
                      fontWeight: sel ? 600 : 400,
                      color: sel ? NAVY : TEXT,
                      transition: 'color 0.15s',
                    }}>{label}</span>
                    {sel && (
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: GOLD, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800, color: NAVY,
                      }}>✓</div>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* ── EMAIL ── */}
          {q.type === 'email' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErr('') }}
                onKeyDown={e => e.key === 'Enter' && submit()}
                autoFocus
                style={{
                  background: WHITE, borderRadius: 10, padding: '15px 18px',
                  border: err ? '1.5px solid #ef4444' : `1.5px solid ${BORDER}`,
                  fontFamily: 'Inter', fontSize: 16, color: TEXT,
                  width: '100%', transition: 'all 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              />
              {err && (
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#ef4444' }}>{err}</p>
              )}
              <button
                className="submit-btn"
                onClick={submit}
                style={{
                  background: GOLD, color: NAVY,
                  border: 'none', borderRadius: 10,
                  padding: '16px', fontFamily: 'Poppins, Inter',
                  fontSize: 16, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 4px 20px rgba(232,160,32,0.3)',
                }}
              >
                Calculate my rate →
              </button>
              <p style={{
                fontFamily: 'Inter', fontSize: 12, color: MUTED,
                textAlign: 'center',
              }}>
                🔒 No spam. Unsubscribe any time. GDPR compliant.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── TRUST FOOTER ── */}
      <div style={{
        padding: '14px 24px',
        borderTop: `1px solid ${BORDER}`,
        background: WHITE,
        display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap',
      }}>
        {['Free to use', 'Built for UK freelancers', 'Powered by GPT-4o', 'GDPR compliant'].map(t => (
          <span key={t} style={{
            fontFamily: 'Inter', fontSize: 12, fontWeight: 500, color: MUTED,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{ color: GOLD }}>✓</span> {t}
          </span>
        ))}
      </div>
    </div>
  )
}
