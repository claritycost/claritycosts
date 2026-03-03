import { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQS = [
  { q:'Is this really free?', a:'Yes. Your day rate, positioning statement, charge script, and income projections are completely free. The optional £9 PDF report has additional tools — but the core result costs nothing.' },
  { q:'How accurate is the rate?', a:'Very. GPT-4o cross-references current UK freelance market data with your specialty, region, experience, and income target. The more honestly you answer, the more precise your result.' },
  { q:'What do you do with my data?', a:'We use your email to send your results. We never sell your data. Anonymised responses help improve the model over time. See our Privacy Policy for full details.' },
  { q:'Can I recalculate?', a:"Yes — just start again any time. We'd recommend revisiting every 6–12 months or before a major rate negotiation." },
  { q:"What's in the £9 Full Toolkit?", a:'A 7-page PDF report, 5 objection-handling scripts, 3 email templates, a Raise Your Rates Guide with 10 personalised strategies, and a 6-month roadmap.' },
]

export default function HowItWorks() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-tag">How it works</div>
          <h1>From "I'm not sure" to<br /><span className="green">"My rate is £X."</span></h1>
          <p>Three steps. Eight questions. Under three minutes.</p>
        </div>
      </div>

      <div className="section">
        <div style={{maxWidth:760,margin:'0 auto'}}>
          {[
            {num:'01',title:'Tell us about your work',body:"8 quick questions: specialty, experience, UK location, work type, target income, days per week, and client type. Takes about 90 seconds.",tag:'⚡ About 90 seconds'},
            {num:'02',title:'We calculate your number',body:'GPT-4o analyses current UK market rates for your discipline and region, then factors in your experience, income target, and typical UK freelance overheads and tax.',tag:'🧠 Powered by GPT-4o + UK market data'},
            {num:'03',title:'You charge with clarity',body:'Your day rate, market range, income projections, project and retainer estimates, a positioning statement, and a charge script — ready to say out loud.',tag:'📊 Delivered to your inbox instantly'},
          ].map((s,i) => (
            <div key={s.num} style={{display:'grid',gridTemplateColumns:'60px 1fr',gap:28,paddingBottom:i<2?56:0}}>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{width:52,height:52,borderRadius:'50%',background:'rgba(0,232,122,.1)',border:'2px solid rgba(0,232,122,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',fontWeight:800,color:'var(--green)',flexShrink:0}}>{s.num}</div>
                {i<2 && <div style={{width:2,flex:1,background:'rgba(0,232,122,.12)',marginTop:10}} />}
              </div>
              <div style={{paddingTop:12}}>
                <h3 style={{fontSize:'1.2rem',fontWeight:800,color:'var(--white)',marginBottom:10}}>{s.title}</h3>
                <p style={{fontSize:14.5,color:'var(--muted)',lineHeight:1.75,marginBottom:16}}>{s.body}</p>
                <span className="badge badge-green">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{paddingTop:0}}>
        <div className="section-tag">What you get</div>
        <h2>Six outputs. <span className="green">Zero fluff.</span></h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:40}}>
          {[
            {icon:'💷',title:'Day Rate',body:'A specific number based on your market, experience, and income target.'},
            {icon:'📁',title:'Project & Retainer',body:'Fixed-price and monthly retainer rates calibrated to your work type.'},
            {icon:'📈',title:'Income Projections',body:'Monthly and annual take-home estimates based on your available days.'},
            {icon:'💬',title:'Positioning Statement',body:'Two sentences describing exactly what you do and who you serve.'},
            {icon:'📝',title:'Charge Script',body:'A natural, confident answer to "what do you charge?" — ready to say.'},
            {icon:'📧',title:'Email Delivery',body:'Everything sent to your inbox so you always have it to hand.'},
          ].map(c => (
            <div key={c.title} className="card">
              <span style={{fontSize:'1.5rem',display:'block',marginBottom:14}}>{c.icon}</span>
              <h3>{c.title}</h3><p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{paddingTop:0}}>
        <div className="section-tag">FAQ</div>
        <h2>Questions we get <span className="green">asked</span></h2>
        <div style={{marginTop:40,borderTop:'1px solid var(--border)'}}>
          {FAQS.map((f,i) => (
            <div key={i} style={{borderBottom:'1px solid var(--border)'}}>
              <button onClick={() => setOpen(o => o===i ? null : i)} style={{width:'100%',background:'none',border:'none',padding:'20px 0',textAlign:'left',fontFamily:'inherit',fontSize:15,fontWeight:700,color:open===i?'var(--green)':'var(--white)',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
                {f.q}
                <span style={{fontSize:'1.2rem',color:'var(--muted)',flexShrink:0,display:'inline-block',transition:'transform .25s',transform:open===i?'rotate(45deg)':'none'}}>+</span>
              </button>
              {open===i && <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.75,paddingBottom:20}}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'var(--card)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'72px 40px',textAlign:'center'}}>
        <div className="page-tag">Ready?</div>
        <h2 style={{fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:800,color:'var(--white)',margin:'12px 0 14px'}}>Know your number.</h2>
        <p style={{fontSize:15,color:'var(--muted)',marginBottom:32}}>3 minutes. No card. Your personalised rate waiting at the end.</p>
        <Link to="/start" className="btn-green">Calculate my rate — Free →</Link>
      </div>
    </>
  )
}
