import { useState } from 'react'
import PolicyLayout from './PolicyLayout'

export default function CookiePolicy() {
  const [status, setStatus] = useState(localStorage.getItem('cc_cookies') || 'unset')

  const accept  = () => { localStorage.setItem('cc_cookies', 'accepted');  setStatus('accepted')  }
  const decline = () => { localStorage.setItem('cc_cookies', 'declined');  setStatus('declined')  }

  const statusLabel = status === 'accepted' ? 'Accepted all' : status === 'declined' ? 'Essential only' : 'Not set'
  const statusColor = status === 'accepted' ? 'var(--green)' : 'var(--muted)'

  return (
    <PolicyLayout tag="Legal" title="Cookie" highlight="Policy" subtitle="What cookies we use, why, and how to control them.">
      <p className="last-updated">Last updated: 1 January 2025</p>

      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help sites remember preferences and consent choices.</p>

      <h2>Your current preference</h2>
      <div style={{background:'var(--card)',border:'1px solid rgba(0,232,122,.2)',borderRadius:14,padding:28,marginBottom:28}}>
        <p style={{marginBottom:14,fontSize:14,color:'var(--muted)'}}>
          Current setting: <strong style={{color:statusColor}}>{statusLabel}</strong>
        </p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <button onClick={accept}  style={{background:'var(--green)',color:'#000',fontSize:13,fontWeight:700,padding:'9px 18px',borderRadius:8,border:'none',cursor:'pointer',fontFamily:'inherit'}}>Accept analytics cookies</button>
          <button onClick={decline} style={{background:'transparent',color:'var(--muted)',fontSize:13,fontWeight:600,padding:'9px 14px',borderRadius:8,border:'1px solid var(--border2)',cursor:'pointer',fontFamily:'inherit'}}>Essential only</button>
        </div>
      </div>

      <h2>Essential cookies</h2>
      <p>Strictly necessary for the website to function. Cannot be disabled.</p>
      <table style={{width:'100%',borderCollapse:'collapse',margin:'16px 0 28px',fontSize:13.5}}>
        <thead>
          <tr>
            {['Name','Purpose','Duration'].map(h => <th key={h} style={{textAlign:'left',padding:'10px 14px',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'var(--muted2)',borderBottom:'1px solid var(--border)'}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[['cc_cookies','Stores your cookie consent preference.','12 months'],['cc_session','Maintains session state through the calculator.','Session']].map(([n,p,d]) => (
            <tr key={n}>
              <td style={{padding:'11px 14px',fontFamily:'monospace',fontSize:13,color:'var(--text)',borderBottom:'1px solid var(--border)'}}>{n}</td>
              <td style={{padding:'11px 14px',fontSize:13,color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>{p}</td>
              <td style={{padding:'11px 14px',fontSize:13,color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Analytics cookies (with consent)</h2>
      <p>Optional. Only set with your consent. Help us understand how visitors use the site.</p>
      <table style={{width:'100%',borderCollapse:'collapse',margin:'16px 0 28px',fontSize:13.5}}>
        <thead>
          <tr>
            {['Name','Purpose','Duration'].map(h => <th key={h} style={{textAlign:'left',padding:'10px 14px',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.09em',color:'var(--muted2)',borderBottom:'1px solid var(--border)'}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[['_ga','Google Analytics — distinguishes unique users.','2 years'],['_ga_*','Google Analytics 4 — stores session state.','2 years'],['_gid','Distinguishes users over 24 hours.','24 hours']].map(([n,p,d]) => (
            <tr key={n}>
              <td style={{padding:'11px 14px',fontFamily:'monospace',fontSize:13,color:'var(--text)',borderBottom:'1px solid var(--border)'}}>{n}</td>
              <td style={{padding:'11px 14px',fontSize:13,color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>{p}</td>
              <td style={{padding:'11px 14px',fontSize:13,color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>How to control cookies</h2>
      <p>Use the buttons above, or manage cookies through your browser settings. Note that disabling all cookies may affect site functionality.</p>

      <h2>Contact</h2>
      <p><a href="mailto:contactus@claritycosts.co.uk">contactus@claritycosts.co.uk</a></p>
    </PolicyLayout>
  )
}
