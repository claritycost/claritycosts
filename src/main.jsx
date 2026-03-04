import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Landing       from './pages/Landing.jsx'
import Start         from './pages/Start.jsx'
import Calculating   from './pages/Calculating.jsx'
import Results       from './pages/Results.jsx'
import Save          from './pages/Save.jsx'
import Upgrade       from './pages/Upgrade.jsx'
import Success       from './pages/Success.jsx'
import Admin         from './pages/Admin.jsx'
import Share         from './pages/Share.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import CookiePolicy  from './pages/CookiePolicy.jsx'
import Terms         from './pages/Terms.jsx'
import About         from './pages/About.jsx'
import HowItWorks    from './pages/HowItWorks.jsx'
import Pricing       from './pages/Pricing.jsx'
import Nav           from './components/Nav.jsx'
import Footer        from './components/Footer.jsx'
import CookieBanner  from './components/CookieBanner.jsx'

const BARE_PAGES = ['/calculating', '/admin']

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const isBare = BARE_PAGES.some(p => pathname.startsWith(p))
  return (
    <>
      <ScrollToTop />
      {!isBare && <Nav />}
      <Routes>
        <Route path="/"              element={<Landing />} />
        <Route path="/start"         element={<Start />} />
        <Route path="/calculating"   element={<Calculating />} />
        <Route path="/results"       element={<Results />} />
        <Route path="/save"          element={<Save />} />
        <Route path="/upgrade"       element={<Upgrade />} />
        <Route path="/success"       element={<Success />} />
        <Route path="/admin"         element={<Admin />} />
        <Route path="/share/:id"     element={<Share />} />
        <Route path="/privacy"       element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms"         element={<Terms />} />
        <Route path="/about"         element={<About />} />
        <Route path="/how-it-works"  element={<HowItWorks />} />
        <Route path="/pricing"       element={<Pricing />} />
      </Routes>
      {!isBare && <Footer />}
      <CookieBanner />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>
)
