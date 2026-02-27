import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const C = {
  bg: '#060713',
  bgDeep: '#030610',
  card: '#0a0d1e',
  cardBorder: 'rgba(139,92,246,0.18)',
  cardBorderTeal: 'rgba(0,212,176,0.18)',
  purple: '#8b5cf6',
  teal: '#00d4b0',
  pink: '#f472b6',
  white: '#ffffff',
  muted: 'rgba(255,255,255,0.5)',
  faint: 'rgba(255,255,255,0.08)',
}

const FONT_DISPLAY = '"Syne", sans-serif'
const FONT_BODY = '"DM Sans", sans-serif'
const FONT_MONO = '"DM Mono", monospace'

// Gradient text style
const gradText = {
  background: 'linear-gradient(135deg, #8b5cf6 0%, #00d4b0 50%, #f472b6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function useIntersection(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef()
  const visible = useIntersection(ref)
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.4 })
  const heroRef = useRef()

  useEffect(() => {
    const fn = (e) => {
      if (!heroRef.current) return
      const r = heroRef.current.getBoundingClientRect()
      setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: FONT_BODY, overflowX: 'hidden', color: C.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .btn-primary { transition: all 0.25s !important; }
        .btn-primary:hover { transform: translateY(-2px) !important; filter: brightness(1.1); box-shadow: 0 12px 48px rgba(139,92,246,0.5) !important; }
        .btn-ghost:hover { background: rgba(255,255,255,0.06) !important; }
        .card-h:hover { transform: translateY(-4px); border-color: rgba(139,92,246,0.3) !important; }
        .nav-a:hover { color: #fff !important; }
        a { text-decoration: none; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        backdropFilter: 'blur(20px)', background: 'rgba(6,7,19,0.8)',
        borderBottom: `1px solid ${C.faint}`,
        height: '64px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0a0d1e"/>
            <rect width="32" height="32" rx="8" fill="url(#lg1)" fillOpacity="0.2"/>
            <text x="16" y="21" fontFamily="monospace" fontSize="11" fontWeight="700" fill="url(#lg1)" textAnchor="middle">CC</text>
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8b5cf6"/><stop offset="0.5" stopColor="#00d4b0"/><stop offset="1" stopColor="#f472b6"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: '16px', fontWeight: '800', color: C.white, letterSpacing: '-0.02em' }}>
            Clarity Costs
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['How it works', 'For who', 'Pricing'].map(l => (
            <a key={l} className="nav-a" href="#" style={{ fontSize: '14px', color: C.muted, transition: 'color 0.2s', fontWeight: '500' }}>{l}</a>
          ))}
        </div>

        <button className="btn-primary" onClick={() => navigate('/start')} style={{
          background: 'linear-gradient(135deg, #8b5cf6, #00d4b0)',
          color: '#fff', border: 'none', borderRadius: '8px',
          padding: '9px 20px', fontSize: '14px', fontWeight: '600',
          cursor: 'pointer', fontFamily: FONT_BODY,
          boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
        }}>
          Get started →
        </button>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 80px', overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(0,212,176,0.08) 40%, transparent 70%)',
          left: `calc(${mousePos.x * 100}% - 400px)`,
          top: `calc(${mousePos.y * 100}% - 400px)`,
          transition: 'left 1.4s ease, top 1.4s ease', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '15%', right: '5%',
          width: '400px', height: '400px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 65%)',
          animation: 'pulse 7s ease infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '5%',
          width: '300px', height: '300px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(0,212,176,0.08) 0%, transparent 65%)',
          animation: 'pulse 9s ease infinite 3s',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div style={{ textAlign: 'center', maxWidth: '780px', position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(139,92,246,0.25)', borderRadius: '20px',
            padding: '6px 16px', marginBottom: '36px',
            background: 'rgba(139,92,246,0.08)',
            animation: 'float 5s ease infinite',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#8b5cf6', animation: 'blink 2s infinite',
              boxShadow: '0 0 8px #8b5cf6',
            }} />
            <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: '#a78bfa', fontWeight: '500', letterSpacing: '0.1em' }}>
              FREE · UK FREELANCERS · POWERED BY GPT-4o
            </span>
          </div>

          <h1 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 'clamp(46px, 8vw, 84px)',
            fontWeight: '800', color: C.white,
            lineHeight: '1.02', letterSpacing: '-0.04em',
            marginBottom: '24px',
          }}>
            Stop guessing.<br />
            <span style={gradText}>Start charging.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)', color: C.muted,
            lineHeight: '1.7', maxWidth: '520px', margin: '0 auto 48px',
          }}>
            The rate calculator built for UK freelancers who are done undercharging.
            Get your personalised day rate, project rate, and a script to say it out loud — in 3 minutes.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <button className="btn-primary" onClick={() => navigate('/start')} style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #00d4b0 60%, #f472b6 100%)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '17px 52px', fontSize: '17px', fontWeight: '700',
              cursor: 'pointer', fontFamily: FONT_BODY, letterSpacing: '-0.01em',
              boxShadow: '0 4px 32px rgba(139,92,246,0.4)',
            }}>
              Calculate my rate — free →
            </button>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: C.muted, letterSpacing: '0.06em' }}>
              3 minutes · No card · No signup
            </span>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '0',
            marginTop: '72px',
            border: `1px solid ${C.faint}`, borderRadius: '16px',
            overflow: 'hidden', flexWrap: 'wrap',
          }}>
            {[
              { val: '£650', label: 'Avg day rate discovered' },
              { val: '3 min', label: 'Average completion' },
              { val: '100%', label: 'Free to use' },
            ].map((s, i) => (
              <div key={i} style={{
                flex: '1', minWidth: '160px', padding: '24px',
                borderRight: i < 2 ? `1px solid ${C.faint}` : 'none',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: '30px', fontWeight: '800',
                  ...gradText, marginBottom: '6px',
                }}>{s.val}</div>
                <div style={{ fontSize: '13px', color: C.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, #8b5cf6, #00d4b0, #f472b6, transparent)',
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: '11px', color: '#a78bfa', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
              Sound familiar?
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.03em',
            }}>
              Undercharging isn't a pricing problem.<br />
              <span style={gradText}>It's a clarity problem.</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🎲', title: 'You guess your rate', body: 'You pick a number that "feels right" — then spend the next week wondering if you left money on the table.', accent: C.purple },
              { icon: '📉', title: 'You undercharge to win', body: "You drop your price before they even push back. Now you're resentful halfway through the project.", accent: C.teal },
              { icon: '😶', title: 'You freeze when asked', body: '"What do you charge?" lands like a punch. You mumble something vague and lose the room.', accent: C.pink },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="card-h" style={{
                  background: C.card, border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: '16px', padding: '28px',
                  transition: 'all 0.3s', height: '100%',
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: `${card.accent}18`, border: `1px solid ${card.accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', marginBottom: '18px',
                  }}>{card.icon}</div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: '17px', fontWeight: '800', color: C.white, marginBottom: '10px', letterSpacing: '-0.02em' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.65' }}>{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '100px 24px', background: C.bgDeep, position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)',
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: '11px', color: '#a78bfa', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
              How it works
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.03em',
            }}>
              From "I'm not sure" to<br />
              <span style={gradText}>"My rate is £X."</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { step: '01', icon: '⚡', title: 'Tell us about your work', body: 'Specialty, experience, location, and the kind of clients you want. 8 quick questions.', color: C.purple },
              { step: '02', icon: '🧠', title: 'We calculate your number', body: 'GPT-4o analyses UK market rates, your overheads, tax, and target income to give you a real figure.', color: C.teal },
              { step: '03', icon: '🎯', title: 'You charge with clarity', body: 'Your personalised rate card, positioning statement, and a script for the "what do you charge?" moment.', color: C.pink },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="card-h" style={{
                  background: C.card, border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: '16px', padding: '32px',
                  transition: 'all 0.3s', position: 'relative', overflow: 'hidden', height: '100%',
                }}>
                  <div style={{
                    position: 'absolute', top: '16px', right: '20px',
                    fontFamily: FONT_MONO, fontSize: '52px', fontWeight: '700',
                    color: `${step.color}12`, lineHeight: 1, userSelect: 'none',
                  }}>{step.step}</div>
                  <div style={{ fontSize: '28px', marginBottom: '18px' }}>{step.icon}</div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: '18px', fontWeight: '800', color: C.white, marginBottom: '10px', letterSpacing: '-0.02em' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.65' }}>{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: '11px', color: '#a78bfa', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
              What you get
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              Not just a number.<br />
              <span style={gradText}>A complete rate toolkit.</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
            {[
              { icon: '💰', title: 'Your Day Rate', body: 'A specific number based on your market, experience, and income target — not a guess.', free: true, color: C.purple },
              { icon: '📁', title: 'Project & Retainer Rates', body: 'Fixed-price and monthly retainer rates calibrated to your specialty and client type.', free: true, color: C.teal },
              { icon: '🎯', title: 'Positioning Statement', body: 'Two sentences describing exactly what you do and who you serve. Confident and specific.', free: true, color: C.pink },
              { icon: '💬', title: 'Charge Script', body: 'A natural script you can say when a client asks "what do you charge?" Written in your voice.', free: true, color: C.purple },
              { icon: '📄', title: 'Full PDF Report', body: '7-page PDF with your rate card, objection scripts, email templates, and 6-month roadmap.', free: false, color: C.teal },
              { icon: '📈', title: 'Raise Your Rates Guide', body: '10 personalised strategies to raise your rates — built for your exact discipline and market.', free: false, color: C.pink },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="card-h" style={{
                  background: C.card,
                  border: `1px solid ${item.free ? 'rgba(255,255,255,0.07)' : `${item.color}25`}`,
                  borderRadius: '14px', padding: '22px',
                  transition: 'all 0.3s', position: 'relative', height: '100%',
                }}>
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: item.free ? 'rgba(255,255,255,0.05)' : `${item.color}15`,
                    border: `1px solid ${item.free ? C.faint : `${item.color}30`}`,
                    borderRadius: '5px', padding: '2px 8px',
                    fontFamily: FONT_MONO, fontSize: '10px',
                    color: item.free ? C.muted : item.color, letterSpacing: '0.08em',
                  }}>{item.free ? 'FREE' : '£9'}</div>
                  <div style={{ fontSize: '22px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: '15px', fontWeight: '800', color: C.white, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: C.muted, lineHeight: '1.6' }}>{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={{
        padding: '56px 24px',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(0,212,176,0.05), rgba(244,114,182,0.05))',
        borderTop: `1px solid ${C.faint}`, borderBottom: `1px solid ${C.faint}`,
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '32px 48px' }}>
              {[
                { icon: '🇬🇧', text: 'Built for UK freelancers' },
                { icon: '🧠', text: 'Powered by GPT-4o' },
                { icon: '🔒', text: 'No card required' },
                { icon: '⚡', text: '3 minutes to complete' },
                { icon: '✉️', text: 'Results sent to your inbox' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '17px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', color: C.muted, fontWeight: '500' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,212,176,0.06) 40%, transparent 65%)',
        }} />
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: '11px', color: '#a78bfa', letterSpacing: '0.15em', marginBottom: '24px', textTransform: 'uppercase' }}>
              Ready?
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(40px, 7vw, 68px)',
              fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '1.0',
              marginBottom: '16px',
            }}>
              Your rate is waiting.
            </h2>
            <p style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '800', letterSpacing: '-0.03em',
              ...gradText, marginBottom: '40px', lineHeight: '1.1',
            }}>
              Go find it.
            </p>
            <p style={{ fontSize: '16px', color: C.muted, marginBottom: '40px', lineHeight: '1.6' }}>
              3 minutes. No fluff. Just your number.
            </p>
            <button className="btn-primary" onClick={() => navigate('/start')} style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #00d4b0 60%, #f472b6 100%)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '18px 52px', fontSize: '17px', fontWeight: '700',
              cursor: 'pointer', fontFamily: FONT_BODY, letterSpacing: '-0.01em',
              boxShadow: '0 4px 40px rgba(139,92,246,0.45)',
            }}>
              Start now — it's free →
            </button>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px', borderTop: `1px solid ${C.faint}`, background: C.bgDeep }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0a0d1e"/>
              <text x="16" y="21" fontFamily="monospace" fontSize="11" fontWeight="700" fill="url(#lg2)" textAnchor="middle">CC</text>
              <defs>
                <linearGradient id="lg2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6"/><stop offset="0.5" stopColor="#00d4b0"/><stop offset="1" stopColor="#f472b6"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: '14px', fontWeight: '800', color: C.white }}>Clarity Costs</span>
            <span style={{ fontSize: '13px', color: C.muted, marginLeft: '8px' }}>Built for UK freelancers who are done undercharging.</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: C.muted }}>© 2026 claritycosts.co.uk</span>
            <a href="mailto:hello@claritycosts.co.uk" style={{ fontSize: '13px', color: '#a78bfa', fontWeight: '500' }}>
              hello@claritycosts.co.uk
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
