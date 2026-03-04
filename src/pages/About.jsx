import { useNavigate } from 'react-router-dom'

const GR = 'linear-gradient(135deg, #00e87a 0%, #00c46a 100%)'
const GT = { background: GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
const GN = '#00e87a'
const GDark = 'rgba(0,232,122,0.1)'
const GBorder = 'rgba(0,232,122,0.18)'
const CARD = 'rgba(8,10,32,0.92)'
const FAINT = 'rgba(255,255,255,0.07)'
const MUTED = 'rgba(255,255,255,0.48)'

const INFO_ROWS = [
  ['Trading name','Clarity Costs'],
  ['Legal entity','Clarity Cost Ltd'],
  ['Company number','[To be confirmed]'],
  ['Registered address','5 St Helens Road, Erith, Kent, DA18 4DX'],
  ['Country of incorporation','England and Wales'],
  
  ['Email','contactus@claritycosts.co.uk'],
  ['Website','claritycosts.co.uk'],
]

export default function About() {
  const nav = useNavigate()
  return (
    <div style={{ background:'#05061a', minHeight:'100vh', fontFamily:"'Inter', sans-serif", color:'#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        .back:hover { color:#fff !important; }
        .fl:hover { color:${GN} !important; }
        .card-link:hover { border-color:${GBorder} !important; background:rgba(0,232,122,0.06) !important; }
      `}</style>

      {/* Nav */}
      <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(5,6,26,0.92)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${FAINT}`, padding:'0 28px', height:'54px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button className="back" onClick={() => nav(-1)} style={{ background:'none', border:'none', color:MUTED, fontFamily:'Inter', fontSize:'14px', fontWeight:'500', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', transition:'color 0.15s' }}>← Back</button>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={() => nav('/')}>
          <div style={{ width:'26px', height:'26px', borderRadius:'7px', background:GR, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 12px rgba(0,232,122,0.4)` }}>
            <span style={{ fontFamily:'Outfit', fontSize:'10px', fontWeight:'800', color:'#001a0e' }}>CC</span>
          </div>
          <span style={{ fontFamily:'Outfit', fontSize:'14px', fontWeight:'700', color:'rgba(255,255,255,0.65)', letterSpacing:'-0.02em' }}>Clarity Costs</span>
        </div>
        <button onClick={() => nav('/')} className="fl" style={{ background:'none', border:`1px solid ${FAINT}`, borderRadius:'7px', padding:'7px 14px', fontFamily:'Inter', fontSize:'13px', fontWeight:'500', color:MUTED, cursor:'pointer', transition:'all 0.15s' }}>Back home</button>
      </header>

      <div style={{ maxWidth:'700px', margin:'0 auto', padding:'52px 24px 96px' }}>

        {/* Hero */}
        <div style={{ marginBottom:'48px', animation:'fadeUp 0.4s ease' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:GDark, border:`1px solid ${GBorder}`, borderRadius:'100px', padding:'4px 13px', marginBottom:'18px' }}>
            <span style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.09em', textTransform:'uppercase' }}>About</span>
          </div>
          <h1 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(28px, 4vw, 40px)', letterSpacing:'-0.04em', lineHeight:'1.1', color:'#fff', marginBottom:'16px' }}>
            Built for freelancers who are<br /><span style={GT}>done undercharging.</span>
          </h1>
          <p style={{ fontFamily:'Inter', fontSize:'15px', color:MUTED, lineHeight:'1.7' }}>
            Clarity Costs started from a simple observation: most UK freelancers pick their rates based on gut feel, a vague sense of what others charge, or — worst of all — what they think a client will accept. The result is chronic undercharging, resentment, and a business that never reaches its potential.
          </p>
        </div>

        {/* Mission */}
        <div style={{ background:CARD, border:`1px solid ${GBorder}`, borderRadius:'18px', padding:'28px', marginBottom:'12px', boxShadow:`0 4px 28px rgba(0,232,122,0.07), inset 0 1px 0 rgba(255,255,255,0.04)`, animation:'fadeUp 0.4s 0.1s ease both' }}>
          <div style={{ fontSize:'24px', marginBottom:'12px' }}>🎯</div>
          <h2 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'17px', letterSpacing:'-0.025em', color:'#fff', marginBottom:'10px' }}>Our mission</h2>
          <p style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, lineHeight:'1.7', margin:0 }}>To give every UK freelancer a clear, defensible, data-backed answer to "What should I charge?" Not a range. A number — and the confidence to say it out loud.</p>
        </div>

        {/* How it works */}
        <div style={{ background:CARD, border:`1px solid ${FAINT}`, borderRadius:'18px', padding:'28px', marginBottom:'12px', boxShadow:`0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`, animation:'fadeUp 0.4s 0.15s ease both' }}>
          <div style={{ fontSize:'24px', marginBottom:'12px' }}>🧠</div>
          <h2 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'17px', letterSpacing:'-0.025em', color:'#fff', marginBottom:'10px' }}>How the calculator works</h2>
          <p style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, lineHeight:'1.7', marginBottom:'10px' }}>
            The calculator uses GPT-4o to analyse your answers across eight dimensions: discipline, experience, location, income target, billable days, client type, and confidence level. It combines this with UK market rate data to produce a personalised day rate, project rate, and retainer rate.
          </p>
          <p style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, lineHeight:'1.7', margin:0 }}>
            The output also includes a positioning statement, a charge script, and a confidence tip tailored to your situation.
          </p>
        </div>

        {/* Company info */}
        <div style={{ background:CARD, border:`1px solid ${FAINT}`, borderRadius:'18px', padding:'28px', marginBottom:'12px', boxShadow:`0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`, animation:'fadeUp 0.4s 0.2s ease both' }}>
          <div style={{ fontSize:'24px', marginBottom:'14px' }}>🏢</div>
          <h2 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'17px', letterSpacing:'-0.025em', color:'#fff', marginBottom:'18px' }}>Company information</h2>
          {INFO_ROWS.map(([label, val], i) => (
            <div key={i} style={{ display:'flex', gap:'14px', padding:'10px 0', borderBottom: i < INFO_ROWS.length-1 ? `1px solid rgba(255,255,255,0.04)` : 'none', alignItems:'flex-start' }}>
              <span style={{ fontFamily:'Inter', fontSize:'12px', fontWeight:'600', color:'rgba(255,255,255,0.3)', minWidth:'150px', flexShrink:0, paddingTop:'1px' }}>{label}</span>
              <span style={{ fontFamily:'Inter', fontSize:'13px', color: val.startsWith('[') ? '#f59e0b' : MUTED, fontStyle: val.startsWith('[') ? 'italic' : 'normal' }}>
                {val === 'hello@claritycosts.co.uk' ? <a href="mailto:hello@claritycosts.co.uk" style={{ color:GN, textDecoration:'none' }}>hello@claritycosts.co.uk</a> : val}
              </span>
            </div>
          ))}
        </div>

        {/* Warning */}
        

        {/* Legal links */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:'9px', animation:'fadeUp 0.4s 0.28s ease both' }}>
          {[['Privacy Policy','/privacy','🔒'],['Cookie Policy','/cookie-policy','🍪'],['Terms & Conditions','/terms','📋']].map(([label,path,icon]) => (
            <div key={path} className="card-link" onClick={() => nav(path)} style={{ background:CARD, border:`1px solid ${FAINT}`, borderRadius:'12px', padding:'16px 18px', cursor:'pointer', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ fontSize:'16px' }}>{icon}</span>
              <span style={{ fontFamily:'Inter', fontSize:'13px', fontWeight:'500', color:MUTED }}>{label}</span>
              <span style={{ marginLeft:'auto', color:'rgba(255,255,255,0.2)', fontSize:'13px' }}>→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${FAINT}`, background:'rgba(3,4,18,0.95)', padding:'22px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
        <span style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.25)' }}>© 2026 Hello Clarity Ltd</span>
        <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
          {[['Privacy Policy','/privacy'],['Cookie Policy','/cookie-policy'],['Terms & Conditions','/terms'],['About','/about']].map(([l,p]) => (
            <a key={p} href={p} className="fl" style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.35)', textDecoration:'none', transition:'color 0.15s' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
