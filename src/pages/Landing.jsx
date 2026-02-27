import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function useIntersection(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return visible
}

function FadeIn({ children, delay = 0, y = 20 }) {
  const ref = useRef()
  const visible = useIntersection(ref)
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : `translateY(${y}px)`,
      transition: `opacity 0.7s ${delay}ms, transform 0.7s ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

export default function Landing() {
  const nav = useNavigate()
  const heroRef = useRef()
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.4 })

  useEffect(() => {
    const fn = e => {
      const r = heroRef.current?.getBoundingClientRect()
      if (r) setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  const G = 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 55%, #ec4899 100%)'
  const GText = { background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

  return (
    <div style={{ background: '#05061a', minHeight: '100vh', overflowX: 'hidden', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .cta { transition: all 0.2s !important; }
        .cta:hover { transform: translateY(-2px) scale(1.02) !important; filter: brightness(1.08) !important; }
        .card { transition: all 0.25s !important; }
        .card:hover { transform: translateY(-3px) !important; border-color: rgba(124,58,237,0.35) !important; }
        .nav-link { transition: color 0.15s !important; }
        .nav-link:hover { color: #fff !important; }
      `}</style>

      {/* ── NAV ── */}
      <header style={{
        position: 'fixed', top: 0, inset: '0 0 auto', zIndex: 999,
        height: '60px',
        backdropFilter: 'blur(24px) saturate(180%)',
        background: 'rgba(5,6,26,0.75)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => nav('/')}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: G,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(124,58,237,0.5)',
          }}>
            <span style={{ fontFamily: 'Outfit', fontSize: '11px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>CC</span>
          </div>
          <span style={{ fontFamily: 'Outfit', fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '-0.03em' }}>Clarity Costs</span>
        </div>

        <nav style={{ display: 'flex', gap: '36px' }}>
          {['How it works', 'For who', 'Pricing'].map(l => (
            <a key={l} className="nav-link" href="#" style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: '500' }}>{l}</a>
          ))}
        </nav>

        <button className="cta" onClick={() => nav('/start')} style={{
          fontFamily: 'Outfit', fontWeight: '700', fontSize: '14px',
          background: G, color: '#fff', border: 'none',
          borderRadius: '8px', padding: '9px 22px', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
        }}>
          Get my rate →
        </button>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 80px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Moving orb */}
        <div style={{
          position: 'absolute', width: '900px', height: '900px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(6,182,212,0.08) 40%, transparent 68%)',
          left: `calc(${mouse.x * 100}% - 450px)`,
          top: `calc(${mouse.y * 100}% - 450px)`,
          transition: 'left 1.6s cubic-bezier(.23,1,.32,1), top 1.6s cubic-bezier(.23,1,.32,1)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%', pointerEvents: 'none',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 65%)',
          animation: 'float 8s ease infinite',
        }} />
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px', opacity: 0.6,
        }} />

        <div style={{ textAlign: 'center', maxWidth: '800px', position: 'relative', zIndex: 1, width: '100%' }}>
          {/* AI badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '40px',
            animation: 'float 5s ease infinite',
          }}>
            <span style={{ fontSize: '14px' }}>✦</span>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '500', color: '#a78bfa', letterSpacing: '0.05em' }}>
              AI-Powered Rate Calculator
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Outfit', fontWeight: '900',
            fontSize: 'clamp(52px, 8.5vw, 90px)',
            lineHeight: '1.0', letterSpacing: '-0.04em',
            color: '#fff', marginBottom: '28px',
          }}>
            Stop guessing.<br />
            <span style={GText}>Start charging.</span>
          </h1>

          <p style={{
            fontFamily: 'Inter', fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: 'rgba(255,255,255,0.55)', lineHeight: '1.7',
            maxWidth: '540px', margin: '0 auto 52px',
          }}>
            The rate calculator built for UK freelancers who are done undercharging.
            Get your personalised day rate, project rate, and a script to say it out loud — in 3 minutes.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginBottom: '72px' }}>
            <button className="cta" onClick={() => nav('/start')} style={{
              fontFamily: 'Outfit', fontWeight: '800', fontSize: '17px',
              letterSpacing: '-0.02em',
              background: G, color: '#fff', border: 'none',
              borderRadius: '14px', padding: '18px 56px', cursor: 'pointer',
              boxShadow: '0 8px 40px rgba(124,58,237,0.45), 0 0 0 1px rgba(124,58,237,0.2)',
            }}>
              Calculate my rate — free →
            </button>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
              3 minutes · No card required · No signup
            </span>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', overflow: 'hidden',
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(8px)',
          }}>
            {[
              { val: '£650', label: 'Avg day rate discovered' },
              { val: '3 min', label: 'Average completion time' },
              { val: '100%', label: 'Free to use' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '28px 20px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'Outfit', fontWeight: '900', fontSize: '34px', letterSpacing: '-0.03em',
                  ...GText, marginBottom: '6px',
                }}>{s.val}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN SECTION ── */}
      <section style={{ padding: '120px 24px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(6,182,212,0.5) 70%, transparent 100%)',
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: '#7c3aed', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Sound familiar?
              </p>
              <h2 style={{
                fontFamily: 'Outfit', fontWeight: '900',
                fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: '1.08',
              }}>
                Undercharging isn't a pricing problem.<br />
                <span style={GText}>It's a clarity problem.</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              { emoji: '🎲', title: 'You guess your rate', desc: 'You pick a number that "feels right" — then spend the next week wondering if you left money on the table.', border: 'rgba(124,58,237,0.25)', glow: 'rgba(124,58,237,0.08)' },
              { emoji: '📉', title: 'You undercharge to win', desc: "You drop your price before they even push back. Now you're resentful halfway through the project.", border: 'rgba(6,182,212,0.25)', glow: 'rgba(6,182,212,0.08)' },
              { emoji: '😶', title: 'You freeze when asked', desc: '"What do you charge?" lands like a punch. You mumble something vague and lose the room.', border: 'rgba(236,72,153,0.25)', glow: 'rgba(236,72,153,0.08)' },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="card" style={{
                  background: `rgba(8,10,32,0.8)`,
                  border: `1px solid ${c.border}`,
                  borderRadius: '20px', padding: '32px',
                  boxShadow: `0 4px 40px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                  height: '100%',
                }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    background: c.glow, border: `1px solid ${c.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', marginBottom: '22px',
                    boxShadow: `0 4px 16px ${c.glow}`,
                  }}>{c.emoji}</div>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '19px', letterSpacing: '-0.03em', color: '#fff', marginBottom: '12px' }}>{c.title}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.65' }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '120px 24px', background: 'rgba(3,4,18,0.8)', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)',
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: '#06b6d4', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>
                How it works
              </p>
              <h2 style={{ fontFamily: 'Outfit', fontWeight: '900', fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: '1.08' }}>
                From "I'm not sure" to<br />
                <span style={GText}>"My rate is £X."</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px' }}>
            {[
              { num: '01', icon: '⚡', title: 'Tell us about your work', desc: 'Specialty, experience, location, and the kind of clients you want to work with. 8 quick questions.', c: '#7c3aed' },
              { num: '02', icon: '🧠', title: 'We calculate your number', desc: 'GPT-4o analyses UK market rates, your overheads, tax, and target income to give you a real figure.', c: '#06b6d4' },
              { num: '03', icon: '🎯', title: 'You charge with clarity', desc: 'Your personalised rate card, positioning statement, and a script for the "what do you charge?" moment.', c: '#ec4899' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="card" style={{
                  background: 'rgba(8,10,32,0.9)',
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: i === 0 ? '20px 0 0 20px' : i === 2 ? '0 20px 20px 0' : '0',
                  padding: '40px 36px', position: 'relative', overflow: 'hidden',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  height: '100%',
                }}>
                  <div style={{
                    position: 'absolute', top: '20px', right: '24px',
                    fontFamily: 'Outfit', fontSize: '64px', fontWeight: '900',
                    color: `${s.c}10`, lineHeight: 1, userSelect: 'none',
                  }}>{s.num}</div>
                  <div style={{ fontSize: '30px', marginBottom: '20px' }}>{s.icon}</div>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '20px', letterSpacing: '-0.03em', color: '#fff', marginBottom: '12px' }}>{s.title}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.65' }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: '#ec4899', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>
                What you get
              </p>
              <h2 style={{ fontFamily: 'Outfit', fontWeight: '900', fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: '1.08' }}>
                Not just a number.<br />
                <span style={GText}>A complete rate toolkit.</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {[
              { icon: '💰', title: 'Your Day Rate', desc: 'A specific number based on your market, experience, and income target — not a guess.', free: true },
              { icon: '📁', title: 'Project & Retainer Rates', desc: 'Fixed-price and monthly retainer rates calibrated to your specialty and client type.', free: true },
              { icon: '🎯', title: 'Positioning Statement', desc: 'Two sentences that describe exactly what you do and who you serve. Confident and specific.', free: true },
              { icon: '💬', title: 'Charge Script', desc: 'A natural script you can say when a client asks "what do you charge?" Written in your voice.', free: true },
              { icon: '📄', title: 'Full PDF Report', desc: '7-page PDF with your rate card, objection scripts, email templates, and 6-month roadmap.', free: false },
              { icon: '📈', title: 'Raise Your Rates Guide', desc: '10 personalised strategies to raise your rates — built for your exact discipline and market.', free: false },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 55}>
                <div className="card" style={{
                  background: 'rgba(8,10,32,0.9)',
                  border: item.free ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '18px', padding: '26px',
                  boxShadow: item.free ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 32px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.04)',
                  position: 'relative', height: '100%',
                }}>
                  <div style={{
                    position: 'absolute', top: '14px', right: '14px',
                    background: item.free ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.15)',
                    border: item.free ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(124,58,237,0.3)',
                    borderRadius: '6px', padding: '3px 9px',
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: '600',
                    color: item.free ? 'rgba(255,255,255,0.4)' : '#a78bfa', letterSpacing: '0.05em',
                  }}>{item.free ? 'FREE' : '£9'}</div>
                  <div style={{ fontSize: '26px', marginBottom: '14px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '16px', letterSpacing: '-0.025em', color: '#fff', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{
        padding: '52px 24px',
        background: 'rgba(3,4,18,0.9)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <FadeIn>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '28px 52px' }}>
            {[
              { icon: '🇬🇧', text: 'Built for UK freelancers' },
              { icon: '🧠', text: 'Powered by GPT-4o' },
              { icon: '🔒', text: 'No card required' },
              { icon: '⚡', text: '3 minutes to complete' },
              { icon: '✉️', text: 'Results sent to your inbox' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.5)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '140px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '800px', height: '800px', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, rgba(6,182,212,0.07) 40%, transparent 65%)',
        }} />
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: '600', color: '#7c3aed', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '28px' }}>
              Ready?
            </p>
            <h2 style={{
              fontFamily: 'Outfit', fontWeight: '900',
              fontSize: 'clamp(44px, 7vw, 74px)',
              letterSpacing: '-0.045em', lineHeight: '1.0',
              color: '#fff', marginBottom: '8px',
            }}>
              Your rate is waiting.
            </h2>
            <p style={{
              fontFamily: 'Outfit', fontWeight: '900',
              fontSize: 'clamp(36px, 5.5vw, 58px)',
              letterSpacing: '-0.04em', lineHeight: '1.1',
              ...GText, marginBottom: '44px',
            }}>
              Go find it.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.45)', marginBottom: '44px', lineHeight: '1.6' }}>
              3 minutes. No fluff. Just your number.
            </p>
            <button className="cta" onClick={() => nav('/start')} style={{
              fontFamily: 'Outfit', fontWeight: '800', fontSize: '17px', letterSpacing: '-0.02em',
              background: G, color: '#fff', border: 'none',
              borderRadius: '14px', padding: '18px 56px', cursor: 'pointer',
              boxShadow: '0 8px 48px rgba(124,58,237,0.5), 0 0 0 1px rgba(124,58,237,0.2)',
            }}>
              Start now — it's free →
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '32px 40px', borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(3,4,18,0.95)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '26px', height: '26px', borderRadius: '7px', background: G,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(124,58,237,0.4)',
          }}>
            <span style={{ fontFamily: 'Outfit', fontSize: '10px', fontWeight: '800', color: '#fff' }}>CC</span>
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: '700', fontSize: '14px', color: '#fff', letterSpacing: '-0.02em' }}>Clarity Costs</span>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginLeft: '4px' }}>Built for UK freelancers who are done undercharging.</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 claritycosts.co.uk</span>
          <a href="mailto:hello@claritycosts.co.uk" style={{ fontFamily: 'Inter', fontSize: '13px', color: '#a78bfa', fontWeight: '500', textDecoration: 'none' }}>hello@claritycosts.co.uk</a>
        </div>
      </footer>
    </div>
  )
}
