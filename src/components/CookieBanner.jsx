import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cc_cookies')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cc_cookies', 'accepted')
    setVisible(false)
    // Initialise analytics here if needed
  }

  const decline = () => {
    localStorage.setItem('cc_cookies', 'declined')
    setVisible(false)
  }

  return (
    <div className={`cookie-banner${visible ? '' : ' hidden'}`}>
      <div className="cookie-icon">🍪</div>
      <div className="cookie-text">
        <strong>We use cookies</strong>
        <p>
          We use essential and analytics cookies to improve your experience.{' '}
          <Link to="/cookie-policy">Cookie Policy</Link>
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-accept" onClick={accept}>Accept all</button>
        <button className="cookie-decline" onClick={decline}>Decline</button>
      </div>
    </div>
  )
}
