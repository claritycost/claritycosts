import { useState } from 'react'
import PolicyLayout from './PolicyLayout'

const TH = ({ children }) => (
  <th style={{ textAlign: 'left', padding: '11px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--muted2)', borderBottom: '1px solid var(--border)' }}>
    {children}
  </th>
)
const TD = ({ children, mono }) => (
  <td style={{ padding: '12px 14px', color: mono ? 'var(--text)' : 'var(--muted)', fontFamily: mono ? 'monospace' : 'inherit', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>
    {children}
  </td>
)

export default function CookiePolicy() {
  const [status, setStatus] = useState(localStorage.getItem('cc_cookies') || 'unset')

  const accept = () => { localStorage.setItem('cc_cookies', 'accepted'); setStatus('accepted') }
  const decline = () => { localStorage.setItem('cc_cookies', 'declined'); setStatus('declined') }

  const statusLabel = status === 'accepted' ? 'Accepted all' : status === 'declined' ? 'Essential only' : 'Not set'
  const statusColor = status === 'accepted' ? 'var(--green)' : status === 'declined' ? 'var(--muted)' : 'var(--white)'

  return (
    <PolicyLayout tag="Legal" title="Cookie" highlight="Policy" subtitle="What cookies we use, why, and how to control them.">
      <p className="last-updated">Last updated: 1 January 2025</p>

      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, such as your preferences or consent choices.</p>

      <h2>Your current preference</h2>
      <div style={{ background: 'var(--card)', border: '1px solid rgba(0,232,122,.2)', borderRadius: 14, padding: 28, marginBottom: 28 }}>
        <p style={{ marginBottom: 14, fontSize: 14, color: 'var(--muted)' }}>
          Current setting: <strong style={{ color: statusColor }}>{statusLabel}</strong>
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={accept} style={{ background: 'var(--green)', color: '#000', fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Accept analytics cookies
          </button>
          <button onClick={decline} style={{ background: 'transparent', color: 'var(--muted)', fontSize: 13, fontWeight: 600, padding: '9px 14px', borderRadius: 8, border: '1px solid var(--border2)', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Essential only
          </button>
        </div>
      </div>

      <h2>Essential cookies</h2>
      <p>These cookies are strictly necessary for the website to function and cannot be disabled.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0 28px', fontSize: 13.5 }}>
        <thead><tr><TH>Name</TH><TH>Purpose</TH><TH>Duration</TH></tr></thead>
        <tbody>
          <tr><TD mono>cc_cookies</TD><TD>Stores your cookie consent preference so we don't show the banner on every visit.</TD><TD>12 months</TD></tr>
          <tr style={{ borderBottom: 'none' }}><TD mono>cc_session</TD><TD>Maintains your session state as you move through the calculator steps.</TD><TD>Session</TD></tr>
        </tbody>
      </table>

      <h2>Analytics cookies (with consent)</h2>
      <p>These cookies are optional and only set with your consent. They help us understand how visitors use our site so we can improve it.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '16px 0 28px', fontSize: 13.5 }}>
        <thead><tr><TH>Name</TH><TH>Purpose</TH><TH>Duration</TH></tr></thead>
        <tbody>
          {[
            ['_ga',   'Google Analytics — distinguishes unique users and tracks traffic volumes.', '2 years'],
            ['_ga_*', 'Google Analytics 4 — stores session state information.',                   '2 years'],
            ['_gid',  'Distinguishes unique users over a 24-hour period.',                        '24 hours'],
          ].map(([name, purpose, duration]) => (
            <tr key={name}><TD mono>{name}</TD><TD>{purpose}</TD><TD>{duration}</TD></tr>
          ))}
        </tbody>
      </table>

      <h2>How to control cookies</h2>
      <p>In addition to the controls above, you can manage cookies through your browser settings. Most browsers allow you to view, delete, or block cookies. Note that disabling all cookies may affect site functionality.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this Cookie Policy from time to time. The "last updated" date above will reflect any changes.</p>

      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a>.</p>
    </PolicyLayout>
  )
}
