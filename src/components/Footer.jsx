import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.png" alt="Clarity Costs" />
            <div className="footer-tagline">Built for UK freelancers who are done undercharging.</div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><Link to="/how-it-works">How it works</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/start">Get my rate</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms &amp; Conditions</Link></li>
                <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Hello Clarity Ltd. Registered in England and Wales.</p>
          <p className="footer-email"><a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a></p>
        </div>
      </div>
    </footer>
  )
}
