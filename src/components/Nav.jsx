import { NavLink, Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/"><img src="/logo.png" alt="Clarity Costs" style={{ height: "200px", width: "auto" }} /></Link>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'active' : ''}>How it works</NavLink></li>
        <li><NavLink to="/about"        className={({ isActive }) => isActive ? 'active' : ''}>For who</NavLink></li>
        <li><NavLink to="/pricing"      className={({ isActive }) => isActive ? 'active' : ''}>Pricing</NavLink></li>
      </ul>
      <Link to="/start" className="nav-cta">Get my rate →</Link>
    </nav>
  )
}
