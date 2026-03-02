import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// ─── Design tokens (from mockup) ─────────────────────────────────────────────
const NAVY     = '#1E3A5F'
const GOLD     = '#E8A020'
const GOLDHOV  = '#d4911a'
const STATS_BG = '#1a2535'
const FEAT_BG  = '#F0F2F6'
const WHITE    = '#ffffff'
const TEXT     = '#1A1A2E'
const MUTED    = '#64748b'
const BORDER   = '#E2E8F0'

// ─── Features (exact copy from mockup) ───────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: 'Market Benchmarked',
    desc: 'Rates calibrated against live UK freelance market data for your specific discipline.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Confidence Scripts',
    desc: 'Get word-for-word scripts to justify your rate and handle client objections.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'AI Invoice Generation',
    desc: 'Paid users get instant, professional AI-generated invoices based on their new rates.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Instant Results',
    desc: 'Answer 8 simple questions and get your baseline rate card immediately for free.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Save Admin Time',
    desc: "Stop researching rates. We've done the hard work so you can focus on client work.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Actionable Tips',
    desc: 'Receive tailored advice on how to position yourself to command higher fees.',
  },
]

const STATS = [
  { num: '3 min', label: 'To get your rate',   gold: true  },
  { num: '£650',  label: 'Avg. Day Rate Found', gold: false },
  { num: '100%',  label: 'UK Market Data',      gold: false },
  { num: 'GDPR',  label: 'Compliant',           gold: false },
]

