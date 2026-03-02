import { useState, useRef, useEffect } from 'react'
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
  return <div ref={ref} style={{ opacity: v?1:0, transform: v?'none':'translateY(20px)', transition:`opacity 0.55s ${delay}ms ease,transform 0.55s ${delay}ms ease` }}>{children}</div>
}

function Nav() {
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const h = () => setScrolled(window.scrollY > 10); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h) }, [])
  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(255,255,255,0.97)', borderBottom:`1px solid ${BORDER}`, boxShadow: scrolled?'0 1px 12px rgba(0,0,0,0.06)':'none', transition:'box-shadow 0.25s' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', height:68, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link to="/" style={{ textDecoration:'none' }}>
          <img src="/logo.png" alt="Clarity Costs" style={{ height:34, width:'auto', display:'block' }} />
        </Link>
        <nav style={{ display:'flex', gap:28, alignItems:'center' }}>
          {[{l:'How It Works',t:'/how-it-works'},{l:'Pricing',t:'/pricing'},{l:'About',t:'/about'}].map(({l,t}) =>
            <Link key={l} to={t} style={{ fontFamily:'Inter', fontSize:14, fontWeight: t==='/pricing'?700:500, color: t==='/pricing'?NAVY:MUTED, textDecoration:'none' }}>{l}</Link>
          )}
          <button onClick={() => nav('/start')} style={{ background:GOLD, color:NAVY, border:'none', borderRadius:8, padding:'10px 20px', fontFamily:'Inter', fontWeight:700, fontSize:14, cursor:'pointer' }}>Get Started Free</button>
        </nav>
      </div>
    </header>
  )
}

