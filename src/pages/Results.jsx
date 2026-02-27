import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GR = 'linear-gradient(135deg, #00e87a 0%, #00c46a 100%)'
const GT = { background: GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
const GN = '#00e87a'
const GDark = 'rgba(0,232,122,0.1)'
const GBorder = 'rgba(0,232,122,0.18)'
const CARD = 'rgba(8,10,32,0.92)'
const FAINT = 'rgba(255,255,255,0.07)'
const MUTED = 'rgba(255,255,255,0.48)'

function fmt(val) {
  if (!val && val !== 0) return '—'
  const n = typeof val === 'number' ? val : parseInt(String(val).replace(/[^0-9]/g,''), 10)
  return isNaN(n) ? String(val) : '£' + n.toLocaleString('en-GB')
}

function InfoCard({ icon, label, sublabel, accentColor, children }) {
  const border = accentColor ? `rgba(${accentColor},0.2)` : FAINT
  const glow = accentColor ? `rgba(${accentColor},0.06)` : 'transparent'
  return (
    <div style={{ background:CARD, border:`1px solid ${border}`, borderRadius:'18px', overflow:'hidden', marginBottom:'12px', boxShadow:`0 4px 32px rgba(0,0,0,0.28), 0 0 0 1px ${glow}, inset 0 1px 0 rgba(255,255,255,0.04)` }}>
      <div style={{ display:'flex', alignItems:'center', gap:'11px', padding:'16px 20px 14px', borderBottom:`1px solid ${FAINT}` }}>
        <div style={{ width:'36px', height:'36px', borderRadius:'9px', background: accentColor ? `rgba(${accentColor},0.12)` : GDark, border:`1px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>{icon}</div>
        <div>
          <p style={{ fontFamily:'Inter', fontSize:'10px', fontWeight:'600', color:'rgba(255,255,255,0.32)', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 2px' }}>{label}</p>
          {sublabel && <p style={{ fontFamily:'Inter', fontSize:'13px', color:MUTED, margin:0 }}>{sublabel}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Results() {
  const nav = useNavigate()
  const [data, setData] = useState(null)
  const [copied, setCopied] = useState(false)
  const submissionId = sessionStorage.getItem('submissionId')

  useEffect(() => {
    const raw = sessionStorage.getItem('rateCardData')
    if (!raw) { nav('/'); return }
    try { setData(JSON.parse(raw)) } catch { nav('/') }
  }, [])

  if (!data) return (
    <div style={{ background:'#05061a', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ fontFamily:'Inter', fontSize:'16px', color:MUTED }}>Loading…</span>
    </div>
  )

  const share = () => {
    if (!submissionId) { nav('/save?then=share'); return }
    const url = `${window.location.origin}/share/${submissionId}`
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) }).catch(() => window.prompt('Copy link:', url))
  }

  const rates = [
    { label:'Day Rate', val:data.dayRate, range:data.dayRateRange, bar:GN },
    { label:'Project Rate', val:data.projectRate, range:data.projectRateRange, bar:'rgba(0,196,106,0.8)' },
    { label:'Monthly Retainer', val:data.retainerRate, range:data.retainerRateRange, bar:'rgba(0,164,89,0.6)' },
  ]

  return (
    <div style={{ background:'#05061a', minHeight:'100vh', fontFamily:"'Inter', sans-serif", color:'#fff', paddingBottom:'64px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:0.45} 50%{opacity:1} }
        .btn-p:hover { transform:translateY(-2px) !important; filter:brightness(1.08) !important; }
        .btn-g:hover { background:rgba(255,255,255,0.07) !important; border-color:rgba(255,255,255,0.18) !important; }
        .footer-link:hover { color:${GN} !important; }
      `}</style>

      {/* Header */}
      <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(5,6,26,0.92)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${FAINT}`, padding:'0 24px', height:'54px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button onClick={() => nav('/')} style={{ background:'none', border:'none', color:MUTED, fontFamily:'Inter', fontSize:'14px', fontWeight:'500', cursor:'pointer' }}>← Home</button>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={() => nav('/')}>
          <div style={{ width:'26px', height:'26px', borderRadius:'7px', background:GR, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 12px rgba(0,232,122,0.4)` }}>
            <span style={{ fontFamily:'Outfit', fontSize:'10px', fontWeight:'800', color:'#001a0e' }}>CC</span>
          </div>
          <span style={{ fontFamily:'Outfit', fontSize:'14px', fontWeight:'700', color:'rgba(255,255,255,0.65)', letterSpacing:'-0.02em' }}>Clarity Costs</span>
        </div>
        <div style={{ width:'60px' }} />
      </header>

      {/* Hero */}
      <div style={{ padding:'40px 24px 32px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'480px', height:'280px', borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(ellipse, rgba(0,232,122,0.08) 0%, transparent 65%)' }} />
        <div style={{ display:'inline-flex', alignItems:'center', gap:'7px', background:GDark, border:`1px solid ${GBorder}`, borderRadius:'100px', padding:'5px 13px', marginBottom:'16px', animation:'fadeUp 0.4s ease' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:GN, animation:'pulse 2s infinite' }} />
          <span style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.09em', textTransform:'uppercase' }}>Your personalised rate card</span>
        </div>
        <h1 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(26px, 4.5vw, 38px)', letterSpacing:'-0.04em', lineHeight:'1.1', color:'#fff', marginBottom:'8px', animation:'fadeUp 0.4s 0.08s ease both' }}>
          Here's what you should <span style={GT}>be charging</span>
        </h1>
        <p style={{ fontFamily:'Inter', fontSize:'15px', color:MUTED, animation:'fadeUp 0.4s 0.15s ease both' }}>Based on your experience, market, and specialty</p>
      </div>

      <div style={{ maxWidth:'640px', margin:'0 auto', padding:'0 16px' }}>

        {/* Rate card */}
        <div style={{ background:CARD, border:`1px solid ${GBorder}`, borderRadius:'20px', overflow:'hidden', marginBottom:'12px', boxShadow:`0 8px 40px rgba(0,232,122,0.08), 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`, animation:'fadeUp 0.4s 0.2s ease both' }}>
          <div style={{ height:'3px', background:GR }} />
          <div style={{ display:'flex', alignItems:'center', gap:'11px', padding:'18px 20px 14px', borderBottom:`1px solid ${FAINT}` }}>
            <div style={{ width:'36px', height:'36px', borderRadius:'9px', background:GDark, border:`1px solid ${GBorder}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>💰</div>
            <div>
              <p style={{ fontFamily:'Inter', fontSize:'10px', fontWeight:'600', color:'rgba(255,255,255,0.32)', textTransform:'uppercase', letterSpacing:'0.1em', margin:'0 0 2px' }}>Your Rates</p>
              <p style={{ fontFamily:'Inter', fontSize:'13px', color:MUTED, margin:0 }}>Calculated for your market position</p>
            </div>
          </div>
          {rates.map((r,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', borderBottom: i<rates.length-1 ? `1px solid ${FAINT}` : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ width:'3px', height:'26px', borderRadius:'2px', background:r.bar, flexShrink:0 }} />
                <span style={{ fontFamily:'Inter', fontSize:'14px', fontWeight:'500', color:MUTED }}>{r.label}</span>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'24px', letterSpacing:'-0.03em', color:'#fff' }}>{fmt(r.val)}</div>
                {r.range && <div style={{ fontFamily:'Inter', fontSize:'11px', color:'rgba(255,255,255,0.28)', marginTop:'2px' }}>Range: {fmt(r.range.low)} – {fmt(r.range.high)}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Content cards */}
        {data.headline && (
          <div style={{ animation:'fadeUp 0.4s 0.26s ease both' }}>
            <InfoCard icon="🏷️" label="Your Title" sublabel="How to introduce yourself">
              <div style={{ padding:'18px 20px' }}>
                <p style={{ fontFamily:'Outfit', fontWeight:'700', fontSize:'17px', letterSpacing:'-0.025em', color:'#fff', lineHeight:'1.3' }}>{data.headline}</p>
              </div>
            </InfoCard>
          </div>
        )}

        {data.positioningStatement && (
          <div style={{ animation:'fadeUp 0.4s 0.3s ease both' }}>
            <InfoCard icon="🎯" label="Your Positioning" sublabel="How to describe your value" accentColor="0,196,106">
              <div style={{ padding:'18px 20px' }}>
                <p style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, lineHeight:'1.68' }}>{data.positioningStatement}</p>
              </div>
            </InfoCard>
          </div>
        )}

        {data.chargeScript && (
          <div style={{ animation:'fadeUp 0.4s 0.34s ease both' }}>
            <InfoCard icon="💬" label="Charge Script" sublabel='What to say when asked your rate' accentColor="0,232,122">
              <div style={{ padding:'18px 20px' }}>
                <div style={{ background:'rgba(0,232,122,0.06)', border:`1px solid rgba(0,232,122,0.14)`, borderLeft:`3px solid ${GN}`, borderRadius:'0 10px 10px 0', padding:'14px 16px' }}>
                  <p style={{ fontFamily:'Inter', fontSize:'14px', color:'rgba(255,255,255,0.72)', lineHeight:'1.7', fontStyle:'italic', margin:0 }}>"{data.chargeScript}"</p>
                </div>
                <p style={{ fontFamily:'Inter', fontSize:'11px', color:'rgba(255,255,255,0.22)', marginTop:'10px' }}>After saying this — pause. Don't fill the silence.</p>
              </div>
            </InfoCard>
          </div>
        )}

        {data.confidenceTip && (
          <div style={{ animation:'fadeUp 0.4s 0.38s ease both' }}>
            <InfoCard icon="⚡" label="Confidence Tip" sublabel="For your next rate conversation" accentColor="34,197,94">
              <div style={{ padding:'18px 20px' }}>
                <div style={{ background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.16)', borderRadius:'10px', padding:'14px 16px' }}>
                  <p style={{ fontFamily:'Inter', fontSize:'14px', color:MUTED, lineHeight:'1.68', margin:0 }}>{data.confidenceTip}</p>
                </div>
              </div>
            </InfoCard>
          </div>
        )}

        {/* Upgrade */}
        <div style={{ background:'rgba(0,232,122,0.06)', border:`1px solid ${GBorder}`, borderRadius:'18px', padding:'22px', marginBottom:'12px', textAlign:'center', boxShadow:`0 4px 28px rgba(0,232,122,0.08)`, animation:'fadeUp 0.4s 0.42s ease both' }}>
          <div style={{ fontSize:'26px', marginBottom:'10px' }}>📄</div>
          <p style={{ fontFamily:'Outfit', fontWeight:'700', fontSize:'17px', letterSpacing:'-0.025em', color:'#fff', marginBottom:'7px' }}>Want the full report?</p>
          <p style={{ fontFamily:'Inter', fontSize:'13px', color:MUTED, marginBottom:'18px', lineHeight:'1.6' }}>
            7-page PDF with objection scripts, email templates, 10 raise-your-rates strategies, and a 6-month rate roadmap — built for your exact situation.
          </p>
          <button className="btn-p" onClick={() => nav('/upgrade')} style={{ display:'block', width:'100%', padding:'15px', background:GR, color:'#001a0e', border:'none', borderRadius:'12px', fontFamily:'Outfit', fontSize:'15px', fontWeight:'800', letterSpacing:'-0.02em', cursor:'pointer', transition:'all 0.2s', boxShadow:`0 6px 24px rgba(0,232,122,0.35)` }}>
            Get your full report — £9
          </button>
        </div>

        {/* Secondary actions */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px', animation:'fadeUp 0.4s 0.46s ease both' }}>
          <button className="btn-g" onClick={() => nav('/save')} style={{ display:'block', width:'100%', padding:'14px', background:'rgba(255,255,255,0.04)', border:`1px solid ${FAINT}`, borderRadius:'12px', fontFamily:'Inter', fontSize:'14px', fontWeight:'500', color:MUTED, cursor:'pointer', transition:'all 0.2s', boxShadow:`inset 0 1px 0 rgba(255,255,255,0.04)` }}>
            📧 Email me my rate card — free
          </button>
          <button className="btn-g" onClick={share} style={{ display:'block', width:'100%', padding:'14px', background:'rgba(255,255,255,0.04)', border:`1px solid ${FAINT}`, borderRadius:'12px', fontFamily:'Inter', fontSize:'14px', fontWeight:'500', color:MUTED, cursor:'pointer', transition:'all 0.2s', boxShadow:`inset 0 1px 0 rgba(255,255,255,0.04)` }}>
            🔗 Share your rate card
            {copied && <span style={{ display:'inline-block', background:'rgba(0,232,122,0.15)', color:GN, borderRadius:'5px', padding:'2px 8px', fontSize:'11px', fontWeight:'600', marginLeft:'8px' }}>Copied!</span>}
          </button>
        </div>
        {!submissionId && <p style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.2)', textAlign:'center', marginTop:'10px' }}>Save your rate card first to get a share link</p>}

        {/* Footer links */}
        <div style={{ display:'flex', justifyContent:'center', gap:'16px', flexWrap:'wrap', marginTop:'40px', paddingTop:'24px', borderTop:`1px solid ${FAINT}` }}>
          {[['Privacy','/privacy'],['Cookies','/cookie-policy'],['Terms','/terms'],['About','/about']].map(([l,p]) => (
            <span key={p} className="footer-link" onClick={() => nav(p)} style={{ fontFamily:'Inter', fontSize:'12px', color:'rgba(255,255,255,0.28)', cursor:'pointer', transition:'color 0.15s' }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
