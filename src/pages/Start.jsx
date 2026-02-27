import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const G = 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 55%, #ec4899 100%)'
const GText = { background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

const QUESTIONS = [
  {
    id: 'discipline', step: 1,
    question: 'What kind of freelance work do you do?',
    hint: 'Pick the one that best describes your main service.',
    type: 'choice',
    options: [
      { label: 'Design & Creative', emoji: '🎨' },
      { label: 'Development & Tech', emoji: '💻' },
      { label: 'Writing & Content', emoji: '✍️' },
      { label: 'Marketing & Strategy', emoji: '📈' },
      { label: 'Consulting & Advisory', emoji: '🧠' },
      { label: 'Video & Photography', emoji: '🎬' },
      { label: 'Other', emoji: '✦' },
    ],
  },
  {
    id: 'experience', step: 2,
    question: 'How many years of experience do you have?',
    hint: 'Count all professional experience, not just freelance.',
    type: 'choice',
    options: [
      { label: 'Under 2 years', emoji: '🌱' },
      { label: '2–5 years', emoji: '📗' },
      { label: '5–10 years', emoji: '📘' },
      { label: '10+ years', emoji: '🏆' },
    ],
  },
  {
    id: 'location', step: 3,
    question: 'Where are you based?',
    hint: 'Rates vary significantly by region.',
    type: 'choice',
    options: [
      { label: 'London', emoji: '🏙️' },
      { label: 'South East England', emoji: '🏘️' },
      { label: 'Midlands', emoji: '🌆' },
      { label: 'North of England', emoji: '🌉' },
      { label: 'Scotland', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
      { label: 'Wales', emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
      { label: 'Northern Ireland', emoji: '🍀' },
      { label: 'Remote-first / anywhere', emoji: '🌍' },
    ],
  },
  {
    id: 'target_income', step: 4,
    question: 'What do you want to take home per year?',
    hint: 'After-tax income — what lands in your bank account.',
    type: 'choice',
    options: [
      { label: 'Under £30k', emoji: '' },
      { label: '£30k–£40k', emoji: '' },
      { label: '£40k–£55k', emoji: '' },
      { label: '£55k–£75k', emoji: '' },
      { label: '£75k–£100k', emoji: '' },
      { label: 'Over £100k', emoji: '' },
    ],
  },
  {
    id: 'billable_days', step: 5,
    question: 'How many days per week do you plan to work for clients?',
    hint: 'The rest goes on admin, sales, and having a life.',
    type: 'choice',
    options: [
      { label: '1–2 days/week', emoji: '🌤️' },
      { label: '3 days/week', emoji: '🌥️' },
      { label: '4 days/week', emoji: '⛅' },
      { label: '5 days/week', emoji: '☁️' },
    ],
  },
  {
    id: 'client_type', step: 6,
    question: 'Who do you mostly want to work with?',
    hint: 'Different clients expect very different rates.',
    type: 'choice',
    options: [
      { label: 'Early-stage startups', emoji: '🚀' },
      { label: 'Funded scale-ups', emoji: '📊' },
      { label: 'SMEs & small businesses', emoji: '🏪' },
      { label: 'Large corporates & enterprise', emoji: '🏢' },
      { label: 'Agencies & studios', emoji: '✦' },
      { label: 'Non-profits & public sector', emoji: '🌿' },
      { label: 'Mix of the above', emoji: '🎯' },
    ],
  },
  {
    id: 'confidence', step: 7,
    question: 'How do you currently feel about your rate?',
    hint: 'Be honest — this is just for calibration.',
    type: 'choice',
    options: [
      { label: "I know I'm undercharging", emoji: '😬' },
      { label: "I think I'm about right", emoji: '🤔' },
      { label: "I have no idea where I sit", emoji: '😶' },
      { label: "I might be overpriced", emoji: '😅' },
    ],
  },
  {
    id: 'email', step: 8,
    question: 'Where should we send your rate card?',
    hint: "We'll email your personalised results. No spam — ever.",
    type: 'email',
  },
]

export default function Start() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [fading, setFading] = useState(false)

  const q = QUESTIONS[currentStep]
  const progress = (currentStep / QUESTIONS.length) * 100

  function next(value) {
    if (fading) return
    setAnswers(p => ({ ...p, [q.id]: value }))
    if (currentStep < QUESTIONS.length - 1) {
      setFading(true)
      setTimeout(() => { setCurrentStep(s => s + 1); setFading(false) }, 180)
    }
  }

  function back() {
    if (currentStep === 0 || fading) return
    setFading(true)
    setTimeout(() => { setCurrentStep(s => s - 1); setFading(false) }, 180)
  }

  function submitEmail() {
    const val = email.trim()
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    const finalAnswers = { ...answers, email: val }
    sessionStorage.setItem('cc_answers', JSON.stringify(finalAnswers))
    sessionStorage.setItem('userEmail', val)
    navigate('/calculating')
  }

  const useGrid = q.type === 'choice' && q.options && q.options.length > 4

  return (
    <div style={{ background: '#05061a', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .opt { transition: all 0.15s; cursor: pointer; }
        .opt:hover { border-color: rgba(124,58,237,0.5) !important; background: rgba(124,58,237,0.1) !important; transform: translateY(-1px); }
        .back-link:hover { color: #fff !important; }
        input[type=email] { outline: none; }
        input[type=email]:focus { border-color: rgba(124,58,237,0.5) !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.12) !important; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        .sub-btn { transition: all 0.2s; }
        .sub-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .dot-grid {
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
        }
      `}</style>

      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, inset: '0 0 auto', zIndex: 100,
        height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px',
        background: 'rgba(5,6,26,0.88)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <button className="back-link" onClick={currentStep === 0 ? () => navigate('/') : back} style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
          fontSize: '14px', fontWeight: '500', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter',
          transition: 'color 0.15s',
        }}>
          ← {currentStep === 0 ? 'Home' : 'Back'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '7px', background: G,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 14px rgba(124,58,237,0.45)',
          }}>
            <span style={{ fontFamily: 'Outfit', fontSize: '10px', fontWeight: '800', color: '#fff' }}>CC</span>
          </div>
          <span style={{ fontFamily: 'Outfit', fontSize: '14px', fontWeight: '700', color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.02em' }}>Clarity Costs</span>
        </div>

        <span style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.3)', minWidth: '52px', textAlign: 'right' }}>
          {currentStep + 1}<span style={{ color: 'rgba(255,255,255,0.15)' }}> / {QUESTIONS.length}</span>
        </span>
      </header>

      {/* PROGRESS BAR */}
      <div style={{ position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99, height: '2px', background: 'rgba(255,255,255,0.05)' }}>
        <div style={{
          height: '100%', background: G, transition: 'width 0.4s cubic-bezier(.4,0,.2,1)',
          width: `${progress}%`, boxShadow: '0 0 10px rgba(124,58,237,0.7)',
        }} />
      </div>

      {/* CONTENT */}
      <div className="dot-grid" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '88px 24px 48px', minHeight: '100vh',
      }}>
        <div style={{
          maxWidth: useGrid ? '720px' : '560px', width: '100%',
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(10px)' : 'none',
          transition: 'opacity 0.18s, transform 0.18s',
          animation: 'fadeUp 0.35s ease',
        }}>
          {/* Step pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)',
            borderRadius: '100px', padding: '4px 14px', marginBottom: '22px',
          }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7c3aed' }} />
            <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: '600', color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Question {q.step} of {QUESTIONS.length}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Outfit', fontWeight: '900',
            fontSize: 'clamp(24px, 4vw, 38px)',
            letterSpacing: '-0.04em', lineHeight: '1.1',
            color: '#fff', marginBottom: '10px',
          }}>{q.question}</h1>

          {q.hint && (
            <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px', lineHeight: '1.5' }}>
              {q.hint}
            </p>
          )}

          {/* CHOICE OPTIONS */}
          {q.type === 'choice' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: useGrid ? 'repeat(auto-fill, minmax(210px, 1fr))' : '1fr',
              gap: '9px',
            }}>
              {q.options.map(({ label, emoji }) => {
                const sel = answers[q.id] === label
                return (
                  <button key={label} className="opt" onClick={() => next(label)} style={{
                    background: sel ? 'rgba(124,58,237,0.16)' : 'rgba(8,10,32,0.9)',
                    border: sel ? '1px solid rgba(124,58,237,0.45)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px', padding: '15px 18px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    color: '#fff', fontFamily: 'Inter', fontSize: '15px', fontWeight: '500',
                    textAlign: 'left', width: '100%',
                    boxShadow: sel
                      ? '0 4px 20px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                  }}>
                    {emoji ? <span style={{ fontSize: '18px', flexShrink: 0, width: '22px' }}>{emoji}</span> : null}
                    <span style={{ flex: 1 }}>{label}</span>
                    {sel && (
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                        background: G, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: '800',
                      }}>✓</div>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* EMAIL */}
          {q.type === 'email' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailError('') }}
                onKeyDown={e => e.key === 'Enter' && submitEmail()}
                autoFocus
                style={{
                  background: 'rgba(8,10,32,0.9)',
                  border: emailError ? '1px solid rgba(239,68,68,0.45)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px', padding: '17px 20px',
                  color: '#fff', fontFamily: 'Inter', fontSize: '16px',
                  width: '100%', transition: 'all 0.2s',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              />
              {emailError && <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#f87171' }}>{emailError}</p>}
              <button className="sub-btn" onClick={submitEmail} style={{
                background: G, color: '#fff', border: 'none', borderRadius: '14px',
                padding: '17px', fontFamily: 'Outfit', fontSize: '17px', fontWeight: '800',
                letterSpacing: '-0.02em', cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(124,58,237,0.4)',
              }}>
                Calculate my rate →
              </button>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.28)', textAlign: 'center', marginTop: '4px' }}>
                🔒 No spam. Unsubscribe any time. We'll never share your email.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER TRUST */}
      <div style={{
        padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', justifyContent: 'center', gap: '28px', flexWrap: 'wrap',
        background: 'rgba(3,4,18,0.6)',
      }}>
        {['Free to use', 'Built for UK freelancers', 'Powered by GPT-4o'].map((t, i) => (
          <span key={i} style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.22)', fontWeight: '500' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}
