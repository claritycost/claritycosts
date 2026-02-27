import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GR = 'linear-gradient(135deg, #00e87a 0%, #00c46a 100%)'
const GN = '#00e87a'
const GDark = 'rgba(0,232,122,0.1)'
const GBorder = 'rgba(0,232,122,0.2)'
const CARD = 'rgba(8,10,32,0.97)'
const FAINT = 'rgba(255,255,255,0.07)'

export default function CookieBanner() {
  const nav = useNavigate()
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cc_cookie_consent')) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss(choice) {
    localStorage.setItem('cc_cookie_consent', choice)
    setLeaving(true)
    setTimeout(() => setVisible(false), 280)
  }

  if (!visible) return null

  return (
    <>
      <style>{`@keyframes bannerUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }`}</style>
      <div style={{
        position:'fixed', bottom:'16px', left:'50%', transform:'translateX(-50%)',
        zIndex:9999, width:'calc(100% - 28px)', maxWidth:'680px',
        animation: leaving ? 'none' : 'bannerUp 0.32s cubic-bezier(.4,0,.2,1)',
        opacity: leaving ? 0 : 1, transition: leaving ? 'opacity 0.28s' : 'none',
      }}>
        <div style={{
          background:CARD, border:`1px solid ${GBorder}`, borderRadius:'16px', padding:'18px 20px',
          boxShadow:`0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,232,122,0.08)`,
          backdropFilter:'blur(24px)',
          display:'flex', alignItems:'flex-start', gap:'14px', flexWrap:'wrap',
        }}>
          <div style={{ width:'38px', height:'38px', borderRadius:'9px', flexShrink:0, background:GDark, border:`1px solid ${GBorder}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🍪</div>
          <div style={{ flex:1, minWidth:'220px' }}>
            <p style={{ fontFamily:'Outfit', fontWeight:'700', fontSize:'14px', color:'#fff', marginBottom:'4px', letterSpacing:'-0.02em' }}>We use cookies</p>
            <p style={{ fontFamily:'Inter', fontSize:'13px', color:'rgba(255,255,255,0.42)', lineHeight:'1.55', margin:0 }}>
              Essential cookies keep the site working. Optional analytics cookies help us improve it.{' '}
              <a onClick={() => nav('/cookie-policy')} style={{ color:GN, cursor:'pointer', textDecoration:'underline', textDecorationColor:'rgba(0,232,122,0.35)' }}>Cookie Policy</a>
              {' '}·{' '}
              <a onClick={() => nav('/privacy')} style={{ color:GN, cursor:'pointer', textDecoration:'underline', textDecorationColor:'rgba(0,232,122,0.35)' }}>Privacy Policy</a>
            </p>
          </div>
          <div style={{ display:'flex', gap:'8px', alignItems:'center', flexShrink:0 }}>
            <button onClick={() => dismiss('rejected')} style={{
              fontFamily:'Inter', fontSize:'13px', fontWeight:'500',
              background:'none', border:`1px solid ${FAINT}`, borderRadius:'8px',
              padding:'8px 14px', color:'rgba(255,255,255,0.5)', cursor:'pointer', transition:'all 0.15s', whiteSpace:'nowrap',
            }}
              onMouseOver={e => { e.target.style.borderColor='rgba(255,255,255,0.22)'; e.target.style.color='#fff' }}
              onMouseOut={e => { e.target.style.borderColor=FAINT; e.target.style.color='rgba(255,255,255,0.5)' }}
            >Reject optional</button>
            <button onClick={() => dismiss('accepted')} style={{
              fontFamily:'Outfit', fontSize:'13px', fontWeight:'700',
              background:GR, border:'none', borderRadius:'8px',
              padding:'8px 16px', color:'#001a0e', cursor:'pointer', transition:'all 0.15s', whiteSpace:'nowrap',
              boxShadow:`0 4px 14px rgba(0,232,122,0.32)`,
            }}
              onMouseOver={e => { e.target.style.filter='brightness(1.08)'; e.target.style.transform='translateY(-1px)' }}
              onMouseOut={e => { e.target.style.filter='none'; e.target.style.transform='none' }}
            >Accept all</button>
          </div>
        </div>
      </div>
    </>
  )
}
