import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBefore} />
        <div className={styles.heroAfter} />
        <div className={`${styles.heroContent} fade-up`}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            Free · UK Freelancers · Powered by GPT-4o
          </div>
          <h1>
            <span className={styles.white}>Stop guessing.</span>
            <span className={styles.green}>Start charging.</span>
          </h1>
          <p className={styles.heroSub}>
            The rate calculator built for UK freelancers who are done undercharging.
            Get your personalised day rate, project rate, and a script to say it out
            loud — in 3 minutes.
          </p>
          <Link to="/start" className="btn-green">Calculate my rate — Free</Link>
          <p className={styles.heroFine}>
            3 minutes <span>·</span> No card <span>·</span> No signup
          </p>
        </div>

        <div className={`${styles.statsBar} fade-up-delay`}>
          <div className={styles.statItem}>
            <div className={styles.statVal}>£650</div>
            <div className={styles.statLbl}>Avg day rate discovered</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statVal}>3 min</div>
            <div className={styles.statLbl}>Average completion</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statVal}>100%</div>
            <div className={styles.statLbl}>Free to use</div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <div className="section">
        <div className="section-tag">Sound familiar?</div>
        <h2>Undercharging isn't a pricing problem.<br />
          <span className="green">It's a clarity problem.</span>
        </h2>
        <div className={styles.threeGrid} style={{ marginTop: 48 }}>
          {[
            { icon: '🤔', title: 'You guess your rate',      body: 'You pick a number that "feels right" — then spend the next week wondering if you left money on the table.' },
            { icon: '📉', title: 'You undercharge to win',   body: "You drop your price before they even push back. Now you're resentful halfway through the project." },
            { icon: '😳', title: 'You freeze when asked',    body: '"What do you charge?" lands like a punch. You mumble something vague and lose the room.' },
          ].map(c => (
            <div key={c.title} className="card">
              <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: 18 }}>{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-tag">How it works</div>
        <h2>From "I'm not sure" to<br /><span className="green">"My rate is £X."</span></h2>
        <div className={styles.threeGrid} style={{ marginTop: 48 }}>
          {[
            { num: '01', icon: '⚡', title: 'Tell us about your work',  body: 'Specialty, experience, location, and the kind of clients you want. 8 quick questions.' },
            { num: '02', icon: '🧠', title: 'We calculate your number', body: 'GPT-4o analyses UK market rates, your overheads, tax, and target income to give you a real figure.' },
            { num: '03', icon: '✅', title: 'You charge with clarity',  body: 'Your personalised rate card, positioning statement, and a script for the "what do you charge?" moment.' },
          ].map(s => (
            <div key={s.num} className={styles.stepCard}>
              <div className={styles.stepNumBg}>{s.num}</div>
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TOOLKIT ── */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-tag">What you get</div>
        <h2>Not just a number.<br /><span className="green">A complete rate toolkit.</span></h2>
        <div className={styles.fourGrid} style={{ marginTop: 48 }}>
          {[
            { badge: 'Free', cls: 'badge-green', icon: '🟡', title: 'Your Day Rate',            body: 'A specific number based on your market, experience, and income target — not a guess.' },
            { badge: 'Free', cls: 'badge-green', icon: '📁', title: 'Project & Retainer Rates', body: 'Fixed-price and monthly retainer rates calibrated to your specialty and client type.' },
            { badge: 'Free', cls: 'badge-green', icon: '💬', title: 'Positioning Statement',    body: 'Two sentences describing exactly what you do and who you serve.' },
            { badge: 'Free', cls: 'badge-green', icon: '📝', title: 'Charge Script',            body: 'A natural script you can say when a client asks "what do you charge?"' },
          ].map(t => (
            <div key={t.title} className={styles.toolCard}>
              <span className={`badge ${t.cls} ${styles.toolBadge}`}>{t.badge}</span>
              <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 14 }}>{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
        <div className={styles.twoGrid} style={{ marginTop: 14 }}>
          {[
            { badge: '£9', cls: 'badge-dim', icon: '📄', title: 'Full PDF Report',        body: '7-page PDF with your rate card, objection scripts, email templates, and 6-month roadmap.' },
            { badge: '£9', cls: 'badge-dim', icon: '📈', title: 'Raise Your Rates Guide', body: '10 personalised strategies to raise your rates — built for your exact discipline and market.' },
          ].map(t => (
            <div key={t.title} className={styles.toolCard}>
              <span className={`badge ${t.cls} ${styles.toolBadge}`}>{t.badge}</span>
              <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 14 }}>{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRUST ── */}
      <div className="trust-strip">
        <div className="trust-inner">
          {['Built for UK Freelancers', 'Powered by GPT-4o', 'No card required', '3 minutes to complete', 'Results sent to your inbox'].map(t => (
            <div key={t} className="trust-item"><div className="dot" />{t}</div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className="page-tag">Ready?</div>
        <h2 className={styles.ctaH2}>
          Your rate is waiting.
          <span className={styles.green} style={{ display: 'block' }}>Go find it.</span>
        </h2>
        <p className={styles.ctaSub}>3 minutes. No fluff. Just your number.</p>
        <Link to="/start" className="btn-green">Start now — it's free →</Link>
      </div>
    </>
  )
}