export default function Landing() {
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: WHITE, color: TEXT }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link { transition: color 0.15s !important; }
        .nav-link:hover { color: ${NAVY} !important; }

        .btn-gold {
          background: ${GOLD};
          color: #1a1a2e;
          border: none;
          border-radius: 6px;
          padding: 13px 26px;
          font-family: Inter, sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.18s, transform 0.12s;
          white-space: nowrap;
          display: inline-block;
        }
        .btn-gold:hover { background: ${GOLDHOV}; transform: translateY(-1px); }

        .btn-pill {
          background: ${GOLD};
          color: #1a1a2e;
          border: none;
          border-radius: 100px;
          padding: 9px 18px;
          font-family: Inter, sans-serif;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.18s;
          white-space: nowrap;
        }
        .btn-pill:hover { background: ${GOLDHOV}; }

        .btn-outline {
          background: transparent;
          color: ${WHITE};
          border: 1.5px solid rgba(255,255,255,0.32);
          border-radius: 6px;
          padding: 13px 26px;
          font-family: Inter, sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: border-color 0.18s, background 0.18s;
        }
        .btn-outline:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.06);
        }

        .feat-card {
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .feat-card:hover {
          box-shadow: 0 8px 32px rgba(30,58,95,0.12) !important;
          transform: translateY(-3px);
        }

        .footer-link:hover { color: rgba(255,255,255,0.7) !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        .h1 { animation: fadeUp 0.5s ease both; }
        .h2 { animation: fadeUp 0.5s 0.1s ease both; }
        .h3 { animation: fadeUp 0.5s 0.2s ease both; }
        .h4 { animation: fadeUp 0.5s 0.3s ease both; }

        @media (max-width: 768px) {
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .feat-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-ctas { flex-direction: column; align-items: center; }
          .hero-ctas .btn-gold, .hero-ctas .btn-outline { width: 100%; text-align: center; justify-content: center; }
        }
      `}</style>

      {/* ─────────────────────── NAV ─────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: WHITE,
        borderBottom: `1px solid ${scrolled ? BORDER : 'transparent'}`,
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.07)' : 'none',
        transition: 'box-shadow 0.25s, border-color 0.25s',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 32px',
          height: 280,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="Clarity Costs"
              style={{ height: 260, width: 'auto', display: 'block' }}
            />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <a href="#why" className="nav-link" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: '#334155', textDecoration: 'none' }}>How it works</a>
            <Link to="/pricing" className="nav-link" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: '#334155', textDecoration: 'none' }}>Pricing</Link>
            <Link to="/results" className="nav-link" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 14, color: '#334155', textDecoration: 'none' }}>My Rates</Link>
            <button className="btn-pill" onClick={() => nav('/start')}>Calculate My Rate</button>
          </div>
        </div>
      </header>

      {/* ─────────────────────── HERO ────────────────────────────────────── */}
      <section style={{
        background: 'radial-gradient(ellipse 85% 65% at 50% 15%, #1c2e4a 0%, #0f1623 52%, #090d17 100%)',
        padding: '100px 32px 130px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Soft purple glow at top-centre */}
        <div style={{
          position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 340, pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(80,90,200,0.16) 0%, transparent 65%)',
        }} />

        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
          <h1 className="h1" style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 58px)',
            color: WHITE, lineHeight: 1.12, letterSpacing: '-0.03em',
            marginBottom: 20,
          }}>
            Stop Guessing.<br />
            Know Exactly What To<br />
            Charge.
          </h1>

          <p className="h2" style={{
            fontFamily: 'Inter, sans-serif', fontSize: 15.5,
            color: 'rgba(255,255,255,0.56)', lineHeight: 1.68,
            maxWidth: 440, margin: '0 auto 36px',
          }}>
            Clarity Costs helps UK freelancers calculate exactly what to charge
            based on live market data. Free to start, results in 3 minutes.
          </p>

          <div className="h3 hero-ctas" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => nav('/start')}>
              Calculate My Rate — It's Free
            </button>
            <a href="#why" className="btn-outline">See How It Works</a>
          </div>
        </div>
      </section>

      {/* ─────────────────────── STATS STRIP (overlaps boundary) ─────────── */}
      <div style={{ background: FEAT_BG }}>
        <div style={{
          maxWidth: 760, margin: '0 auto',
          padding: '0 24px',
          transform: 'translateY(-50px)',
        }}>
          <div
            className="stats-grid"
            style={{
              background: STATS_BG,
              borderRadius: 12,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              boxShadow: '0 10px 48px rgba(0,0,0,0.38)',
              overflow: 'hidden',
            }}
          >
            {STATS.map((s, i) => (
              <div key={s.num} style={{
                padding: '26px 16px', textAlign: 'center',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 800,
                  fontSize: 30, letterSpacing: '-0.02em',
                  color: s.gold ? GOLD : WHITE,
                  marginBottom: 6,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 12,
                  color: 'rgba(255,255,255,0.38)', fontWeight: 400, lineHeight: 1.4,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────────── FEATURES ─────────────────────────────── */}
        <div id="why" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 72px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 800,
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              color: NAVY, letterSpacing: '-0.02em', marginBottom: 10,
            }}>
              Why Use Clarity Costs?
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15,
              color: GOLD, fontWeight: 500,
            }}>
              Stop leaving money on the table. Get the confidence to charge what you're worth.
            </p>
          </div>

          <div
            className="feat-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 18,
            }}
          >
            {FEATURES.map(f => (
              <div key={f.title} className="feat-card" style={{
                background: WHITE,
                borderRadius: 10,
                padding: '26px 22px',
                border: `1px solid ${BORDER}`,
                boxShadow: '0 1px 6px rgba(30,58,95,0.05)',
              }}>
                <div style={{ marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  fontSize: 15, color: TEXT,
                  marginBottom: 8, letterSpacing: '-0.01em',
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13.5,
                  color: MUTED, lineHeight: 1.65,
                }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────── BOTTOM CTA ─────────────────────────────── */}
      <section style={{
        background: NAVY,
        padding: '80px 32px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 800,
          fontSize: 'clamp(22px, 3.5vw, 32px)',
          color: WHITE, letterSpacing: '-0.02em', marginBottom: 14,
        }}>
          Ready to find your true rate?
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 15,
          color: 'rgba(255,255,255,0.52)', lineHeight: 1.65,
          maxWidth: 420, margin: '0 auto 32px',
        }}>
          Join thousands of UK freelancers who have stopped guessing and started earning their worth.
        </p>
        <button className="btn-gold" onClick={() => nav('/start')} style={{ padding: '14px 32px', fontSize: 15 }}>
          Calculate My Rate Now
        </button>
      </section>

      {/* ─────────────────────── FOOTER ──────────────────────────────────── */}
      <footer style={{ background: '#0d1622', padding: '32px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 22, flexWrap: 'wrap', marginBottom: 14 }}>
          {[
            ['/','Home'], ['/how-it-works','How It Works'], ['/pricing','Pricing'],
            ['/about','About'], ['/privacy','Privacy'],
            ['/terms','Terms'], ['/cookie-policy','Cookie Policy'],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="footer-link" style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.15s',
            }}>{label}</Link>
          ))}
        </div>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: 12,
          color: 'rgba(255,255,255,0.18)',
        }}>
          © 2026 Clarity Costs · 5 St Helens Road, Erith, Kent, DA18 4DX · hello@claritycosts.co.uk
        </p>
      </footer>
    </div>
  )
}