function Check({ gold }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0, marginTop:2 }}>
      <circle cx="9" cy="9" r="9" fill={gold?GOLD:NAVY} fillOpacity="0.12"/>
      <path d="M5.5 9l2.5 2.5 4.5-5" stroke={gold?GOLD:NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const FREE_FEATS = ['Instant day rate calculation','Project rate & monthly retainer','UK market benchmarks','Personalised positioning statement','Charge scripts & objection handling','Results emailed to you']
const PRO_FEATS  = ['Everything in Free, plus:','10 raise-your-rates strategies','4 copy-paste email templates','6-month personalised roadmap','Downloadable PDF report','Priority email support']

const TABLE = [
  ['Day rate, project rate & retainer',true,true],
  ['UK market benchmarks',true,true],
  ['Personalised positioning statement',true,true],
  ['Charge scripts & objection handling',true,true],
  ['Results emailed to you',true,true],
  ['10 raise-your-rates strategies',false,true],
  ['4 ready-to-send email templates',false,true],
  ['6-month rate roadmap',false,true],
  ['Downloadable PDF report',false,true],
  ['Priority email support',false,true],
]

const FAQS = [
  { q:'Is the free plan really free forever?', a:'Yes. The free tier gives you your full rate card instantly — day rate, project rate, retainer, positioning statement, and charge scripts — emailed to you at no cost, with no credit card required and no time limit.' },
  { q:'What exactly do I get with the £9 Pro report?', a:"The Pro report is a one-off £9 purchase — not a subscription. You receive a professionally designed PDF with 10 raise-your-rates strategies tailored to your situation, 4 copy-paste email templates for quoting and follow-ups, and a personalised 6-month roadmap." },
  { q:'Can I pay and download immediately?', a:'Yes. After completing the free questionnaire, you can upgrade instantly via Stripe. Your PDF report is emailed within minutes of payment confirmation.' },
  { q:'What payment methods do you accept?', a:'We accept all major credit and debit cards (Visa, Mastercard, Amex) processed securely by Stripe. Apple Pay and Google Pay are available on supported devices.' },
  { q:'Is my data secure and GDPR compliant?', a:'Yes. Clarity Costs is UK-based and fully GDPR compliant. Your data is never sold to third parties. To request data deletion, email privacy@claritycosts.co.uk.' },
  { q:'Do you offer refunds on the Pro report?', a:"If you're not satisfied, email hello@claritycosts.co.uk within 7 days of purchase for a full refund — no questions asked." },
  { q:'What currencies does Clarity Costs support?', a:'Clarity Costs is focused on UK freelancers and all rates are in GBP. International currency support is on our roadmap.' },
  { q:'Do you offer discounts for teams or agencies?', a:"We're working on team plans. Email hello@claritycosts.co.uk and we'll discuss options for your team." },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom:`1px solid ${BORDER}` }}>
      <button onClick={() => setOpen(o=>!o)} style={{ width:'100%', background:'none', border:'none', padding:'20px 0', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, cursor:'pointer', fontFamily:'Inter', fontSize:16, fontWeight:600, color:TEXT, textAlign:'left' }}>
        <span>{q}</span>
        <span style={{ width:28, height:28, borderRadius:'50%', background:open?NAVY:BG, border:`1px solid ${open?NAVY:BORDER}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s', color:open?WHITE:MUTED, fontSize:20, lineHeight:'28px' }}>{open?'−':'+'}</span>
      </button>
      <div style={{ maxHeight:open?400:0, overflow:'hidden', transition:'max-height 0.3s ease' }}>
        <p style={{ fontFamily:'Inter', fontSize:15, color:MUTED, lineHeight:1.7, paddingBottom:20 }}>{a}</p>
      </div>
    </div>
  )
}

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

export default function Pricing() {
  const nav = useNavigate()
  return (
    <div style={{ background:BG, minHeight:'100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@700;800&display=swap');*{box-sizing:border-box}`}</style>
      <Nav />

      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg,${NAVY} 0%,${NAVY2} 100%)`, padding:'140px 24px 80px', textAlign:'center' }}>
        <Fade>
          <div style={{ display:'inline-block', background:'rgba(232,160,32,0.15)', border:'1px solid rgba(232,160,32,0.3)', borderRadius:20, padding:'6px 16px', fontFamily:'Inter', fontSize:13, fontWeight:600, color:GOLD, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:24 }}>Simple, Transparent Pricing</div>
          <h1 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(32px,5vw,52px)', color:WHITE, letterSpacing:'-0.02em', lineHeight:1.15, marginBottom:20 }}>Start free.<br/><span style={{ color:GOLD }}>Upgrade only when you need more.</span></h1>
          <p style={{ fontFamily:'Inter', fontSize:18, color:'rgba(255,255,255,0.65)', maxWidth:520, margin:'0 auto' }}>Free is genuinely free — not a trial. Your full rate card, delivered instantly, no card needed.</p>
        </Fade>
      </section>

      {/* Cards */}
      <section style={{ padding:'0 24px', marginTop:-60 }}>
        <div style={{ maxWidth:880, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
          {/* Free card */}
          <Fade>
            <div style={{ background:WHITE, borderRadius:16, border:`1px solid ${BORDER}`, boxShadow:'0 4px 24px rgba(0,0,0,0.06)', padding:36, display:'flex', flexDirection:'column', height:'100%' }}>
              <div style={{ marginBottom:28 }}>
                <div style={{ fontFamily:'Inter', fontWeight:700, fontSize:12, color:MUTED, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:12 }}>Free Tier</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:8 }}>
                  <span style={{ fontFamily:'Poppins,Inter', fontWeight:800, fontSize:48, color:NAVY }}>£0</span>
                  <span style={{ fontFamily:'Inter', fontSize:15, color:MUTED }}> / forever</span>
                </div>
                <p style={{ fontFamily:'Inter', fontSize:14, color:MUTED, lineHeight:1.6 }}>Your full rate card, calculated and emailed instantly. No card, no catch.</p>
              </div>
              <div style={{ flex:1, marginBottom:28 }}>
                {FREE_FEATS.map(f => (
                  <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:14 }}>
                    <Check /><span style={{ fontFamily:'Inter', fontSize:14, color:TEXT, lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => nav('/start')} style={{ width:'100%', minHeight:52, background:'none', border:`2px solid ${NAVY}`, borderRadius:10, fontFamily:'Inter', fontWeight:700, fontSize:16, color:NAVY, cursor:'pointer', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.background=NAVY;e.currentTarget.style.color=WHITE}}
                onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=NAVY}}>
                Get Started Free — No Card Needed
              </button>
            </div>
          </Fade>

          {/* Pro card */}
          <Fade delay={100}>
            <div style={{ background:NAVY, borderRadius:16, border:`2px solid ${GOLD}`, boxShadow:'0 8px 40px rgba(30,58,95,0.3)', padding:36, display:'flex', flexDirection:'column', height:'100%', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:20, right:20, background:GOLD, color:NAVY, borderRadius:20, padding:'4px 12px', fontFamily:'Inter', fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' }}>Most Popular</div>
              <div style={{ marginBottom:28 }}>
                <div style={{ fontFamily:'Inter', fontWeight:700, fontSize:12, color:'rgba(232,160,32,0.8)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:12 }}>Pro Report</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:8 }}>
                  <span style={{ fontFamily:'Poppins,Inter', fontWeight:800, fontSize:48, color:WHITE }}>£9</span>
                  <span style={{ fontFamily:'Inter', fontSize:15, color:'rgba(255,255,255,0.5)' }}> / one-off</span>
                </div>
                <p style={{ fontFamily:'Inter', fontSize:14, color:'rgba(255,255,255,0.6)', lineHeight:1.6 }}>A professionally designed PDF report. Paid once, yours forever.</p>
              </div>
              <div style={{ flex:1, marginBottom:28 }}>
                {PRO_FEATS.map((f,i) => (
                  <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:14 }}>
                    <Check gold /><span style={{ fontFamily:'Inter', fontSize:14, lineHeight:1.5, color: i===0?'rgba(255,255,255,0.45)':WHITE, fontStyle: i===0?'italic':'normal' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => nav('/start')} style={{ width:'100%', minHeight:52, background:GOLD, border:'none', borderRadius:10, fontFamily:'Inter', fontWeight:700, fontSize:16, color:NAVY, cursor:'pointer', boxShadow:'0 4px 20px rgba(232,160,32,0.4)', transition:'background 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.background=GOLDHOV}
                onMouseLeave={e=>e.currentTarget.style.background=GOLD}>
                Get the Full Report — £9
              </button>
              <p style={{ fontFamily:'Inter', fontSize:12, color:'rgba(255,255,255,0.35)', textAlign:'center', marginTop:12 }}>Complete the free questionnaire first, then upgrade</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ padding:'40px 24px 0' }}>
        <Fade>
          <div style={{ maxWidth:880, margin:'0 auto', background:WHITE, borderRadius:12, border:`1px solid ${BORDER}`, padding:'18px 32px', display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'12px 36px' }}>
            {['🔒 SSL secured checkout','🇬🇧 UK-based & GDPR compliant','✓ 7-day money-back on Pro','💳 Powered by Stripe','📧 PDF delivered instantly to your inbox'].map(t => (
              <span key={t} style={{ fontFamily:'Inter', fontSize:13, color:MUTED, fontWeight:500 }}>{t}</span>
            ))}
          </div>
        </Fade>
      </section>

      {/* Comparison table */}
      <section style={{ padding:'96px 24px' }}>
        <div style={{ maxWidth:880, margin:'0 auto' }}>
          <Fade>
            <h2 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(26px,3.5vw,36px)', color:NAVY, letterSpacing:'-0.02em', textAlign:'center', marginBottom:48 }}>What's included in each plan</h2>
          </Fade>
          <div style={{ background:WHITE, borderRadius:16, border:`1px solid ${BORDER}`, overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 110px 110px', background:NAVY }}>
              <div style={{ padding:'16px 24px', fontFamily:'Inter', fontWeight:700, fontSize:12, color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.06em' }}>Feature</div>
              <div style={{ padding:'16px 24px', fontFamily:'Inter', fontWeight:700, fontSize:12, color:'rgba(255,255,255,0.5)', textAlign:'center' }}>Free</div>
              <div style={{ padding:'16px 24px', fontFamily:'Inter', fontWeight:700, fontSize:12, color:GOLD, textAlign:'center' }}>Pro £9</div>
            </div>
            {TABLE.map(([label,free,pro],i) => (
              <div key={label} style={{ display:'grid', gridTemplateColumns:'1fr 110px 110px', borderTop:`1px solid ${BORDER}`, background: i%2===0?WHITE:BG }}>
                <div style={{ padding:'14px 24px', fontFamily:'Inter', fontSize:14, color:TEXT }}>{label}</div>
                <div style={{ padding:'14px 24px', display:'flex', justifyContent:'center', alignItems:'center', fontSize:18 }}>{free?<span style={{ color:'#16a34a' }}>✓</span>:<span style={{ color:BORDER }}>—</span>}</div>
                <div style={{ padding:'14px 24px', display:'flex', justifyContent:'center', alignItems:'center', fontSize:18, fontWeight:700 }}>{pro?<span style={{ color:GOLD }}>✓</span>:<span style={{ color:BORDER }}>—</span>}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background:WHITE, padding:'96px 24px' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <Fade>
            <h2 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(26px,3.5vw,36px)', color:NAVY, letterSpacing:'-0.02em', textAlign:'center', marginBottom:12 }}>Frequently asked questions</h2>
            <p style={{ fontFamily:'Inter', fontSize:16, color:MUTED, textAlign:'center', marginBottom:48 }}>Still unsure? Email <a href="mailto:hello@claritycosts.co.uk" style={{ color:NAVY, fontWeight:600 }}>hello@claritycosts.co.uk</a></p>
          </Fade>
          {FAQS.map((f,i) => <Fade key={f.q} delay={i*30}><FAQItem q={f.q} a={f.a} /></Fade>)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'96px 24px', background:`linear-gradient(135deg,${NAVY} 0%,${NAVY2} 100%)`, textAlign:'center' }}>
        <Fade>
          <h2 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:WHITE, letterSpacing:'-0.02em', marginBottom:16 }}>Ready to know what you're worth?</h2>
          <p style={{ fontFamily:'Inter', fontSize:18, color:'rgba(255,255,255,0.65)', marginBottom:36 }}>Takes 3 minutes. Free to start. No card required.</p>
          <button onClick={() => nav('/start')} style={{ background:GOLD, color:NAVY, border:'none', borderRadius:10, padding:'18px 40px', fontFamily:'Inter', fontWeight:700, fontSize:18, cursor:'pointer', boxShadow:'0 4px 24px rgba(232,160,32,0.4)' }}>
            Calculate My Rate — It's Free
          </button>
        </Fade>
      </section>

      <Footer />
    </div>
  )
}
