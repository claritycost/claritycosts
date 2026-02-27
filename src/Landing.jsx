import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Design tokens ─────────────────────────────────────────────
const GR  = 'linear-gradient(135deg, #00e87a 0%, #00c46a 100%)'
const GT  = { background: GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
const BG  = '#05061a'
const CARD = 'rgba(8,10,32,0.92)'
const GN   = '#00e87a'
const GDark = 'rgba(0,232,122,0.12)'
const GBorder = 'rgba(0,232,122,0.18)'
const MUTED = 'rgba(255,255,255,0.48)'
const FAINT = 'rgba(255,255,255,0.07)'
// ───────────────────────────────────────────────────────────────

function useVisible(ref, threshold = 0.12) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return v
}

function Fade({ children, delay = 0, y = 18 }) {
  const ref = useRef()
  const v = useVisible(ref)
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : `translateY(${y}px)`, transition: `opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms` }}>
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

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#fff', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .cta:hover { transform:translateY(-2px) !important; filter:brightness(1.08) !important; }
        .card:hover { border-color:${GBorder} !important; transform:translateY(-3px) !important; }
        .nav-link:hover { color:#fff !important; }
        .footer-link:hover { color:${GN} !important; }
        a { text-decoration:none; }
        ::selection { background: rgba(0,232,122,0.2); }
      `}</style>

      {/* ─ NAV ─ */}
      <nav style={{
        position:'fixed', top:0, inset:'0 0 auto', zIndex:200,
        height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 36px',
        background:'rgba(5,6,26,0.82)', backdropFilter:'blur(20px)',
        borderBottom:`1px solid ${FAINT}`,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'9px', cursor:'pointer' }} onClick={() => nav('/')}>
          <div style={{ width:'30px', height:'30px', borderRadius:'8px', background:GR, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 16px rgba(0,232,122,0.45)` }}>
            <span style={{ fontFamily:'Outfit', fontSize:'11px', fontWeight:'800', color:'#001a0e' }}>CC</span>
          </div>
          <span style={{ fontFamily:'Outfit', fontSize:'15px', fontWeight:'700', color:'#fff', letterSpacing:'-0.02em' }}>Clarity Costs</span>
        </div>
        <div style={{ display:'flex', gap:'32px' }}>
          {['How it works','For who','Pricing'].map(l => (
            <a key={l} className="nav-link" href="#" style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, fontWeight:'500', transition:'color 0.15s' }}>{l}</a>
          ))}
        </div>
        <button className="cta" onClick={() => nav('/start')} style={{
          fontFamily:'Outfit', fontWeight:'700', fontSize:'14px', letterSpacing:'-0.01em',
          background:GR, color:'#001a0e', border:'none', borderRadius:'8px', padding:'9px 20px',
          cursor:'pointer', transition:'all 0.2s', boxShadow:`0 4px 18px rgba(0,232,122,0.35)`,
        }}>Get my rate →</button>
      </nav>

      {/* ─ HERO ─ */}
      <section ref={heroRef} style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'90px 24px 72px', position:'relative', overflow:'hidden' }}>
        {/* Orb */}
        <div style={{
          position:'absolute', width:'700px', height:'700px', borderRadius:'50%', pointerEvents:'none',
          background:`radial-gradient(circle, rgba(0,232,122,0.1) 0%, rgba(0,196,106,0.05) 40%, transparent 68%)`,
          left:`calc(${mouse.x * 100}% - 350px)`, top:`calc(${mouse.y * 100}% - 350px)`,
          transition:'left 1.4s cubic-bezier(.23,1,.32,1), top 1.4s cubic-bezier(.23,1,.32,1)',
        }} />
        {/* Dot grid */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:`radial-gradient(rgba(0,232,122,0.06) 1px, transparent 1px)`, backgroundSize:'36px 36px' }} />

        <div style={{ textAlign:'center', maxWidth:'760px', width:'100%', position:'relative', zIndex:1 }}>
          {/* Badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:GDark, border:`1px solid ${GBorder}`, borderRadius:'100px', padding:'5px 14px', marginBottom:'32px', animation:'float 5s ease infinite' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:GN, animation:'blink 2s infinite', boxShadow:`0 0 6px ${GN}` }} />
            <span style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.09em' }}>FREE · UK FREELANCERS · POWERED BY GPT-4o</span>
          </div>

          <h1 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(38px, 6vw, 56px)', letterSpacing:'-0.04em', lineHeight:'1.08', color:'#fff', marginBottom:'20px' }}>
            Stop guessing.<br />
            <span style={GT}>Start charging.</span>
          </h1>

          <p style={{ fontFamily:'Inter', fontSize:'clamp(15px, 1.6vw, 17px)', color:MUTED, lineHeight:'1.7', maxWidth:'500px', margin:'0 auto 40px' }}>
            The rate calculator built for UK freelancers who are done undercharging. Get your personalised day rate, project rate, and a script to say it out loud — in 3 minutes.
          </p>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', marginBottom:'60px' }}>
            <button className="cta" onClick={() => nav('/start')} style={{
              fontFamily:'Outfit', fontWeight:'800', fontSize:'16px', letterSpacing:'-0.02em',
              background:GR, color:'#001a0e', border:'none', borderRadius:'12px', padding:'16px 48px',
              cursor:'pointer', transition:'all 0.22s', boxShadow:`0 6px 28px rgba(0,232,122,0.38)`,
            }}>Calculate my rate — free →</button>
            <span style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.05em' }}>3 minutes · No card · No signup</span>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', border:`1px solid ${FAINT}`, borderRadius:'16px', overflow:'hidden', background:'rgba(255,255,255,0.02)' }}>
            {[['£650','Avg day rate discovered'],['3 min','Average completion'],['100%','Free to use']].map(([v,l],i) => (
              <div key={i} style={{ padding:'22px 16px', textAlign:'center', borderRight: i<2 ? `1px solid ${FAINT}` : 'none' }}>
                <div style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'28px', letterSpacing:'-0.03em', ...GT, marginBottom:'5px' }}>{v}</div>
                <div style={{ fontFamily:'Inter', fontSize:'12px', color:MUTED }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ PAIN ─ */}
      <section style={{ padding:'96px 24px', position:'relative' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, ${GN}, transparent)` }} />
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <Fade style={{ textAlign:'center', marginBottom:'52px' }}>
            <p style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'14px' }}>Sound familiar?</p>
            <h2 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(26px, 3.5vw, 38px)', letterSpacing:'-0.04em', lineHeight:'1.12' }}>
              Undercharging isn't a pricing problem.<br />
              <span style={GT}>It's a clarity problem.</span>
            </h2>
          </Fade>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:'14px' }}>
            {[
              { e:'🎲', t:'You guess your rate', d:'You pick a number that "feels right" — then spend the next week wondering if you left money on the table.' },
              { e:'📉', t:'You undercharge to win', d:"You drop your price before they even push back. Now you're resentful halfway through the project." },
              { e:'😶', t:'You freeze when asked', d:'"What do you charge?" lands like a punch. You mumble something vague and lose the room.' },
            ].map((c,i) => (
              <Fade key={i} delay={i*100}>
                <div className="card" style={{ background:CARD, border:`1px solid rgba(255,255,255,0.07)`, borderRadius:'18px', padding:'28px', transition:'all 0.25s', boxShadow:`0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`, height:'100%' }}>
                  <div style={{ width:'46px', height:'46px', borderRadius:'12px', background:GDark, border:`1px solid ${GBorder}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', marginBottom:'18px', boxShadow:`0 4px 14px rgba(0,232,122,0.1)` }}>{c.e}</div>
                  <h3 style={{ fontFamily:'Outfit', fontWeight:'700', fontSize:'17px', letterSpacing:'-0.02em', color:'#fff', marginBottom:'9px' }}>{c.t}</h3>
                  <p style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, lineHeight:'1.65' }}>{c.d}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ─ HOW IT WORKS ─ */}
      <section style={{ padding:'96px 24px', background:`rgba(3,4,18,0.8)`, position:'relative' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:`linear-gradient(90deg, transparent, rgba(0,232,122,0.3), transparent)` }} />
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <Fade style={{ textAlign:'center', marginBottom:'52px' }}>
            <p style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'14px' }}>How it works</p>
            <h2 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(26px, 3.5vw, 38px)', letterSpacing:'-0.04em', lineHeight:'1.12' }}>
              From "I'm not sure" to<br /><span style={GT}>"My rate is £X."</span>
            </h2>
          </Fade>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'14px' }}>
            {[
              { n:'01', e:'⚡', t:'Tell us about your work', d:'Specialty, experience, location, and the kind of clients you want. 8 quick questions.' },
              { n:'02', e:'🧠', t:'We calculate your number', d:'GPT-4o analyses UK market rates, your overheads, tax, and target income to give you a real figure.' },
              { n:'03', e:'🎯', t:'You charge with clarity', d:'Your personalised rate card, positioning statement, and a script for the "what do you charge?" moment.' },
            ].map((s,i) => (
              <Fade key={i} delay={i*100}>
                <div className="card" style={{ background:CARD, border:`1px solid rgba(255,255,255,0.07)`, borderRadius:'18px', padding:'32px', position:'relative', overflow:'hidden', transition:'all 0.25s', boxShadow:`0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`, height:'100%' }}>
                  <div style={{ position:'absolute', top:'16px', right:'20px', fontFamily:'Outfit', fontSize:'52px', fontWeight:'800', color:`rgba(0,232,122,0.06)`, lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontSize:'26px', marginBottom:'16px' }}>{s.e}</div>
                  <h3 style={{ fontFamily:'Outfit', fontWeight:'700', fontSize:'18px', letterSpacing:'-0.025em', color:'#fff', marginBottom:'10px' }}>{s.t}</h3>
                  <p style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, lineHeight:'1.65' }}>{s.d}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ─ WHAT YOU GET ─ */}
      <section style={{ padding:'96px 24px' }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <Fade style={{ textAlign:'center', marginBottom:'52px' }}>
            <p style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'14px' }}>What you get</p>
            <h2 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(26px, 3.5vw, 38px)', letterSpacing:'-0.04em', lineHeight:'1.12' }}>
              Not just a number.<br /><span style={GT}>A complete rate toolkit.</span>
            </h2>
          </Fade>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:'12px' }}>
            {[
              { e:'💰', t:'Your Day Rate', d:'A specific number based on your market, experience, and income target — not a guess.', free:true },
              { e:'📁', t:'Project & Retainer Rates', d:'Fixed-price and monthly retainer rates calibrated to your specialty and client type.', free:true },
              { e:'🎯', t:'Positioning Statement', d:'Two sentences describing exactly what you do and who you serve. Confident and specific.', free:true },
              { e:'💬', t:'Charge Script', d:'A natural script you can say when a client asks "what do you charge?" Written in your voice.', free:true },
              { e:'📄', t:'Full PDF Report', d:'7-page PDF with your rate card, objection scripts, email templates, and 6-month roadmap.', free:false },
              { e:'📈', t:'Raise Your Rates Guide', d:'10 personalised strategies to raise your rates — built for your exact discipline and market.', free:false },
            ].map((item,i) => (
              <Fade key={i} delay={i*50}>
                <div className="card" style={{
                  background:CARD, border:`1px solid ${item.free ? 'rgba(255,255,255,0.07)' : GBorder}`,
                  borderRadius:'16px', padding:'22px', position:'relative', transition:'all 0.25s', height:'100%',
                  boxShadow: item.free ? `0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)` : `0 4px 28px rgba(0,232,122,0.08), inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}>
                  <div style={{ position:'absolute', top:'12px', right:'12px', background: item.free ? 'rgba(255,255,255,0.05)' : GDark, border:`1px solid ${item.free ? 'rgba(255,255,255,0.1)' : GBorder}`, borderRadius:'5px', padding:'2px 8px', fontFamily:'Inter', fontSize:'10px', fontWeight:'600', color: item.free ? 'rgba(255,255,255,0.35)' : GN, letterSpacing:'0.06em' }}>{item.free ? 'FREE' : '£9'}</div>
                  <div style={{ fontSize:'22px', marginBottom:'12px' }}>{item.e}</div>
                  <h3 style={{ fontFamily:'Outfit', fontWeight:'700', fontSize:'15px', letterSpacing:'-0.02em', color:'#fff', marginBottom:'7px' }}>{item.t}</h3>
                  <p style={{ fontFamily:'Inter', fontSize:'13px', color:MUTED, lineHeight:'1.6' }}>{item.d}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ─ TRUST ─ */}
      <section style={{ padding:'48px 24px', background:`rgba(3,4,18,0.8)`, borderTop:`1px solid ${FAINT}`, borderBottom:`1px solid ${FAINT}` }}>
        <Fade>
          <div style={{ maxWidth:'900px', margin:'0 auto', display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'24px 44px' }}>
            {[['🇬🇧','Built for UK freelancers'],['🧠','Powered by GPT-4o'],['🔒','No card required'],['⚡','3 minutes to complete'],['✉️','Results sent to your inbox']].map(([ic,t],i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'9px' }}>
                <span style={{ fontSize:'16px' }}>{ic}</span>
                <span style={{ fontFamily:'Inter', fontSize:'13px', fontWeight:'500', color:MUTED }}>{t}</span>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ─ FINAL CTA ─ */}
      <section style={{ padding:'112px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'600px', height:'600px', borderRadius:'50%', pointerEvents:'none', background:`radial-gradient(circle, rgba(0,232,122,0.09) 0%, transparent 65%)` }} />
        <Fade>
          <div style={{ textAlign:'center', maxWidth:'560px', margin:'0 auto', position:'relative' }}>
            <p style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'22px' }}>Ready?</p>
            <h2 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(34px, 5vw, 52px)', letterSpacing:'-0.04em', lineHeight:'1.08', color:'#fff', marginBottom:'8px' }}>Your rate is waiting.</h2>
            <p style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(28px, 4vw, 40px)', letterSpacing:'-0.04em', lineHeight:'1.1', ...GT, marginBottom:'36px' }}>Go find it.</p>
            <p style={{ fontFamily:'Inter', fontSize:'15px', color:MUTED, marginBottom:'36px' }}>3 minutes. No fluff. Just your number.</p>
            <button className="cta" onClick={() => nav('/start')} style={{
              fontFamily:'Outfit', fontWeight:'800', fontSize:'16px', letterSpacing:'-0.02em',
              background:GR, color:'#001a0e', border:'none', borderRadius:'12px', padding:'16px 52px',
              cursor:'pointer', transition:'all 0.22s', boxShadow:`0 8px 36px rgba(0,232,122,0.4)`,
            }}>Start now — it's free →</button>
          </div>
        </Fade>
      </section>

      {/* ─ FOOTER ─ */}
      <footer style={{ borderTop:`1px solid ${FAINT}`, background:'rgba(3,4,18,0.95)', padding:'28px 36px' }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'14px', marginBottom:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
              <div style={{ width:'24px', height:'24px', borderRadius:'6px', background:GR, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 10px rgba(0,232,122,0.35)` }}>
                <span style={{ fontFamily:'Outfit', fontSize:'9px', fontWeight:'800', color:'#001a0e' }}>CC</span>
              </div>
              <span style={{ fontFamily:'Outfit', fontWeight:'700', fontSize:'14px', color:'#fff', letterSpacing:'-0.02em' }}>Clarity Costs</span>
              <span style={{ fontFamily:'Inter', fontSize:'13px', color:'rgba(255,255,255,0.3)', marginLeft:'6px' }}>Built for UK freelancers who are done undercharging.</span>
            </div>
            <a href="mailto:hello@claritycosts.co.uk" style={{ fontFamily:'Inter', fontSize:'13px', color:GN, fontWeight:'500' }}>hello@claritycosts.co.uk</a>
          </div>
          <div style={{ height:'1px', background:'rgba(255,255,255,0.05)', marginBottom:'18px' }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
            <span style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.25)' }}>© 2026 Hello Clarity Ltd · Registered in England and Wales</span>
            <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
              {[['Privacy Policy','/privacy'],['Cookie Policy','/cookie-policy'],['Terms & Conditions','/terms'],['About','/about']].map(([label,path]) => (
                <span key={path} className="footer-link" onClick={() => nav(path)} style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.35)', cursor:'pointer', transition:'color 0.15s' }}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
