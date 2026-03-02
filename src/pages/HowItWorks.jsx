import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NAVY    = '#1E3A5F'
const NAVY2   = '#162d4a'
const NAVYDARK= '#121E30'
const GOLD    = '#E8A020'
const GOLDHOV = '#d4911a'
const BG      = '#F5F7FA'
const WHITE   = '#ffffff'
const TEXT    = '#1A1A2E'
const MUTED   = '#64748b'
const BORDER  = '#D1D9E0'

function useVisible(ref) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold: 0.1 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return v
}
function Fade({ children, delay = 0 }) {
  const ref = useRef(); const v = useVisible(ref)
  return <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(24px)', transition:`opacity 0.6s ${delay}ms ease,transform 0.6s ${delay}ms ease` }}>{children}</div>
}

function Nav() {
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const h = () => setScrolled(window.scrollY > 10); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h) }, [])
  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(255,255,255,0.97)', borderBottom:`1px solid ${BORDER}`, boxShadow: scrolled?'0 1px 12px rgba(0,0,0,0.06)':'none', transition:'box-shadow 0.25s' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', height:68, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link to="/" style={{ textDecoration:'none' }}>
          <img src="/logo.png" alt="Clarity Costs" style={{ height:52, width:'auto', display:'block' }} />
        </Link>
        <nav style={{ display:'flex', gap:28, alignItems:'center' }}>
          {[{l:'How It Works',t:'/how-it-works'},{l:'Pricing',t:'/pricing'},{l:'About',t:'/about'}].map(({l,t}) =>
            <Link key={l} to={t} style={{ fontFamily:'Inter', fontSize:14, fontWeight: t==='/how-it-works'?700:500, color: t==='/how-it-works'?NAVY:MUTED, textDecoration:'none' }}>{l}</Link>
          )}
          <button onClick={() => nav('/start')} style={{ background:GOLD, color:NAVY, border:'none', borderRadius:8, padding:'10px 20px', fontFamily:'Inter', fontWeight:700, fontSize:14, cursor:'pointer' }}>Get Started Free</button>
        </nav>
      </div>
    </header>
  )
}

const STEPS = [
  {
    num: '01', title: 'Tell us about yourself', color: GOLD,
    desc: 'Answer 7 quick questions about your discipline, experience, location, target income, and client type. No spreadsheets. No guesswork required. Takes under 3 minutes.',
    points: ['Your freelance discipline (design, development, writing, etc.)', 'Years of professional experience', 'Your UK region — rates vary significantly by location', 'Target annual take-home income', 'Preferred client type (startup, enterprise, agency, etc.)'],
  },
  {
    num: '02', title: 'Get your personalised rate card', color: '#3b82f6',
    desc: 'Our engine analyses your inputs against live UK market data to generate your personalised day rate, project rate, and monthly retainer — with market ranges so you know exactly where you sit.',
    points: ['Day rate for ad-hoc and project-based work', 'Project rate for fixed-scope engagements', 'Monthly retainer for ongoing client relationships', 'Your market range (low–high for your discipline and region)', 'A positioning statement and confidence tip'],
  },
  {
    num: '03', title: 'Share, save, or upgrade', color: '#8b5cf6',
    desc: 'Your free rate card lands in your inbox instantly. Use the charge scripts to quote with confidence. Upgrade to the £9 Pro report for strategies, templates, and a 6-month roadmap to keep raising your rates.',
    points: ['Email your rate card to yourself for future reference', 'Share your rate link with accountability partners', 'Use charge scripts word-for-word in client conversations', 'Upgrade to Pro for the full report and raise-your-rates strategies'],
  },
]

const FEATURES = [
  { icon:'📊', title:'Real UK market data', desc:'Rates are benchmarked against actual UK freelance market data across disciplines, regions, and experience levels.' },
  { icon:'⚡', title:'Instant results', desc:'No waiting, no manual calculations. Your personalised rate card is generated and emailed within seconds.' },
  { icon:'🇬🇧', title:'Built for UK freelancers', desc:'Every calculation is calibrated for the UK market — including regional cost-of-living differences and UK tax considerations.' },
  { icon:'🔒', title:'GDPR compliant', desc:'Your data is stored securely and never sold. UK-based and fully compliant with GDPR data protection laws.' },
  { icon:'💬', title:'Charge scripts included', desc:'We don\'t just give you a number — we give you the exact words to say when a client asks what you charge.' },
  { icon:'📈', title:'Upgrade when you\'re ready', desc:'The free tier is genuinely free forever. Upgrade to Pro for £9 when you\'re ready to go deeper on raising your rates.' },
]

