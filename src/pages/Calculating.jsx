import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Calculating.module.css'

const STEPS = [
  'Analysing your discipline and experience…',
  'Checking UK market rates for your region…',
  'Factoring in tax, overheads, and target income…',
  'Calibrating for your client type…',
  'Building your personalised rate card…',
]

export default function Calculating() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (stepIndex < STEPS.length - 1) {
      const t = setTimeout(() => setStepIndex(s => s + 1), 1400)
      return () => clearTimeout(t)
    }
 navigate('/results')
  }, [stepIndex])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.spinner}>
          <svg viewBox="0 0 50 50" className={styles.spinnerSvg}>
            <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={styles.spinnerCircle} />
          </svg>
        </div>
        <h1 className={styles.heading}>Calculating your rate…</h1>
        <div className={styles.stepsContainer}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`${styles.stepRow} ${i <= stepIndex ? styles.stepVisible : styles.stepHidden}`}
            >
              <span className={styles.stepTick}>{i < stepIndex ? '✓' : i === stepIndex ? '◉' : '○'}</span>
              <span className={styles.stepText}>{s}</span>
            </div>
          ))}
        </div>
        <p className={styles.tagline}>
          Your personalised rate card is almost ready.
        </p>
      </div>
    </div>
  )
}
