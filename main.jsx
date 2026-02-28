import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Start from './pages/Start.jsx'
import Calculating from './pages/Calculating.jsx'
import Results from './pages/Results.jsx'
import Save from './pages/Save.jsx'
import Upgrade from './pages/Upgrade.jsx'
import Success from './pages/Success.jsx'
import Admin from './pages/Admin.jsx'
import Share from './pages/Share.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import CookiePolicy from './pages/CookiePolicy.jsx'
import Terms from './pages/Terms.jsx'
import About from './pages/About.jsx'
import CookieBanner from './components/CookieBanner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/start" element={<Start />} />
        <Route path="/calculating" element={<Calculating />} />
        <Route path="/results" element={<Results />} />
        <Route path="/save" element={<Save />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/share/:id" element={<Share />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
