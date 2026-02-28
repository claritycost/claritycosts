import { useNavigate } from 'react-router-dom'

const GR = 'linear-gradient(135deg, #00e87a 0%, #00c46a 100%)'
const GN = '#00e87a'
const GDark = 'rgba(0,232,122,0.1)'
const GBorder = 'rgba(0,232,122,0.18)'
const FAINT = 'rgba(255,255,255,0.07)'
const MUTED = 'rgba(255,255,255,0.48)'

export const sharedCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  h2 { font-family:'Outfit'; font-size:18px; font-weight:800; color:#fff; letter-spacing:-0.03em; margin:32px 0 10px; }
  h3 { font-family:'Outfit'; font-size:15px; font-weight:700; color:rgba(255,255,255,0.82); letter-spacing:-0.02em; margin:22px 0 8px; }
  p  { font-family:'Inter'; font-size:14px; color:rgba(255,255,255,0.52); line-height:1.75; margin-bottom:12px; }
  ul, ol { padding-left:18px; margin-bottom:12px; }
  li { font-family:'Inter'; font-size:14px; color:rgba(255,255,255,0.52); line-height:1.75; margin-bottom:5px; }
  a  { color:${GN}; text-decoration:underline; text-underline-offset:3px; text-decoration-color:rgba(0,232,122,0.35); }
  a:hover { color:#fff; }
  strong { color:rgba(255,255,255,0.78); font-weight:600; }
  table { width:100%; border-collapse:collapse; margin:18px 0 22px; font-size:13px; }
  th { text-align:left; padding:10px 13px; background:rgba(0,232,122,0.08); border:1px solid rgba(0,232,122,0.15); color:rgba(255,255,255,0.7); font-family:'Outfit'; font-weight:700; letter-spacing:-0.01em; }
  td { padding:10px 13px; border:1px solid rgba(255,255,255,0.06); color:rgba(255,255,255,0.48); vertical-align:top; line-height:1.6; }
  tr:nth-child(even) td { background:rgba(255,255,255,0.02); }
  .back:hover { color:#fff !important; }
  .fl:hover { color:${GN} !important; }
`

const NAV_LINKS = [['Privacy Policy','/privacy'],['Cookie Policy','/cookie-policy'],['Terms & Conditions','/terms'],['About','/about']]

export default function PolicyLayout({ title, lastUpdated, children }) {
  const nav = useNavigate()
  return (
    <div style={{ background:'#05061a', minHeight:'100vh', fontFamily:"'Inter', sans-serif", color:'#fff' }}>
      <style>{sharedCSS}</style>

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

      {/* Content */}
      <div style={{ maxWidth:'700px', margin:'0 auto', padding:'52px 24px 96px' }}>
        <div style={{ marginBottom:'44px', paddingBottom:'28px', borderBottom:`1px solid ${FAINT}` }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:GDark, border:`1px solid ${GBorder}`, borderRadius:'100px', padding:'4px 13px', marginBottom:'18px' }}>
            <span style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.09em', textTransform:'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(26px, 4vw, 38px)', letterSpacing:'-0.04em', lineHeight:'1.1', color:'#fff', marginBottom:'10px' }}>{title}</h1>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.28)', marginBottom:0 }}>Last updated: {lastUpdated}</p>
        </div>
        {children}
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${FAINT}`, background:'rgba(3,4,18,0.95)', padding:'22px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
        <span style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.25)' }}>© 2026 Hello Clarity Ltd</span>
        <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
          {NAV_LINKS.map(([l,p]) => (
            <a key={p} href={p} className="fl" style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.35)', textDecoration:'none', transition:'color 0.15s' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
