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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
