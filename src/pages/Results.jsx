import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --ink:          #0f0e0c;
    --paper:        #f5f2ec;
    --gold:         #c9963a;
    --gold-light:   #e8b95a;
    --muted:        #8a8070;
    --rule:         #ddd8cc;
    --card:         #ffffff;
    --dark:         #1a1713;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--paper); color: var(--ink); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }

  .wm-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.25rem; background: var(--card); border-bottom: 1px solid var(--rule);
  }
  .wm { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.04em; }
  .wm-date { font-size: 0.7rem; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }

  .hero {
    background: var(--dark); padding: 2.75rem 1.5rem 2.25rem; text-align: center;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(201,150,58,0.12) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-block; background: var(--gold); color: var(--dark);
    font-size: 0.68rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    padding: 0.3rem 0.8rem; border-radius: 2px; margin-bottom: 1.1rem;
  }
  .hero-headline {
    font-family: 'Playfair Display', serif; font-size: clamp(1.65rem, 5vw, 2.4rem);
    font-weight: 600; color: #fff; line-height: 1.2; max-width: 440px; margin: 0 auto 1rem;
  }
  .hero-tip {
    color: rgba(255,255,255,0.55); font-size: 0.88rem; line-height: 1.65;
    max-width: 380px; margin: 0 auto; font-weight: 300;
  }

  .body { max-width: 600px; margin: 0 auto; padding: 0 1.25rem 2rem; }

  .section-head {
    font-size: 0.68rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin: 2rem 0 0.85rem;
  }

  .rate-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }

  .rate-card {
    background: var(--card); border: 1px solid var(--rule); border-radius: 4px; padding: 1.2rem 1rem;
  }
  .rate-card.primary { grid-column: 1 / -1; background: var(--dark); border-color: var(--dark); }

  .rc-label { font-size: 0.66rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.45rem; }
  .rate-card.primary .rc-label { color: rgba(255,255,255,0.4); }

  .rc-amount { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 700; color: var(--ink); line-height: 1; }
  .rate-card.primary .rc-amount { color: var(--gold-light); }
  .rc-amount.sm { font-size: 1.65rem; }

  .rc-sub { font-size: 0.76rem; color: var(--muted); margin-top: 0.2rem; }
  .rate-card.primary .rc-sub { color: rgba(255,255,255,0.38); }

  .rc-range { font-size: 0.75rem; color: var(--muted); margin-top: 0.55rem; }
  .rate-card.primary .rc-range { color: rgba(255,255,255,0.32); }

  .rc-divider { width: 20px; height: 1px; background: var(--rule); margin: 0.75rem 0; }
  .rate-card.primary .rc-divider { background: rgba(255,255,255,0.1); }

  .text-card { background: var(--card); border: 1px solid var(--rule); border-radius: 4px; padding: 1.4rem 1.2rem; margin-bottom: 0.65rem; }

  .tc-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; }
  .tc-label { font-size: 0.66rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

  .copy-btn {
    font-size: 0.7rem; color: var(--gold); background: none; border: 1px solid var(--gold);
    border-radius: 2px; padding: 0.18rem 0.55rem; cursor: pointer; letter-spacing: 0.06em;
    font-family: 'DM Sans', sans-serif; transition: all 0.18s;
  }
  .copy-btn:hover { background: var(--gold); color: var(--dark); }
  .copy-btn.done { background: #25a26e; border-color: #25a26e; color: #fff; }

  .quote-text {
    font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.1rem;
    line-height: 1.55; color: var(--ink);
  }

  .script-text {
    font-size: 0.88rem; line-height: 1.8; color: #3a3028;
    border-left: 3px solid var(--gold); padding-left: 1rem;
  }

  .insight-band {
    background: var(--gold); border-radius: 4px; padding: 1.1rem 1.2rem; margin-bottom: 0.65rem;
  }
  .insight-label { font-size: 0.66rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dark); margin-bottom: 0.4rem; opacity: 0.6; }
  .insight-text { font-size: 0.88rem; line-height: 1.65; color: var(--dark); font-weight: 500; }

  .cta-section { text-align: center; padding: 2rem 0 3rem; }
  .cta-rule { width: 36px; height: 2px; background: var(--gold); margin: 0 auto 1.4rem; }
  .cta-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 600; margin-bottom: 0.45rem; }
  .cta-sub { font-size: 0.86rem; color: var(--muted); line-height: 1.6; margin-bottom: 1.6rem; }

  .btn-gold {
    display: block; width: 100%; background: var(--gold); color: var(--dark);
    font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 500; letter-spacing: 0.04em;
    padding: 0.9rem; border-radius: 3px; border: none; cursor: pointer; transition: background 0.18s;
    margin-bottom: 0.75rem;
  }
  .btn-gold:hover { background: var(--gold-light); }

  .btn-ghost {
    background: none; border: none; color: var(--muted); font-size: 0.82rem; cursor: pointer;
    text-decoration: underline; text-underline-offset: 3px; font-family: 'DM Sans', sans-serif; padding: 0.5rem;
  }
  .btn-ghost:hover { color: var(--ink); }

  .loading-screen {
    min-height: 100vh; background: var(--dark); display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 1.25rem;
  }
  .dots { display: flex; gap: 7px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); animation: pulse 1.4s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,80%,100% { opacity:0.2; transform:scale(0.8); } 40% { opacity:1; transform:scale(1); } }
  .loading-text { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.2rem; color: rgba(255,255,255,0.65); }

  .error-screen {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; padding: 2rem; text-align: center;
  }
  .error-title { font-family: 'Playfair Display', serif; font-size: 1.45rem; margin-bottom: 0.65rem; }
  .error-sub { font-size: 0.88rem; color: var(--muted); line-height: 1.6; margin-bottom: 1.5rem; max-width: 300px; }

  .reveal { animation: revealUp 0.45s ease both; }
  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.1s; }
  .d3 { animation-delay: 0.15s; }
  .d4 { animation-delay: 0.2s; }
  .d5 { animation-delay: 0.25s; }
  @keyframes revealUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