function Footer() {
  return (
    <footer style={{ background:NAVYDARK, color:'rgba(255,255,255,0.55)', padding:'64px 24px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:40, marginBottom:48 }}>
          <div>
            <div style={{ fontFamily:'Poppins,Inter', fontWeight:800, fontSize:18, color:WHITE, marginBottom:12 }}>Clarity <span style={{ color:GOLD }}>Costs</span></div>
            <p style={{ fontFamily:'Inter', fontSize:14, lineHeight:1.7, marginBottom:16 }}>The UK's freelance pricing calculator. Know what to charge. Charge it confidently.</p>
            <div style={{ fontFamily:'Inter', fontSize:13, lineHeight:1.9 }}>
              <div>5 St Helens Road, Erith, Kent, DA18 4DX</div>
              <a href="mailto:hello@claritycosts.co.uk" style={{ color:GOLD, textDecoration:'none' }}>hello@claritycosts.co.uk</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:'Inter', fontWeight:700, fontSize:12, color:WHITE, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:16 }}>Product</div>
            {[{l:'How It Works',t:'/how-it-works'},{l:'Pricing',t:'/pricing'},{l:'Calculate My Rate',t:'/start'}].map(({l,t}) => <Link key={l} to={t} style={{ display:'block', fontFamily:'Inter', fontSize:14, color:'rgba(255,255,255,0.55)', textDecoration:'none', marginBottom:10 }}>{l}</Link>)}
          </div>
          <div>
            <div style={{ fontFamily:'Inter', fontWeight:700, fontSize:12, color:WHITE, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:16 }}>Company</div>
            {[{l:'About',t:'/about'},{l:'Contact',t:'/contact'}].map(({l,t}) => <Link key={l} to={t} style={{ display:'block', fontFamily:'Inter', fontSize:14, color:'rgba(255,255,255,0.55)', textDecoration:'none', marginBottom:10 }}>{l}</Link>)}
          </div>
          <div>
            <div style={{ fontFamily:'Inter', fontWeight:700, fontSize:12, color:WHITE, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:16 }}>Legal</div>
            {[{l:'Privacy Policy',t:'/privacy'},{l:'Terms & Conditions',t:'/terms'},{l:'Cookie Policy',t:'/cookie-policy'}].map(({l,t}) => <Link key={l} to={t} style={{ display:'block', fontFamily:'Inter', fontSize:14, color:'rgba(255,255,255,0.55)', textDecoration:'none', marginBottom:10 }}>{l}</Link>)}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:24, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontFamily:'Inter', fontSize:13 }}>© 2026 Clarity Costs. All rights reserved. UK-registered company.</span>
          <div style={{ display:'flex', gap:16 }}>{['GDPR Compliant','UK Business','SSL Secured'].map(t=><span key={t} style={{ fontFamily:'Inter', fontSize:12, color:'rgba(255,255,255,0.3)' }}>{t}</span>)}</div>
        </div>
      </div>
    </footer>
  )
}

