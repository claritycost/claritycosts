import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GR = 'linear-gradient(135deg, #00e87a 0%, #00c46a 100%)'
const GT = { background: GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
const BG = '#05061a'
const CARD = 'rgba(8,10,32,0.92)'
const GN = '#00e87a'
const GDark = 'rgba(0,232,122,0.1)'
const GBorder = 'rgba(0,232,122,0.2)'
const FAINT = 'rgba(255,255,255,0.07)'

const QUESTIONS = [
  { id:'discipline', step:1, q:'What kind of freelance work do you do?', hint:'Pick the one that best describes your main service.', type:'choice',
    opts:[['Design & Creative','🎨'],['Development & Tech','💻'],['Writing & Content','✍️'],['Marketing & Strategy','📈'],['Consulting & Advisory','🧠'],['Video & Photography','🎬'],['Other','✦']] },
  { id:'experience', step:2, q:'How many years of experience do you have?', hint:'Count all professional experience, not just freelance.', type:'choice',
    opts:[['Under 2 years','🌱'],['2–5 years','📗'],['5–10 years','📘'],['10+ years','🏆']] },
  { id:'location', step:3, q:'Where are you based?', hint:'Rates vary significantly by region.', type:'choice',
    opts:[['London','🏙️'],['South East England','🏘️'],['Midlands','🌆'],['North of England','🌉'],['Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿'],['Wales','🏴󠁧󠁢󠁷󠁬󠁳󠁿'],['Northern Ireland','🍀'],['Remote-first / anywhere','🌍']] },
  { id:'target_income', step:4, q:'What do you want to take home per year?', hint:'After-tax income — what lands in your bank account.', type:'choice',
    opts:[['Under £30k',''],['£30k–£40k',''],['£40k–£55k',''],['£55k–£75k',''],['£75k–£100k',''],['Over £100k','']] },
  { id:'billable_days', step:5, q:'How many days per week do you plan to work for clients?', hint:'The rest goes on admin, sales, and having a life.', type:'choice',
    opts:[['1–2 days/week','🌤️'],['3 days/week','🌥️'],['4 days/week','⛅'],['5 days/week','☁️']] },
  { id:'client_type', step:6, q:'Who do you mostly want to work with?', hint:'Different clients expect very different rates.', type:'choice',
    opts:[['Early-stage startups','🚀'],['Funded scale-ups','📊'],['SMEs & small businesses','🏪'],['Large corporates & enterprise','🏢'],['Agencies & studios','✦'],['Non-profits & public sector','🌿'],['Mix of the above','🎯']] },
  { id:'confidence', step:7, q:'How do you currently feel about your rate?', hint:'Be honest — this is just for calibration.', type:'choice',
    opts:[["I know I'm undercharging",'😬'],["I think I'm about right",'🤔'],["I have no idea where I sit",'😶'],["I might be overpriced",'😅']] },
  { id:'email', step:8, q:'Where should we send your rate card?', hint:"We'll email your personalised results. No spam — ever.", type:'email' },
]

export default function Start() {
  const nav = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [fading, setFading] = useState(false)

  const q = QUESTIONS[step]
  const progress = (step / QUESTIONS.length) * 100
  const useGrid = q.type === 'choice' && q.opts && q.opts.length > 4

  function next(val) {
    if (fading) return
    setAnswers(p => ({ ...p, [q.id]: val }))
    if (step < QUESTIONS.length - 1) { setFading(true); setTimeout(() => { setStep(s => s + 1); setFading(false) }, 180) }
  }

  function back() {
    if (step === 0 || fading) return
    setFading(true); setTimeout(() => { setStep(s => s - 1); setFading(false) }, 180)
  }

  function submit() {
    const v = email.trim()
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setErr('Please enter a valid email address.'); return }
    const final = { ...answers, email: v }
    sessionStorage.setItem('cc_answers', JSON.stringify(final))
    sessionStorage.setItem('userEmail', v)
    nav('/calculating')
  }

  return (
    <div style={{ background:BG, minHeight:'100vh', color:'#fff', display:'flex', flexDirection:'column', fontFamily:"'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .opt:hover { border-color:rgba(0,232,122,0.45) !important; background:rgba(0,232,122,0.08) !important; transform:translateY(-1px); }
        .back:hover { color:#fff !important; }
        input:focus { outline:none; border-color:rgba(0,232,122,0.45) !important; box-shadow:0 0 0 3px rgba(0,232,122,0.1) !important; }
        input::placeholder { color:rgba(255,255,255,0.2); }
        .sub:hover { transform:translateY(-2px) !important; filter:brightness(1.08) !important; }
        .dot-bg { background-image:radial-gradient(rgba(0,232,122,0.05) 1px, transparent 1px); background-size:36px 36px; }
      `}</style>

      {/* NAV */}
      <header style={{ position:'fixed', top:0, inset:'0 0 auto', zIndex:100, height:'54px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', background:'rgba(5,6,26,0.88)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${FAINT}` }}>
        <button className="back" onClick={step===0 ? () => nav('/') : back} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', fontFamily:'Inter', fontSize:'14px', fontWeight:'500', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', transition:'color 0.15s' }}>
          ← {step===0 ? 'Home' : 'Back'}
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={() => nav('/')}>
          <div style={{ width:'26px', height:'26px', borderRadius:'7px', background:GR, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 12px rgba(0,232,122,0.4)` }}>
            <span style={{ fontFamily:'Outfit', fontSize:'10px', fontWeight:'800', color:'#001a0e' }}>CC</span>
          </div>
          <span style={{ fontFamily:'Outfit', fontSize:'14px', fontWeight:'700', color:'rgba(255,255,255,0.6)', letterSpacing:'-0.02em' }}>Clarity Costs</span>
        </div>
        <span style={{ fontFamily:'Inter', fontSize:'13px', color:'rgba(255,255,255,0.3)', minWidth:'48px', textAlign:'right' }}>
          {step+1}<span style={{ color:'rgba(255,255,255,0.15)' }}> / {QUESTIONS.length}</span>
        </span>
      </header>

      {/* PROGRESS */}
      <div style={{ position:'fixed', top:'54px', left:0, right:0, zIndex:99, height:'2px', background:'rgba(255,255,255,0.05)' }}>
        <div style={{ height:'100%', background:GR, width:`${progress}%`, transition:'width 0.4s ease', boxShadow:`0 0 8px rgba(0,232,122,0.6)` }} />
      </div>

      {/* CONTENT */}
      <div className="dot-bg" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'82px 24px 48px', minHeight:'100vh' }}>
        <div style={{ maxWidth: useGrid ? '700px' : '540px', width:'100%', opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'none', transition:'opacity 0.18s, transform 0.18s', animation:'fadeUp 0.32s ease' }}>

          {/* Step pill */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:GDark, border:`1px solid ${GBorder}`, borderRadius:'100px', padding:'4px 13px', marginBottom:'20px' }}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:GN }} />
            <span style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.1em', textTransform:'uppercase' }}>Question {q.step} of {QUESTIONS.length}</span>
          </div>

          <h1 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(22px, 3.5vw, 32px)', letterSpacing:'-0.035em', lineHeight:'1.15', color:'#fff', marginBottom:'8px' }}>{q.q}</h1>
          {q.hint && <p style={{ fontFamily:'Inter', fontSize:'14px', color:'rgba(255,255,255,0.4)', marginBottom:'28px', lineHeight:'1.5' }}>{q.hint}</p>}

          {/* CHOICE */}
          {q.type === 'choice' && (
            <div style={{ display:'grid', gridTemplateColumns: useGrid ? 'repeat(auto-fill,minmax(200px,1fr))' : '1fr', gap:'8px' }}>
              {q.opts.map(([label, emoji]) => {
                const sel = answers[q.id] === label
                return (
                  <button key={label} className="opt" onClick={() => next(label)} style={{
                    background: sel ? 'rgba(0,232,122,0.12)' : CARD,
                    border: sel ? `1px solid rgba(0,232,122,0.45)` : `1px solid ${FAINT}`,
                    borderRadius:'13px', padding:'14px 17px',
                    display:'flex', alignItems:'center', gap:'11px',
                    color:'#fff', fontFamily:'Inter', fontSize:'14px', fontWeight:'500',
                    textAlign:'left', width:'100%', cursor:'pointer', transition:'all 0.15s',
                    boxShadow: sel ? `0 4px 18px rgba(0,232,122,0.15), inset 0 1px 0 rgba(255,255,255,0.05)` : `inset 0 1px 0 rgba(255,255,255,0.03)`,
                  }}>
                    {emoji ? <span style={{ fontSize:'17px', flexShrink:0, width:'21px' }}>{emoji}</span> : null}
                    <span style={{ flex:1 }}>{label}</span>
                    {sel && <div style={{ width:'18px', height:'18px', borderRadius:'50%', flexShrink:0, background:GR, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:'800', color:'#001a0e' }}>✓</div>}
                  </button>
                )
              })}
            </div>
          )}

          {/* EMAIL */}
          {q.type === 'email' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); setErr('') }} onKeyDown={e => e.key==='Enter' && submit()} autoFocus
                style={{ background:CARD, border: err ? '1px solid rgba(239,68,68,0.4)' : `1px solid ${FAINT}`, borderRadius:'13px', padding:'16px 18px', color:'#fff', fontFamily:'Inter', fontSize:'15px', width:'100%', transition:'all 0.2s', boxShadow:`inset 0 1px 0 rgba(255,255,255,0.04)` }}
              />
              {err && <p style={{ fontFamily:'Inter', fontSize:'13px', color:'#f87171' }}>{err}</p>}
              <button className="sub" onClick={submit} style={{ background:GR, color:'#001a0e', border:'none', borderRadius:'13px', padding:'16px', fontFamily:'Outfit', fontSize:'16px', fontWeight:'800', letterSpacing:'-0.02em', cursor:'pointer', transition:'all 0.2s', boxShadow:`0 6px 28px rgba(0,232,122,0.38)` }}>
                Calculate my rate →
              </button>
              <p style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.25)', textAlign:'center', marginTop:'2px' }}>🔒 No spam. Unsubscribe any time.</p>
            </div>
          )}
        </div>
      </div>

      {/* TRUST */}
      <div style={{ padding:'13px 24px', borderTop:`1px solid ${FAINT}`, display:'flex', justifyContent:'center', gap:'24px', flexWrap:'wrap', background:'rgba(3,4,18,0.6)' }}>
        {['Free to use','Built for UK freelancers','Powered by GPT-4o'].map((t,i) => (
          <span key={i} style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.2)', fontWeight:'500' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}