`;

const gbp = (n) => {
  if (typeof n === "string" && n.includes("£")) return n;
  return `£${Number(n).toLocaleString("en-GB")}`;
};

export default function Results() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState({});

  useEffect(() => {
    const raw = sessionStorage.getItem("cc_answers");
    if (!raw) { navigate("/start"); return; }

    let answers;
    try { answers = JSON.parse(raw); }
    catch { navigate("/start"); return; }

    fetch("/api/generate-rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
        setStatus("done");
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err.message || "Something went wrong. Please try again.");
        setStatus("error");
      });
  }, [navigate]);

  const copy = (key, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied((p) => ({ ...p, [key]: true }));
      setTimeout(() => setCopied((p) => ({ ...p, [key]: false })), 2000);
    });
  };

  const handleSaveCTA = () => {
    navigate("/save", {
      state: {
        rateCard: {
          dayRate:              gbp(data.dayRate),
          projectRate:          gbp(data.projectRate),
          retainerRate:         gbp(data.retainerRate),
          positioningStatement: data.positioningStatement,
          chargeScript:         data.chargeScript,
          submissionId:         data.submissionId || null,
        }
      }
    });
  };

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (status === "loading") {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-screen">
          <div className="dots">
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
          <p className="loading-text">Calculating your rates…</p>
        </div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <style>{styles}</style>
        <div className="error-screen">
          <h1 className="error-title">Something went wrong</h1>
          <p className="error-sub">{errorMsg}</p>
          <button className="btn-gold" style={{ maxWidth: 260 }} onClick={() => navigate("/start")}>
            Go back and try again
          </button>
        </div>
      </>
    );
  }

  const {
    dayRate, projectRate, retainerRate,
    dayRateRange, projectRateRange, retainerRateRange,
    positioningStatement, chargeScript, rationale, headline, confidenceTip,
  } = data;

  return (
    <>
      <style>{styles}</style>
      <div>
        <div className="wm-bar">
          <span className="wm">Clarity Costs</span>
          <span className="wm-date">{today}</span>
        </div>

        <div className="hero reveal">
          <div className="hero-badge">Your Rate Card</div>
          <h1 className="hero-headline">{headline || "Your rates are ready."}</h1>
          {confidenceTip && <p className="hero-tip">{confidenceTip}</p>}
        </div>

        <div className="body">

          <p className="section-head reveal d1">Your rates</p>
          <div className="rate-grid reveal d1">

            <div className="rate-card primary">
              <p className="rc-label">Day Rate</p>
              <p className="rc-amount">{gbp(dayRate)}</p>
              <p className="rc-sub">per day</p>
              {dayRateRange && (
                <p className="rc-range">Range: {gbp(dayRateRange.low)} – {gbp(dayRateRange.high)}</p>
              )}
              <div className="rc-divider" />
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.6 }}>
                {rationale}
              </p>
            </div>

            <div className="rate-card">
              <p className="rc-label">Project Rate</p>
              <p className="rc-amount sm">{gbp(projectRate)}</p>
              <p className="rc-sub">per project</p>
              {projectRateRange && (
                <p className="rc-range">Range: {gbp(projectRateRange.low)} – {gbp(projectRateRange.high)}</p>
              )}
            </div>

            <div className="rate-card">
              <p className="rc-label">Monthly Retainer</p>
              <p className="rc-amount sm">{gbp(retainerRate)}</p>
              <p className="rc-sub">per month</p>
              {retainerRateRange && (
                <p className="rc-range">Range: {gbp(retainerRateRange.low)} – {gbp(retainerRateRange.high)}</p>
              )}
            </div>
          </div>

          <p className="section-head reveal d2">How to position yourself</p>
          <div className="text-card reveal d2">
            <div className="tc-head">
              <span className="tc-label">Your positioning statement</span>
              <button className={`copy-btn ${copied.position ? "done" : ""}`} onClick={() => copy("position", positioningStatement)}>
                {copied.position ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="quote-text">"{positioningStatement}"</p>
          </div>

          <p className="section-head reveal d3">When someone asks "what do you charge?"</p>
          <div className="text-card reveal d3">
            <div className="tc-head">
              <span className="tc-label">Your script</span>
              <button className={`copy-btn ${copied.script ? "done" : ""}`} onClick={() => copy("script", chargeScript)}>
                {copied.script ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="script-text">{chargeScript}</p>
          </div>

          {confidenceTip && (
            <div className="insight-band reveal d4">
              <p className="insight-label">One thing to remember</p>
              <p className="insight-text">{confidenceTip}</p>
            </div>
          )}

          <div className="cta-section reveal d5">
            <div className="cta-rule" />
            <h2 className="cta-title">Save your rate card</h2>
            <p className="cta-sub">Get this sent to your inbox — day rate, project rate, retainer, positioning statement, and your charge script.</p>
            <button className="btn-gold" onClick={handleSaveCTA}>Email me my rate card</button>
            <button className="btn-ghost" onClick={() => navigate("/start")}>Start again with different answers</button>
          </div>

        </div>
      </div>
    </>
  );
}
