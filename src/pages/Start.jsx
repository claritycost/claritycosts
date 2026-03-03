import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Start.module.css'

const QUESTIONS = [
  { key:'specialty', question:"What's your freelance specialty?", hint:'Pick the closest match.', grid:true,
    options:[{icon:'🎨',label:'Design & Creative'},{icon:'💻',label:'Development'},{icon:'📣',label:'Marketing & SEO'},{icon:'✍️',label:'Copywriting'},{icon:'📊',label:'Finance & Consulting'},{icon:'🎥',label:'Video & Photography'},{icon:'🤝',label:'HR & Recruitment'},{icon:'⚡',label:'Other'}]},
  { key:'experience', question:'How many years of experience do you have?', hint:'Including any employed time in your field.',
    options:[{icon:'🌱',label:'Under 1 year'},{icon:'📈',label:'1–3 years'},{icon:'🔥',label:'3–6 years'},{icon:'⭐',label:'6–10 years'},{icon:'🏆',label:'10+ years'}]},
  { key:'location', question:'Where are you based in the UK?', hint:'Rates vary significantly by region.', grid:true,
    options:[{icon:'🏙️',label:'London'},{icon:'🌳',label:'South East'},{icon:'🏭',label:'Midlands'},{icon:'⛰️',label:'North of England'},{icon:'🌿',label:'Scotland'},{icon:'🌊',label:'Wales'},{icon:'🌐',label:'Remote / Flexible'},{icon:'🍀',label:'Northern Ireland'}]},
  { key:'worktype', question:'What type of work do you primarily do?', hint:'Helps calibrate your rate structure.',
    options:[{icon:'📋',label:'Day rate contracts (IR35 etc.)'},{icon:'🎯',label:'Fixed-price projects'},{icon:'🔄',label:'Monthly retainers'},{icon:'⚡',label:'Mix of all three'}]},
  { key:'income', question:"What's your target annual take-home?", hint:'After tax and expenses — what lands in your bank.',
    options:[{icon:'💷',label:'Under £30k'},{icon:'💷',label:'£30k – £50k'},{icon:'💷',label:'£50k – £80k'},{icon:'💷',label:'£80k – £120k'},{icon:'💷',label:'£120k+'}]},
  { key:'days', question:'How many days a week do you want to work?', hint:'Include admin, pitching, and non-billable time.',
    options:[{icon:'🧘',label:'1–2 days'},{icon:'⚖️',label:'3 days'},{icon:'📅',label:'4 days'},{icon:'💼',label:'5 days'}]},
  { key:'clients', question:'What kind of clients do you work with?', hint:'Or want to — aspirationally is fine.',
    options:[{icon:'🚀',label:'Startups & scale-ups'},{icon:'🏢',label:'SMEs & established businesses'},{icon:'🏦',label:'Enterprise & corporates'},{icon:'🎨',label:'Agencies & studios'},{icon:'🔀',label:'Mix / not sure yet'}]},
  { key:'email', question:'Where should we send your results?', hint:'Your rate card, positioning statement, and charge script.', type:'email' },
]

export default function Start() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const q = QUESTIONS[step]
  const total = QUESTIONS.length
  const pct = Math.round(((step + 1) / total) * 100)
  const isEmail = q.type === 'email'
  const canSubmit = isEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const select = (value) => {
    setAnswers(a => ({ ...a, [q.key]: value }))
    setTimeout(() => setStep(s => s + 1), 200)
  }

  const handleSubmit = () => {
    setLoading(true)
    sessionStorage.setItem('cc_answers', JSON.stringify({ ...answers, email }))
    navigate('/calculating')
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.glowBg} />
      <div className={`${styles.card} fade-up`}>
        <div className={styles.progress}>
          <div className={styles.progressTop}>
            <span>Step {step + 1} of {total}</span>
            <span className={styles.pct}>{pct}%</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{width:`${pct}%`}} />
          </div>
          <div className={styles.dots}>
            {QUESTIONS.map((_,i) => (
              <div key={i} className={[styles.dot, i<step?styles.done:'', i===step?styles.current:''].filter(Boolean).join(' ')} />
            ))}
          </div>
        </div>

        <p className={styles.question}>{q.question}</p>
        <p className={styles.hint}>{q.hint}</p>

        {!isEmail && (
          <div className={q.grid ? styles.optionsGrid : styles.options}>
            {q.options.map(opt => (
              <button key={opt.label}
                className={[styles.optBtn, answers[q.key]===opt.label ? styles.selected : ''].filter(Boolean).join(' ')}
                onClick={() => select(opt.label)}>
                <span className={styles.optIcon}>{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {isEmail && (
          <div style={{marginBottom:8}}>
            <div className="form-group" style={{marginBottom:8}}>
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key==='Enter' && canSubmit && handleSubmit()} autoFocus />
            </div>
            <p style={{fontSize:12,color:'var(--muted2)',marginBottom:20}}>
              We will never spam you. <a href="/privacy" style={{color:'var(--green)'}}>Privacy Policy</a>
            </p>
          </div>
        )}

        <div className={styles.navRow}>
          {step > 0
            ? <button className="btn-outline" onClick={() => setStep(s => s-1)}>← Back</button>
            : <span />}
          {isEmail && (
            <button className="btn-green" onClick={handleSubmit} disabled={!canSubmit || loading}>
              {loading ? 'One moment…' : 'Calculate my rate →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
