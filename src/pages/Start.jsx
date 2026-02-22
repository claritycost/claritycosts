import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Start.module.css'

const QUESTIONS = [
  {
    id: 'discipline',
    step: 1,
    question: 'What kind of freelance work do you do?',
    hint: 'Pick the one that best describes your main service.',
    type: 'choice',
    options: [
      { label: 'Design & Creative', emoji: '🎨' },
      { label: 'Development & Tech', emoji: '💻' },
      { label: 'Writing & Content', emoji: '✍️' },
      { label: 'Marketing & Strategy', emoji: '📈' },
      { label: 'Consulting & Advisory', emoji: '🧠' },
      { label: 'Video & Photography', emoji: '🎬' },
      { label: 'Other', emoji: '✦' },
    ],
  },
  {
    id: 'experience',
    step: 2,
    question: 'How many years of experience do you have?',
    hint: 'Count all professional experience, not just freelance.',
    type: 'choice',
    options: [
      { label: 'Under 2 years', emoji: '🌱' },
      { label: '2–5 years', emoji: '📗' },
      { label: '5–10 years', emoji: '📘' },
      { label: '10+ years', emoji: '🏆' },
    ],
  },
  {
    id: 'location',
    step: 3,
    question: 'Where are you based?',
    hint: 'Rates vary significantly by region.',
    type: 'choice',
    options: [
      { label: 'London', emoji: '🏙️' },
      { label: 'South East England', emoji: '🏘️' },
      { label: 'Midlands', emoji: '🌆' },
      { label: 'North of England', emoji: '🌉' },
      { label: 'Scotland', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
      { label: 'Wales', emoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
      { label: 'Northern Ireland', emoji: '🍀' },
      { label: 'Remote-first / anywhere', emoji: '🌍' },
    ],
  },
  {
    id: 'target_income',
    step: 4,
    question: 'What do you want to take home per year?',
    hint: 'This is after-tax income — what lands in your bank account.',
    type: 'choice',
    options: [
      { label: 'Under £30k', emoji: '' },
      { label: '£30k–£40k', emoji: '' },
      { label: '£40k–£55k', emoji: '' },
      { label: '£55k–£75k', emoji: '' },
      { label: '£75k–£100k', emoji: '' },
      { label: 'Over £100k', emoji: '' },
    ],
  },
  {
    id: 'billable_days',
    step: 5,
    question: 'How many days per week do you plan to work for clients?',
    hint: 'The rest goes on admin, sales, and having a life.',
    type: 'choice',
    options: [
      { label: '1–2 days/week', emoji: '🌤️' },
      { label: '3 days/week', emoji: '🌥️' },
      { label: '4 days/week', emoji: '⛅' },
      { label: '5 days/week', emoji: '☁️' },
    ],
  },
  {
    id: 'client_type',
    step: 6,
    question: 'Who do you mostly want to work with?',
    hint: 'Different clients expect very different rates.',
    type: 'choice',
    options: [
      { label: 'Early-stage startups', emoji: '🚀' },
      { label: 'Funded scale-ups', emoji: '📊' },
      { label: 'SMEs & small businesses', emoji: '🏪' },
      { label: 'Large corporates & enterprise', emoji: '🏢' },
      { label: 'Agencies & studios', emoji: '✦' },
      { label: 'Non-profits & public sector', emoji: '🌿' },
      { label: 'Mix of the above', emoji: '🎯' },
    ],
  },
  {
    id: 'confidence',
    step: 7,
    question: 'How do you currently feel about your rate?',
    hint: 'Be honest — this is just for calibration.',
    type: 'choice',
    options: [
      { label: "I know I'm undercharging", emoji: '😬' },
      { label: "I think I'm about right", emoji: '🤔' },
      { label: "I have no idea where I sit", emoji: '😶' },
      { label: "I might be overpriced", emoji: '😅' },
    ],
  },
  {
    id: 'email',
    step: 8,
    question: 'Where should we send your rate card?',
    hint: "We'll email your personalised results. No spam — ever.",
    type: 'email',
  },
]

export default function Start() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('forward')

  const q = QUESTIONS[currentStep]
  const progress = ((currentStep) / QUESTIONS.length) * 100

  function goNext(value) {
    if (animating) return
    setAnswers(prev => ({ ...prev, [q.id]: value }))
    if (currentStep < QUESTIONS.length - 1) {
      setDirection('forward')
      setAnimating(true)
      setTimeout(() => {
        setCurrentStep(s => s + 1)
        setAnimating(false)
      }, 220)
    }
  }

  function goBack() {
    if (currentStep === 0 || animating) return
    setDirection('back')
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep(s => s - 1)
      setAnimating(false)
    }, 220)
  }

  function handleEmailSubmit() {
    const val = email.trim()
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    const finalAnswers = { ...answers, email: val }
    // Store in sessionStorage to pass to results page (built in a later session)
    sessionStorage.setItem('cc_answers', JSON.stringify(finalAnswers))
    // Navigate to a holding page — results AI processing built next session
    navigate('/calculating')
  }

  const animClass = animating
    ? direction === 'forward' ? styles.slideOutLeft : styles.slideOutRight
    : direction === 'forward' ? styles.slideInRight : styles.slideInLeft

  return (
    <div className={styles.page}>

      {/* ── TOP BAR ── */}
      <div className={styles.topBar}>
        <button
          className={styles.backBtn}
          onClick={currentStep === 0 ? () => navigate('/') : goBack}
          aria-label="Go back"
        >
          <span className={styles.backArrow}>←</span>
          {currentStep === 0 ? 'Home' : 'Back'}
        </button>

        <span className={styles.stepCounter}>
          {currentStep + 1} <span className={styles.stepOf}>of {QUESTIONS.length}</span>
        </span>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── QUESTION AREA ── */}
      <div className={styles.questionArea} key={currentStep}>
        <div className={`${styles.questionCard} ${animClass}`}>

          <div className={styles.stepPip}>Question {q.step}</div>
          <h1 className={styles.questionText}>{q.question}</h1>
          {q.hint && <p className={styles.hint}>{q.hint}</p>}

          {/* Choice type */}
          {q.type === 'choice' && (
            <div className={styles.optionsGrid}>
              {q.options.map(({ label, emoji }) => {
                const isSelected = answers[q.id] === label
                return (
                  <button
                    key={label}
                    className={`${styles.optionBtn} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => goNext(label)}
                  >
                    {emoji && <span className={styles.optionEmoji}>{emoji}</span>}
                    <span className={styles.optionLabel}>{label}</span>
                    {isSelected && <span className={styles.optionCheck}>✓</span>}
                  </button>
                )
              })}
            </div>
          )}

          {/* Email type */}
          {q.type === 'email' && (
            <div className={styles.emailForm}>
              <input
                type="email"
                className={`${styles.emailInput} ${emailError ? styles.emailInputError : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailError('') }}
                onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                autoComplete="email"
                inputMode="email"
                autoFocus
              />
              {emailError && (
                <p className={styles.emailError}>{emailError}</p>
              )}
              <button
                className={styles.submitBtn}
                onClick={handleEmailSubmit}
              >
                Calculate my rate
                <span className={styles.submitArrow}>→</span>
              </button>
              <p className={styles.privacyNote}>
                🔒 No spam. Unsubscribe any time. We'll never share your email.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* ── BOTTOM TRUST ── */}
      <div className={styles.bottomTrust}>
        <span>Free to use</span>
        <span className={styles.trustDot}>·</span>
        <span>Built for UK freelancers</span>
        <span className={styles.trustDot}>·</span>
        <span>Powered by GPT-4o</span>
      </div>

    </div>
  )
}
