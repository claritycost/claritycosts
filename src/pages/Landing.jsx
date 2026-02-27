import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const C = {
  bg: '#060d1a',
  bgDeep: '#030810',
  card: '#0a1628',
  cardBorder: 'rgba(0,232,122,0.12)',
  green: '#00e87a',
  greenDim: '#00c466',
  greenGlow: 'rgba(0,232,122,0.15)',
  greenGlowStrong: 'rgba(0,232,122,0.35)',
  teal: '#00d4b0',
  white: '#ffffff',
  muted: 'rgba(255,255,255,0.55)',
  faint: 'rgba(255,255,255,0.12)',
  navy: '#0f1e35',
}

const FONT_DISPLAY = '"Syne", sans-serif'
const FONT_BODY = '"DM Sans", sans-serif'
const FONT_MONO = '"DM Mono", monospace'

function useIntersection(ref, threshold = 0.15) {
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
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.3 })
  const heroRef = useRef()

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: FONT_BODY, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: ${C.greenGlow}; color: ${C.green}; }
        @keyframes pulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 40px ${C.greenGlowStrong} !important; }
        .cta-btn:active { transform: translateY(0); }
        .nav-link:hover { color: ${C.white} !important; }
        .card-hover:hover { border-color: ${C.cardBorder} !important; transform: translateY(-4px); background: rgba(10,22,40,0.9) !important; }
        .ghost-btn:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.3) !important; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(6,13,26,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${C.faint}`,
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: `linear-gradient(135deg, ${C.green}, ${C.teal})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 16px ${C.greenGlowStrong}`,
          }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '14px', fontWeight: '500', color: C.bgDeep }}>CC</span>
          </div>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: '16px', fontWeight: '800', color: C.white, letterSpacing: '-0.02em' }}>
            Clarity Costs
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['How it works', 'For who', 'Pricing'].map(l => (
            <a key={l} className="nav-link" href="#" style={{
              fontSize: '14px', color: C.muted, textDecoration: 'none',
              transition: 'color 0.2s', fontWeight: '500',
            }}>{l}</a>
          ))}
        </div>

        <button className="cta-btn" onClick={() => navigate('/start')} style={{
          background: `linear-gradient(135deg, ${C.green}, ${C.teal})`,
          color: C.bgDeep, border: 'none', borderRadius: '8px',
          padding: '9px 20px', fontSize: '14px', fontWeight: '600',
          cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: `0 4px 20px ${C.greenGlow}`,
          fontFamily: FONT_BODY,
        }}>
          Get started →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 80px', overflow: 'hidden',
      }}>
        {/* Animated background orb */}
        <div style={{
          position: 'absolute',
          width: '700px', height: '700px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,232,122,0.12) 0%, rgba(0,212,176,0.06) 40%, transparent 70%)`,
          left: `calc(${mousePos.x * 100}% - 350px)`,
          top: `calc(${mousePos.y * 100}% - 350px)`,
          transition: 'left 1.2s ease, top 1.2s ease',
          pointerEvents: 'none',
        }} />

        {/* Static glow spots */}
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,212,176,0.08) 0%, transparent 70%)`,
          pointerEvents: 'none', animation: 'pulse 6s ease infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '25%', left: '8%',
          width: '200px', height: '200px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,232,122,0.07) 0%, transparent 70%)`,
          pointerEvents: 'none', animation: 'pulse 8s ease infinite 2s',
        }} />

        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
          backgroundImage: `
            linear-gradient(rgba(0,232,122,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,232,122,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />

        {/* Floating badge */}
        <div style={{ textAlign: 'center', maxWidth: '760px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: `1px solid ${C.cardBorder}`,
            borderRadius: '20px', padding: '6px 16px', marginBottom: '32px',
            background: 'rgba(0,232,122,0.06)',
            animation: 'float 5s ease infinite',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: C.green, animation: 'blink 2s infinite',
              boxShadow: `0 0 8px ${C.green}`,
            }} />
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: C.green, fontWeight: '500', letterSpacing: '0.08em' }}>
              FREE · UK FREELANCERS · POWERED BY GPT-4o
            </span>
          </div>

          <h1 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 'clamp(42px, 7.5vw, 80px)',
            fontWeight: '800', color: C.white,
            lineHeight: '1.05', letterSpacing: '-0.04em',
            margin: '0 0 24px',
          }}>
            Stop guessing.<br />
            <span style={{
              background: `linear-gradient(135deg, ${C.green} 0%, ${C.teal} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Start charging.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: C.muted,
            lineHeight: '1.65', margin: '0 auto 48px',
            maxWidth: '540px', fontWeight: '400',
          }}>
            The rate calculator built for UK freelancers who are done undercharging.
            Get your personalised day rate, project rate, and a script to say it out loud — in 3 minutes.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <button className="cta-btn" onClick={() => navigate('/start')} style={{
              background: `linear-gradient(135deg, ${C.green} 0%, ${C.teal} 100%)`,
              color: C.bgDeep, border: 'none', borderRadius: '12px',
              padding: '18px 48px', fontSize: '17px', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.25s',
              boxShadow: `0 4px 24px ${C.greenGlow}, 0 0 0 1px rgba(0,232,122,0.2)`,
              letterSpacing: '-0.01em', fontFamily: FONT_BODY,
            }}>
              Calculate my rate — free →
            </button>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: C.muted, letterSpacing: '0.06em' }}>
              3 minutes · No card · No signup
            </span>
          </div>

          {/* Hero stats bar */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '48px',
            marginTop: '72px', padding: '24px 32px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${C.faint}`, borderRadius: '16px',
            flexWrap: 'wrap',
          }}>
            {[
              { val: '£650', label: 'Avg day rate discovered' },
              { val: '3 min', label: 'Average completion time' },
              { val: '100%', label: 'Free to use' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: '28px', fontWeight: '800',
                  background: `linear-gradient(135deg, ${C.green}, ${C.teal})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{s.val}</div>
                <div style={{ fontSize: '13px', color: C.muted, marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${C.green}, transparent)`,
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              fontFamily: FONT_MONO, fontSize: '12px', color: C.green,
              letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase',
            }}>Sound familiar?</div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: '800', color: C.white, letterSpacing: '-0.03em',
              lineHeight: '1.1', margin: '0',
            }}>
              Undercharging isn't a pricing problem.<br />
              <span style={{ color: C.green }}>It's a clarity problem.</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              {
                icon: '🎲',
                title: 'You guess your rate',
                body: 'You pick a number that "feels right" — then spend the next week wondering if you left money on the table.',
              },
              {
                icon: '📉',
                title: 'You undercharge to win',
                body: 'You drop your price before they even push back. Now you\'re resentful halfway through the project.',
              },
              {
                icon: '😶',
                title: 'You freeze when asked',
                body: '"What do you charge?" lands like a punch. You mumble something vague and lose the room.',
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="card-hover" style={{
                  background: C.card, border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: '16px', padding: '28px',
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: 'rgba(0,232,122,0.08)', border: `1px solid ${C.cardBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', marginBottom: '20px',
                  }}>{card.icon}</div>
                  <h3 style={{
                    fontFamily: FONT_DISPLAY, fontSize: '18px', fontWeight: '800',
                    color: C.white, margin: '0 0 10px', letterSpacing: '-0.02em',
                  }}>{card.title}</h3>
                  <p style={{ fontSize: '15px', color: C.muted, lineHeight: '1.6', margin: 0 }}>{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 24px', background: C.bgDeep, position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: '12px', color: C.green, letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
              How it works
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: '800', color: C.white, letterSpacing: '-0.03em', lineHeight: '1.1', margin: 0,
            }}>
              From "I'm not sure" to<br />
              <span style={{ color: C.green }}>"My rate is £X."</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
            {[
              {
                step: '01',
                title: 'Tell us about your work',
                body: 'Specialty, experience, location, and the kind of clients you want to work with. 8 quick questions.',
                icon: '⚡',
              },
              {
                step: '02',
                title: 'We calculate your number',
                body: 'GPT-4o analyses UK market rates, your overheads, tax, and target income to give you a real figure.',
                icon: '🧠',
              },
              {
                step: '03',
                title: 'You charge with clarity',
                body: 'Your personalised rate card, positioning statement, and a script for the "what do you charge?" moment.',
                icon: '🎯',
              },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div style={{
                  background: C.card, padding: '36px 32px',
                  borderLeft: i === 0 ? `1px solid ${C.cardBorder}` : 'none',
                  borderTop: `1px solid ${C.cardBorder}`,
                  borderRight: `1px solid ${C.cardBorder}`,
                  borderBottom: `1px solid ${C.cardBorder}`,
                  borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: '20px', right: '24px',
                    fontFamily: FONT_MONO, fontSize: '48px', fontWeight: '500',
                    color: 'rgba(0,232,122,0.08)', lineHeight: 1,
                  }}>{step.step}</div>
                  <div style={{ fontSize: '28px', marginBottom: '16px' }}>{step.icon}</div>
                  <h3 style={{
                    fontFamily: FONT_DISPLAY, fontSize: '20px', fontWeight: '800',
                    color: C.white, margin: '0 0 12px', letterSpacing: '-0.02em',
                  }}>{step.title}</h3>
                  <p style={{ fontSize: '15px', color: C.muted, lineHeight: '1.6', margin: 0 }}>{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: '12px', color: C.green, letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
              What you get
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: '800', color: C.white, letterSpacing: '-0.03em', lineHeight: '1.1', margin: 0,
            }}>
              Not just a number.<br />
              <span style={{ color: C.green }}>A complete rate toolkit.</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { icon: '💰', title: 'Your Day Rate', body: 'A specific number based on your market, experience, and income target — not a guess.', free: true },
              { icon: '📁', title: 'Project & Retainer Rates', body: 'Fixed-price and monthly retainer rates calibrated to your specialty and client type.', free: true },
              { icon: '🎯', title: 'Positioning Statement', body: 'Two sentences that describe exactly what you do and who you serve. Confident and specific.', free: true },
              { icon: '💬', title: 'Charge Script', body: 'A natural script you can say when a client asks "what do you charge?" Written in your voice.', free: true },
              { icon: '📄', title: 'Full PDF Report', body: '7-page PDF with your rate card, objection scripts, email templates, and 6-month roadmap.', free: false },
              { icon: '📈', title: 'Raise Your Rates Guide', body: '10 personalised strategies to raise your rates — built for your exact discipline and market.', free: false },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="card-hover" style={{
                  background: C.card,
                  border: item.free ? `1px solid rgba(255,255,255,0.07)` : `1px solid ${C.cardBorder}`,
                  borderRadius: '16px', padding: '24px',
                  transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
                }}>
                  {!item.free && (
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: 'rgba(0,232,122,0.12)', border: `1px solid ${C.cardBorder}`,
                      borderRadius: '6px', padding: '2px 8px',
                      fontFamily: FONT_MONO, fontSize: '10px', color: C.green, letterSpacing: '0.08em',
                    }}>£9</div>
                  )}
                  {item.free && (
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.1)`,
                      borderRadius: '6px', padding: '2px 8px',
                      fontFamily: FONT_MONO, fontSize: '10px', color: C.muted, letterSpacing: '0.08em',
                    }}>FREE</div>
                  )}
                  <div style={{ fontSize: '24px', marginBottom: '14px' }}>{item.icon}</div>
                  <h3 style={{
                    fontFamily: FONT_DISPLAY, fontSize: '16px', fontWeight: '800',
                    color: C.white, margin: '0 0 8px', letterSpacing: '-0.02em',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.6', margin: 0 }}>{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{
        padding: '60px 24px',
        background: `linear-gradient(135deg, rgba(0,232,122,0.04), rgba(0,212,176,0.04))`,
        borderTop: `1px solid ${C.cardBorder}`, borderBottom: `1px solid ${C.cardBorder}`,
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '40px' }}>
              {[
                { icon: '🇬🇧', text: 'Built for UK freelancers' },
                { icon: '🧠', text: 'Powered by GPT-4o' },
                { icon: '🔒', text: 'No card required' },
                { icon: '⚡', text: '3 minutes to complete' },
                { icon: '✉️', text: 'Results sent to your inbox' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span style={{ fontSize: '14px', color: C.muted, fontWeight: '500' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,232,122,0.08) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
            <div style={{
              display: 'inline-block', fontFamily: FONT_MONO,
              fontSize: '12px', color: C.green, letterSpacing: '0.15em',
              marginBottom: '24px', textTransform: 'uppercase',
            }}>Ready?</div>
            <h2 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(36px, 6vw, 62px)',
              fontWeight: '800', color: C.white,
              letterSpacing: '-0.04em', lineHeight: '1.05',
              margin: '0 0 16px',
            }}>
              Your rate is waiting.
            </h2>
            <p style={{
              fontFamily: FONT_DISPLAY, fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '800', letterSpacing: '-0.03em',
              background: `linear-gradient(135deg, ${C.green}, ${C.teal})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              margin: '0 0 40px',
            }}>
              Go find it.
            </p>
            <p style={{ fontSize: '16px', color: C.muted, margin: '0 0 40px', lineHeight: '1.6' }}>
              3 minutes. No fluff. Just your number.
            </p>
            <button className="cta-btn" onClick={() => navigate('/start')} style={{
              background: `linear-gradient(135deg, ${C.green} 0%, ${C.teal} 100%)`,
              color: C.bgDeep, border: 'none', borderRadius: '12px',
              padding: '18px 52px', fontSize: '17px', fontWeight: '700',
              cursor: 'pointer', transition: 'all 0.25s',
              boxShadow: `0 4px 32px ${C.greenGlowStrong}`,
              fontFamily: FONT_BODY, letterSpacing: '-0.01em',
            }}>
              Start now — it's free →
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '32px 24px',
        borderTop: `1px solid ${C.faint}`,
        background: C.bgDeep,
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '6px',
              background: `linear-gradient(135deg, ${C.green}, ${C.teal})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: '10px', fontWeight: '500', color: C.bgDeep }}>CC</span>
            </div>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: '14px', fontWeight: '800', color: C.white }}>Clarity Costs</span>
            <span style={{ fontSize: '13px', color: C.muted, marginLeft: '8px' }}>Built for UK freelancers who are done undercharging.</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: C.muted }}>© 2026 claritycosts.co.uk</span>
            <a href="mailto:hello@claritycosts.co.uk" style={{ fontSize: '13px', color: C.green, textDecoration: 'none', fontWeight: '500' }}>
              hello@claritycosts.co.uk
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
