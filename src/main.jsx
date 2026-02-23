import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Start from "./pages/Start";
import Calculating from "./pages/Calculating";
import Results from "./pages/Results";
import Save from "./pages/Save";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/start"       element={<Start />} />
        <Route path="/calculating" element={<Calculating />} />
        <Route path="/results"     element={<Results />} />
        <Route path="/save"        element={<Save />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