export default function HowItWorks() {
  const nav = useNavigate()
  return (
    <div style={{ background:BG, minHeight:'100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@700;800&display=swap');*{box-sizing:border-box}`}</style>
      <Nav />

      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg,${NAVY} 0%,${NAVY2} 100%)`, padding:'140px 24px 96px', textAlign:'center' }}>
        <Fade>
          <div style={{ display:'inline-block', background:'rgba(232,160,32,0.15)', border:'1px solid rgba(232,160,32,0.3)', borderRadius:20, padding:'6px 16px', fontFamily:'Inter', fontSize:13, fontWeight:600, color:GOLD, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:24 }}>How It Works</div>
          <h1 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(32px,5vw,52px)', color:WHITE, letterSpacing:'-0.02em', lineHeight:1.15, marginBottom:20 }}>
            From blank page to<br/><span style={{ color:GOLD }}>confident quote in 3 minutes.</span>
          </h1>
          <p style={{ fontFamily:'Inter', fontSize:18, color:'rgba(255,255,255,0.65)', maxWidth:560, margin:'0 auto 36px' }}>
            No spreadsheets. No guesswork. Just your personalised rate card, calculated from real UK market data.
          </p>
          <button onClick={() => nav('/start')} style={{ background:GOLD, color:NAVY, border:'none', borderRadius:10, padding:'16px 36px', fontFamily:'Inter', fontWeight:700, fontSize:17, cursor:'pointer', boxShadow:'0 4px 24px rgba(232,160,32,0.4)' }}>
            Calculate My Rate — It's Free
          </button>
        </Fade>
      </section>

      {/* Steps */}
      <section style={{ padding:'96px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          {STEPS.map((s, i) => (
            <Fade key={s.num} delay={i * 80}>
              <div style={{
                display:'grid', gridTemplateColumns:'auto 1fr',
                gap:40, marginBottom: i < STEPS.length-1 ? 80 : 0,
                alignItems:'start',
              }}>
                {/* Number */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{ width:72, height:72, borderRadius:20, background:`${s.color}20`, border:`2px solid ${s.color}40`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'Poppins,Inter', fontWeight:800, fontSize:28, color:s.color }}>{s.num}</span>
                  </div>
                  {i < STEPS.length-1 && (
                    <div style={{ width:2, height:60, background:`linear-gradient(to bottom,${s.color}40,transparent)`, marginTop:12 }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ paddingTop:12 }}>
                  <h2 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(22px,3vw,30px)', color:NAVY, letterSpacing:'-0.02em', marginBottom:12 }}>{s.title}</h2>
                  <p style={{ fontFamily:'Inter', fontSize:16, color:MUTED, lineHeight:1.7, marginBottom:20, maxWidth:600 }}>{s.desc}</p>
                  <div style={{ background:WHITE, borderRadius:12, border:`1px solid ${BORDER}`, padding:'20px 24px' }}>
                    {s.points.map(p => (
                      <div key={p} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:10 }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background:s.color, marginTop:7, flexShrink:0 }} />
                        <span style={{ fontFamily:'Inter', fontSize:14, color:TEXT, lineHeight:1.6 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ background:WHITE, padding:'96px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <Fade>
            <h2 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(26px,3.5vw,38px)', color:NAVY, letterSpacing:'-0.02em', textAlign:'center', marginBottom:12 }}>Why freelancers trust Clarity Costs</h2>
            <p style={{ fontFamily:'Inter', fontSize:17, color:MUTED, textAlign:'center', marginBottom:64, maxWidth:560, margin:'0 auto 64px' }}>Built specifically for UK freelancers who are tired of guessing.</p>
          </Fade>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
            {FEATURES.map((f, i) => (
              <Fade key={f.title} delay={i * 60}>
                <div style={{ background:BG, borderRadius:12, border:`1px solid ${BORDER}`, padding:28 }}>
                  <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
                  <h3 style={{ fontFamily:'Inter', fontWeight:700, fontSize:17, color:NAVY, marginBottom:8 }}>{f.title}</h3>
                  <p style={{ fontFamily:'Inter', fontSize:14, color:MUTED, lineHeight:1.7, margin:0 }}>{f.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section style={{ padding:'96px 24px', background:BG }}>
        <Fade>
          <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
            <h2 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(24px,3.5vw,36px)', color:NAVY, letterSpacing:'-0.02em', marginBottom:16 }}>Still have questions?</h2>
            <p style={{ fontFamily:'Inter', fontSize:16, color:MUTED, lineHeight:1.7, marginBottom:32 }}>
              Check our <Link to="/pricing" style={{ color:NAVY, fontWeight:600 }}>pricing page</Link> for a full FAQ, or email us directly at{' '}
              <a href="mailto:hello@claritycosts.co.uk" style={{ color:NAVY, fontWeight:600 }}>hello@claritycosts.co.uk</a>. We reply within one business day.
            </p>
          </div>
        </Fade>
      </section>

      {/* CTA */}
      <section style={{ padding:'96px 24px', background:`linear-gradient(135deg,${NAVY} 0%,${NAVY2} 100%)`, textAlign:'center' }}>
        <Fade>
          <h2 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:WHITE, letterSpacing:'-0.02em', marginBottom:16 }}>Stop undercharging. Start today.</h2>
          <p style={{ fontFamily:'Inter', fontSize:18, color:'rgba(255,255,255,0.65)', marginBottom:36 }}>Free, takes 3 minutes, results in your inbox instantly.</p>
          <button onClick={() => nav('/start')} style={{ background:GOLD, color:NAVY, border:'none', borderRadius:10, padding:'18px 40px', fontFamily:'Inter', fontWeight:700, fontSize:18, cursor:'pointer', boxShadow:'0 4px 24px rgba(232,160,32,0.4)' }}>
            Calculate My Rate — It's Free
          </button>
          <div style={{ marginTop:16 }}>
            <span style={{ fontFamily:'Inter', fontSize:13, color:'rgba(255,255,255,0.4)' }}>No credit card · No signup required · Results in 3 minutes</span>
          </div>
        </Fade>
      </section>

      <Footer />
    </div>
  )
}
