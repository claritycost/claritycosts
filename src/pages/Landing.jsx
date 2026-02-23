import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

const PAIN_POINTS = [
  {
    icon: '🤔',
    title: 'You guess your rate',
    body: 'You pick a number that "feels right" — then spend the next week wondering if you left money on the table.',
  },
  {
    icon: '😬',
    title: 'You undercharge to win',
    body: "You drop your price before they even push back. Now you're resentful halfway through the project.",
  },
  {
    icon: '😶',
    title: 'You freeze when asked',
    body: '"What do you charge?" lands like a punch. You mumble something vague and lose the room.',
  },
]

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Tell us about your work',
    body: 'Skills, experience, niche, and the kind of clients you want. 8 quick questions.',
  },
  {
    num: '02',
    title: 'We calculate your number',
    body: 'GPT-4o analyses UK market rates, your overheads, tax, and target income to give you a real figure.',
  },
  {
    num: '03',
    title: 'You charge with clarity',
    body: 'Your personalised rate card, positioning statement, and a script for the "what do you charge?" moment.',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const heroRef = useRef(null)

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('[data-animate]')
    els?.forEach((el, i) => {
      el.style.animation = `fadeUp 0.6s ease ${i * 100}ms both`
    })
  }, [])

  return (
    <div className={styles.page}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <span className={styles.logo}>
          <img src="/cc_logo.jpg" alt="Clarity Costs" className={styles.logoMark} />
          <span className={styles.logoText}>Clarity Costs</span>
        </span>
        <button className={styles.navCta} onClick={() => navigate('/start')}>
          Get my rate →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge} data-animate>
            <span className={styles.heroBadgeDot} />
            Free for freelancers in the UK
          </div>

          <h1 className={styles.heroHeading} data-animate>
            Stop guessing.<br />
            <em>Charge what<br />you're worth.</em>
          </h1>

          <p className={styles.heroSub} data-animate>
            Clarity Costs calculates your real freelance rate in 3 minutes — based on your skills, your market, and your life. Then gives you the confidence to say the number out loud.
          </p>

          <div className={styles.heroActions} data-animate>
            <button className={styles.heroCta} onClick={() => navigate('/start')}>
              Find out what to charge →
            </button>
            <p className={styles.heroSmall}>No sign-up needed. Takes 3 minutes.</p>
          </div>

          <div className={styles.socialProof} data-animate>
            <div className={styles.avatars}>
              <span className={styles.avatar}>JD</span>
              <span className={styles.avatar}>SK</span>
              <span className={styles.avatar}>MP</span>
              <span className={styles.avatar}>TR</span>
            </div>
            <div className={styles.proofText}>
              <strong>Built for UK freelancers</strong>
              <span>who are done undercharging</span>
            </div>
          </div>
        </div>

        <div className={styles.heroRight} data-animate>
          <div className={styles.previewCard}>
            <div className={styles.previewCardTop}>
              <span className={styles.previewLabel}>Your rate, based on your answers</span>
              <div className={styles.previewBlur}>
                <span className={styles.previewRate}>£<span>485</span></span>
                <span className={styles.previewUnit}>/day</span>
              </div>
              <div className={styles.previewRange}>
                Recommended range: <strong>£440 – £540/day</strong>
              </div>
            </div>
            <div className={styles.previewCardBottom}>
              <div className={styles.previewItem}><span className={styles.tick}>✓</span> Your positioning statement</div>
              <div className={styles.previewItem}><span className={styles.tick}>✓</span> Script for "what do you charge?"</div>
              <div className={styles.previewItem}><span className={styles.tick}>✓</span> Day rate · project rate · retainer</div>
            </div>
            <div className={styles.previewLock}>
              🔒 Answer 8 questions to unlock your real rate
            </div>
          </div>

          <div className={styles.statRow}>
            <div className={styles.stat}><span className={styles.statNum}>3 mins</span><span className={styles.statLabel}>to your rate</span></div>
            <div className={styles.stat}><span className={styles.statNum}>£0</span><span className={styles.statLabel}>to start</span></div>
            <div className={styles.stat}><span className={styles.statNum}>100%</span><span className={styles.statLabel}>confidence</span></div>
          </div>
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className={styles.darkSection}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>Sound familiar?</p>
          <h2 className={styles.headingLight}>
            Undercharging isn't a pricing problem.<br />
            <em>It's a clarity problem.</em>
          </h2>
          <div className={styles.painGrid}>
            {PAIN_POINTS.map(({ icon, title, body }) => (
              <div key={title} className={styles.painCard}>
                <span className={styles.painIcon}>{icon}</span>
                <h3 className={styles.painTitle}>{title}</h3>
                <p className={styles.painBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.lightSection}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>How it works</p>
          <h2 className={styles.headingDark}>
            From "I'm not sure" to<br />
            <em>"My rate is £X."</em>
          </h2>
          <div className={styles.stepsGrid}>
            {HOW_IT_WORKS.map(({ num, title, body }) => (
              <div key={num} className={styles.stepCard}>
                <span className={styles.stepNum}>{num}</span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaHeading}>
            Your rate is waiting.<br />
            <em>Go find it.</em>
          </h2>
          <p className={styles.finalCtaSub}>3 minutes. No fluff. Just your number.</p>
          <button className={styles.heroCta} onClick={() => navigate('/start')}>
            Start now — it's free →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <span className={styles.logo}>
          <img src="/cc_logo.jpg" alt="Clarity Costs" className={styles.logoMark} />
          <span className={styles.logoText}>Clarity Costs</span>
        </span>
        <p className={styles.footerTagline}>Built for UK freelancers who are done undercharging.</p>
        <p className={styles.footerSmall}>© {new Date().getFullYear()} Clarity Costs · claritycosts.co.uk</p>
      </footer>

    </div>
  )
}
