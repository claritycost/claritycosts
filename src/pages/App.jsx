import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

// Components
import CookieBanner from './components/CookieBanner'

// Layout components (inline — no separate Nav/Footer files needed)
import Nav    from './components/Nav'
import Footer from './components/Footer'

// Pages — names match GitHub repo exactly
import Landing      from './pages/Landing'
import Start        from './pages/Start'
import Calculating  from './pages/Calculating'
import Results      from './pages/Results'
import Save         from './pages/Save'
import Share        from './pages/Share'
import Upgrade      from './pages/Upgrade'
import Success      from './pages/Success'
import HowItWorks   from './pages/HowItWorks'
import Pricing      from './pages/Pricing'
import About        from './pages/About'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms        from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import Admin        from './pages/Admin'

// Pages that render full-screen with no shared nav/footer
const BARE_PAGES = ['/calculating', '/admin']

export default function App() {
  const { pathname } = useLocation()
  const isBare = BARE_PAGES.some(p => pathname.startsWith(p))

  // Scroll to top on every navigation
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      {!isBare && <Nav />}

      <Routes>
        {/* Main flow */}
        <Route path="/"             element={<Landing />} />
        <Route path="/start"        element={<Start />} />
        <Route path="/calculating"  element={<Calculating />} />
        <Route path="/results"      element={<Results />} />
        <Route path="/save"         element={<Save />} />
        <Route path="/share"        element={<Share />} />
        <Route path="/upgrade"      element={<Upgrade />} />
        <Route path="/success"      element={<Success />} />

        {/* Marketing */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing"      element={<Pricing />} />
        <Route path="/about"        element={<About />} />

        {/* Legal */}
        <Route path="/privacy"       element={<PrivacyPolicy />} />
        <Route path="/terms"         element={<Terms />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {!isBare && <Footer />}
      <CookieBanner />
    </>
  )
}
