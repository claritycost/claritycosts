import { useState } from 'react'
import { Link } from 'react-router-dom'

const FREE = ['Your recommended day rate','Market range for your region & specialty','Monthly & annual income projections','Project rate estimate','Monthly retainer benchmark','Positioning statement','Charge script','Results emailed to your inbox']
const PAID_ONLY = ['Full 7-page PDF rate card report','5 objection-handling scripts','3 client email templates','Raise Your Rates Guide (10 strategies)','6-month rate roadmap']
const COMPARE = [['Recommended day rate',true,true],['Market rate range',true,true],['Income projections',true,true],['Project & retainer rates',true,true],['Positioning statement',true,true],['Charge script',true,true],['Email delivery',true,true],['7-page PDF report',false,true],['Objection scripts (×5)',false,true],['Email templates (×3)',false,true],['Raise Your Rates Guide',false,true],['6-month rate roadmap',false,true]]

const FAQS = [
  { q:'Is the free plan really free forever?', a:'Yes. Your full rate card — day rate, project rate, retainer, positioning statement, and charge script — is emailed to you at no cost. No credit card, no time limit.' },
  { q:'What exactly do I get with the £9 report?', a:"A one-off £9 purchase — not a subscription. You get a PDF with 10 raise-your-rates strategies tailored to your situation, 4 copy-paste email templates, and a personalised 6-month roadmap." },
  { q:'Can I pay and download immediately?', a:'Yes. After completing the free questionnaire you can upgrade instantly via Stripe. Your PDF is emailed within minutes of payment.' },
  { q:"Can I use this if I'm just starting out as a freelancer?", a:"Absolutely. Clarity Costs is built for all experience levels. If you're just starting out, knowing your rate from day one means you never have to undercharge just to win your first clients." },
]

export default function Pricing() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-tag">Pricing</div>
          <h1>Simple, honest <span className="green">pricing.</span></h1>
          <p>Start completely free. Upgrade for £9 if you want the full toolkit.<br />No subscription. No surprises.</p>
        </div>
      </div>

      <div className="section">
        {/* Pricing cards — stack on mobile */}
        <div className="pricing-cards">

          {/* Free */}
          <div className="pricing-card pricing-card--free">
            <span className="badge badge-dim" style={{ marginBottom: 24, display: 'inline-block' }}>Free forever</span>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 10 }}>Free</div>
            <div style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--green)', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 12 }}>Free</div>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28, lineHeight: 1.65 }}>Everything you need to start charging confidently today.</p>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 28 }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 36 }}>
              {FREE.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text)' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                </li>
              ))}
              {PAID_ONLY.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'rgba(255,255,255,.2)' }}>
                  <span style={{ flexShrink: 0 }}>–</span>{f}
                </li>
              ))}
            </ul>
            <Link to="/start" className="btn-outline" style={{ width: '100%' }}>Calculate my rate →</Link>
          </div>

          {/* Paid */}
          <div className="pricing-card pricing-card--paid">
            <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(circle,rgba(0,232,122,.15) 0%,transparent 65%)', pointerEvents: 'none' }} />
            <span className="badge badge-green" style={{ marginBottom: 24, display: 'inline-block' }}>Most popular</span>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 10 }}>Full Toolkit</div>
            <div style={{ fontSize: '3.2rem', fontWeight: 900, color: 'var(--white)', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 12 }}>
              <sup style={{ fontSize: '1.2rem', verticalAlign: 'super', color: 'var(--green)' }}>£</sup>9
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28, lineHeight: 1.65 }}>The complete toolkit. One-time payment. Delivered instantly.</p>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,232,122,.15)', marginBottom: 28 }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 36 }}>
              {[...FREE, ...PAID_ONLY].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text)' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <Link to="/start" className="btn-green" style={{ width: '100%' }}>Get the full toolkit →</Link>
            <p style={{ fontSize: 12, color: 'var(--muted2)', textAlign: 'center', marginTop: 14 }}>One-time · No subscription · Instant delivery</p>
          </div>

        </div>

        {/* Compare table */}
        <div className="section-tag">Full comparison</div>
        <h2>What's included</h2>
        <div style={{ marginTop: 40, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginBottom: 80 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)' }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '14px 20px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted2)' }}>Free</th>
                <th style={{ textAlign: 'center', padding: '14px 20px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--green)' }}>Full Toolkit (£9)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([feat, free, paid]) => (
                <tr key={feat} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '13px 20px', fontSize: 14, color: 'var(--muted)' }}>{feat}</td>
                  <td style={{ padding: '13px 20px', textAlign: 'center' }}>{free ? <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 16 }}>✓</span> : <span style={{ color: 'rgba(255,255,255,.15)' }}>–</span>}</td>
                  <td style={{ padding: '13px 20px', textAlign: 'center' }}>{paid ? <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 16 }}>✓</span> : <span style={{ color: 'rgba(255,255,255,.15)' }}>–</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="section-tag">FAQ</div>
        <h2>Frequently asked <span className="green">questions</span></h2>
        <div style={{ marginTop: 40, borderTop: '1px solid var(--border)', maxWidth: 760 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpen(o => o === i ? null : i)}
                style={{ width: '100%', background: 'none', border: 'none', padding: '20px 0', textAlign: 'left', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: open === i ? 'var(--green)' : 'var(--white)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
              >
                {f.q}
                <span style={{ fontSize: '1.2rem', color: 'var(--muted)', flexShrink: 0, display: 'inline-block', transition: 'transform .25s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {open === i && <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, paddingBottom: 20 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="trust-strip">
        <div className="trust-inner">
          {['No subscription', 'One-time payment', 'Instant delivery', 'GDPR compliant', '100% UK market data'].map(t => (
            <div key={t} className="trust-item"><div className="dot" />{t}</div>
          ))}
        </div>
      </div>
    </>
  )
}
