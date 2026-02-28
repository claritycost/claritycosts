import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GR = 'linear-gradient(135deg, #00e87a 0%, #00c46a 100%)'
const GN = '#00e87a'
const GDark = 'rgba(0,232,122,0.1)'
const GBorder = 'rgba(0,232,122,0.2)'
const CARD = 'rgba(8,10,32,0.92)'
const FAINT = 'rgba(255,255,255,0.07)'

const STEPS = [
  'Analysing your discipline and experience…',
  'Checking UK market rates for your region…',
  'Factoring in tax, overheads, and target income…',
  'Calibrating for your client type…',
  'Building your personalised rate card…',
]

export default function Calculating() {
  const nav = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState('')
  const [apiDone, setApiDone] = useState(false)
  const [animDone, setAnimDone] = useState(false)

  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex(s => s + 1), 1400)
      return () => clearTimeout(t)
    } else setAnimDone(true)
  }, [stepIndex])

  useEffect(() => { callApi() }, [])
  useEffect(() => { if (animDone && apiDone) nav('/results') }, [animDone, apiDone])

  const callApi = async () => {
    try {
      const raw = sessionStorage.getItem('cc_answers')
      if (!raw) { setError('Your answers were not saved. Please go back and try again.'); return }
      const res = await fetch('/api/generate-rates', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ answers: JSON.parse(raw) }) })
      if (!res.ok) { const j = await res.json().catch(() => ({})); throw new Error(j.error || `Server error ${res.status}`) }
      const data = await res.json()
      sessionStorage.setItem('rateCardData', JSON.stringify(data))
      sessionStorage.setItem('userAnswers', raw)
      const a = JSON.parse(raw)
      if (a.email) sessionStorage.setItem('userEmail', a.email)
      setApiDone(true)
    } catch (err) { setError(err.message || 'Something went wrong. Please try again.') }
  }

  const state = i => i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'pending'

  return (
    <div style={{ background:'#05061a', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px', fontFamily:"'Inter', sans-serif", color:'#fff', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spinR { to { transform: rotate(-360deg); } }
        @keyframes pulse { 0%,100%{opacity:0.45} 50%{opacity:1} }
        @keyframes stepIn { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:none} }
      `}</style>

      {/* BG glows */}
      <div style={{ position:'absolute', top:'25%', left:'20%', width:'420px', height:'420px', borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(circle, rgba(0,232,122,0.07) 0%, transparent 65%)', animation:'pulse 6s ease infinite' }} />
      <div style={{ position:'absolute', bottom:'20%', right:'15%', width:'300px', height:'300px', borderRadius:'50%', pointerEvents:'none', background:'radial-gradient(circle, rgba(0,196,106,0.05) 0%, transparent 65%)', animation:'pulse 9s ease infinite 3s' }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(rgba(0,232,122,0.05) 1px, transparent 1px)', backgroundSize:'36px 36px' }} />

      <div style={{ maxWidth:'420px', width:'100%', textAlign:'center', position:'relative', zIndex:1 }}>

        {/* Spinner */}
        <div style={{ width:'68px', height:'68px', margin:'0 auto 36px', position:'relative' }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.04)', borderTop:`2px solid ${GN}`, animation:'spin 1.1s linear infinite' }} />
          <div style={{ position:'absolute', inset:'10px', borderRadius:'50%', border:'2px solid rgba(255,255,255,0.03)', borderBottom:`2px solid rgba(0,196,106,0.6)`, animation:'spinR 1.7s linear infinite' }} />
          <div style={{ position:'absolute', inset:'22px', borderRadius:'50%', background:GR, opacity:0.9, animation:'pulse 2s ease infinite', boxShadow:`0 0 12px rgba(0,232,122,0.5)` }} />
        </div>

        {/* Badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:GDark, border:`1px solid ${GBorder}`, borderRadius:'100px', padding:'5px 14px', marginBottom:'16px' }}>
          <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:GN, animation:'pulse 1.5s infinite' }} />
          <span style={{ fontFamily:'Inter', fontSize:'11px', fontWeight:'600', color:GN, letterSpacing:'0.09em', textTransform:'uppercase' }}>AI Processing</span>
        </div>

        <h1 style={{ fontFamily:'Outfit', fontWeight:'800', fontSize:'clamp(24px, 4vw, 32px)', letterSpacing:'-0.035em', lineHeight:'1.15', color:'#fff', marginBottom:'32px' }}>
          Calculating your{' '}
          <span style={{ background:GR, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>rate card…</span>
        </h1>

        {/* Steps card */}
        <div style={{ background:CARD, border:`1px solid ${FAINT}`, borderRadius:'18px', padding:'8px', boxShadow:`0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,232,122,0.05), inset 0 1px 0 rgba(255,255,255,0.04)` }}>
          {STEPS.map((s, i) => {
            const st = state(i)
            return (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:'13px', padding:'13px 15px', borderRadius:'12px',
                background: st === 'active' ? 'rgba(0,232,122,0.07)' : 'transparent',
                transition:'all 0.3s', opacity: st === 'pending' ? 0.22 : 1,
                animation: st === 'active' ? 'stepIn 0.3s ease' : 'none',
              }}>
                <div style={{
                  width:'28px', height:'28px', borderRadius:'50%', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'11px', fontWeight:'700',
                  background: st==='done' ? 'rgba(0,232,122,0.15)' : st==='active' ? GDark : 'rgba(255,255,255,0.04)',
                  border: st==='done' ? `1px solid rgba(0,232,122,0.35)` : st==='active' ? `1px solid ${GBorder}` : `1px solid ${FAINT}`,
                  color: st==='done' ? GN : st==='active' ? GN : 'rgba(255,255,255,0.2)',
                }}>
                  {st==='done' ? '✓' : st==='active' ? '◉' : i+1}
                </div>
                <span style={{ fontFamily:'Inter', fontSize:'14px', fontWeight: st==='active' ? '500' : '400', color: st==='active' ? '#fff' : 'rgba(255,255,255,0.5)', textAlign:'left', flex:1 }}>{s}</span>
              </div>
            )
          })}
        </div>

        {error && (
          <div style={{ marginTop:'20px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.22)', borderRadius:'14px', padding:'18px' }}>
            <p style={{ fontFamily:'Inter', fontSize:'14px', color:'#fca5a5', marginBottom:'12px', lineHeight:'1.5' }}>{error}</p>
            <button onClick={() => nav('/start')} style={{ background:GR, color:'#001a0e', border:'none', borderRadius:'9px', padding:'10px 22px', fontFamily:'Outfit', fontSize:'14px', fontWeight:'700', cursor:'pointer' }}>
              Go back and try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
