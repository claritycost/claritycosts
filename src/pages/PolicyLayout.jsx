import { useNavigate, Link } from 'react-router-dom'

const NAVY    = '#1E3A5F'
const NAVY2   = '#162d4a'
const NAVYDARK= '#121E30'
const GOLD    = '#E8A020'
const BG      = '#F5F7FA'
const WHITE   = '#ffffff'
const TEXT    = '#1A1A2E'
const MUTED   = '#64748b'
const BORDER  = '#D1D9E0'

export const sharedCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  h2 { font-family:'Poppins',Inter,sans-serif; font-size:20px; font-weight:800; color:${NAVY}; letter-spacing:-0.02em; margin:36px 0 12px; }
  h3 { font-family:'Inter'; font-size:16px; font-weight:700; color:${NAVY}; margin:24px 0 8px; }
  p  { font-family:'Inter'; font-size:15px; color:${MUTED}; line-height:1.75; margin-bottom:14px; }
  ul, ol { padding-left:20px; margin-bottom:14px; }
  li { font-family:'Inter'; font-size:15px; color:${MUTED}; line-height:1.75; margin-bottom:6px; }
  a  { color:${NAVY}; font-weight:600; text-decoration:underline; text-underline-offset:3px; }
  a:hover { color:${GOLD}; }
  strong { color:${TEXT}; font-weight:600; }
  table { width:100%; border-collapse:collapse; margin-bottom:20px; }
  th { background:${BG}; border:1px solid ${BORDER}; padding:10px 14px; font-family:'Inter'; font-size:13px; font-weight:700; color:${NAVY}; text-align:left; }
  td { border:1px solid ${BORDER}; padding:10px 14px; font-family:'Inter'; font-size:14px; color:${MUTED}; }
`

export default function PolicyLayout({ title, badge, updated, children }) {
  const nav = useNavigate()
  return (
    <div style={{ background:BG, minHeight:'100vh' }}>
      <style>{sharedCSS}</style>

      {/* Sticky nav */}
      <header style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,0.97)', borderBottom:`1px solid ${BORDER}`, boxShadow:'0 1px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <button onClick={() => nav(-1)} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:`1px solid ${BORDER}`, borderRadius:8, padding:'8px 14px', fontFamily:'Inter', fontSize:13, fontWeight:600, color:NAVY, cursor:'pointer' }}>
            ← Back
          </button>
          <Link to="/" style={{ textDecoration:'none' }}>
            <img src="/logo.png" alt="Clarity Costs" style={{ height:32, width:'auto', display:'block' }} />
          </Link>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:6, fontFamily:'Inter', fontSize:13, fontWeight:600, color:NAVY, textDecoration:'none', border:`1px solid ${BORDER}`, borderRadius:8, padding:'8px 14px' }}>
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg,${NAVY} 0%,${NAVY2} 100%)`, padding:'64px 24px', textAlign:'center' }}>
        <div style={{ display:'inline-block', background:'rgba(232,160,32,0.15)', border:'1px solid rgba(232,160,32,0.3)', borderRadius:20, padding:'5px 14px', fontFamily:'Inter', fontSize:12, fontWeight:600, color:GOLD, letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:16 }}>{badge || 'Legal'}</div>
        <h1 style={{ fontFamily:'Poppins,Inter,sans-serif', fontWeight:800, fontSize:'clamp(26px,4vw,42px)', color:WHITE, letterSpacing:'-0.02em', marginBottom:12 }}>{title}</h1>
        {updated && <p style={{ fontFamily:'Inter', fontSize:14, color:'rgba(255,255,255,0.5)', margin:0 }}>Last updated: {updated}</p>}
      </section>

      {/* Content */}
      <div style={{ maxWidth:760, margin:'0 auto', padding:'64px 24px 96px' }}>
        <div style={{ background:WHITE, borderRadius:16, border:`1px solid ${BORDER}`, boxShadow:'0 4px 24px rgba(0,0,0,0.05)', padding:'48px 48px' }}>
          {children}
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ background:NAVYDARK, padding:'32px 24px', textAlign:'center' }}>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px 24px', marginBottom:12 }}>
          {[{l:'Privacy Policy',t:'/privacy'},{l:'Terms & Conditions',t:'/terms'},{l:'Cookie Policy',t:'/cookie-policy'},{l:'Contact',t:'/contact'}].map(({l,t}) => (
            <Link key={l} to={t} style={{ fontFamily:'Inter', fontSize:13, color:'rgba(255,255,255,0.45)', textDecoration:'none' }}>{l}</Link>
          ))}
        </div>
        <p style={{ fontFamily:'Inter', fontSize:12, color:'rgba(255,255,255,0.25)', margin:0 }}>
          © 2026 Clarity Costs · Hello Clarity Ltd · 5 St Helens Road, Erith, Kent, DA18 4DX
        </p>
      </div>
    </div>
  )
}
