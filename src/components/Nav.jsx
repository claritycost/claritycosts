import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Clarity Costs" style={{ height: '200px', width: 'auto' }} />
        </Link>
      </div>

      {/* Desktop links */}
      <ul className="nav-links">
        <li><NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'active' : ''}>How it works</NavLink></li>
        <li><NavLink to="/about"        className={({ isActive }) => isActive ? 'active' : ''}>For who</NavLink></li>
        <li><NavLink to="/pricing"      className={({ isActive }) => isActive ? 'active' : ''}>Pricing</NavLink></li>
      </ul>

      <Link to="/start" className="nav-cta nav-cta-desktop">Get my rate →</Link>

      {/* Hamburger button — mobile only */}
      <button
        className="nav-burger"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className={`burger-line ${open ? 'open' : ''}`} />
        <span className={`burger-line ${open ? 'open' : ''}`} />
        <span className={`burger-line ${open ? 'open' : ''}`} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="nav-drawer" onClick={() => setOpen(false)}>
          <ul>
            <li><NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'active' : ''}>How it works</NavLink></li>
            <li><NavLink to="/about"        className={({ isActive }) => isActive ? 'active' : ''}>For who</NavLink></li>
            <li><NavLink to="/pricing"      className={({ isActive }) => isActive ? 'active' : ''}>Pricing</NavLink></li>
          </ul>
          <Link to="/start" className="btn-green" style={{ width: '100%', textAlign: 'center', marginTop: 8 }}>
            Get my rate →
          </Link>
        </div>
      )}
    </nav>
  )
}
