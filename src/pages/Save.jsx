import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Save() {
  const navigate = useNavigate();
  const location = useLocation();
  const rateCard = location.state?.rateCard || null;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !rateCard) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-rate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), rateCard }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (!rateCard) {
    return (
      <div style={s.page}>
        <div style={s.container}>
          <a href="/" style={s.logo}>Clarity<span style={s.logoAccent}>Costs</span></a>
          <div style={s.card}>
            <div style={s.cardBody}>
              <h1 style={{ ...s.heading, fontSize: 24, marginBottom: 14 }}>Session expired</h1>
              <p style={s.subheading}>
                Your rate card is no longer in this session. Please go through the questionnaire again — it only takes two minutes.
              </p>
              <button style={s.button} onClick={() => navigate("/start")}>
                Start the questionnaire
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div style={s.page}>
        <div style={s.container}>
          <a href="/" style={s.logo}>Clarity<span style={s.logoAccent}>Costs</span></a>
          <div style={s.successCard}>
            <div style={s.successIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 style={s.successHeading}>On its way</h1>
            <p style={s.successBody}>Your rate card has been sent to <strong style={{ color: "#F5E6C8" }}>{email}</strong>. Check your inbox — it should arrive within the next minute.</p>
            <p style={s.successSub}>Not there? Check your spam folder and mark it as safe.</p>
            <div style={s.successDivider} />
            <p style={s.successNext}><strong>What to do next:</strong> Read your charge script before your next client call. The words are there — you just have to say them.</p>
            <a href="/" style={s.successLink}>Back to Clarity Costs</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.container}>
        <a href="/" style={s.logo}>Clarity<span style={s.logoAccent}>Costs</span></a>
        <div style={s.card}>
          <div style={s.previewStrip}>
            <div style={s.previewRow}>
              <span style={s.previewLabel}>Day rate</span>
              <span style={s.previewValue}>{rateCard.dayRate}</span>
            </div>
            <div style={s.previewRow}>
              <span style={s.previewLabel}>Project rate</span>
              <span style={s.previewValue}>{rateCard.projectRate}</span>
            </div>
            <div style={s.previewRow}>
              <span style={s.previewLabel}>Retainer</span>
              <span style={s.previewValue}>{rateCard.retainerRate}</span>
            </div>
          </div>
          <div style={s.cardBody}>
            <p style={s.eyebrow}>Your rate card is ready</p>
            <h1 style={s.heading}>Get it in your inbox</h1>
            <p style={s.subheading}>
              We'll send you a clean, save-worthy email with your full rate card — day rate, project rate, retainer, positioning statement, and the exact words to use when a client asks your price.
            </p>
            <form onSubmit={handleSubmit} style={s.form} noValidate>
              <input
                type="email"
                required
                placeholder="you@yourdomain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={s.input}
                disabled={status === "loading"}
                autoComplete="email"
              />
              {errorMsg && <p style={s.errorText}>{errorMsg}</p>}
              <button
                type="submit"
                style={{ ...s.button, ...(status === "loading" || !email.trim() ? s.buttonDisabled : {}) }}
                disabled={status === "loading" || !email.trim()}
              >
                {status === "loading" ? "Sending…" : "Email me my rate card →"}
              </button>
            </form>
            <p style={s.privacy}>No spam. No account. We store your email alongside your submission so we can improve the product.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#0F0E0C", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" },
  container: { width: "100%", maxWidth: 520 },
  logo: { display: "block", textAlign: "center", marginBottom: 36, fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: "#F5F0E8", textDecoration: "none" },
  logoAccent: { color: "#F5E6C8" },
  card: { background: "#1A1916", border: "1px solid rgba(245,230,200,0.12)", borderRadius: 16, overflow: "hidden" },
  previewStrip: { background: "rgba(245,230,200,0.05)", borderBottom: "1px solid rgba(245,230,200,0.1)", padding: "22px 28px", display: "flex", flexDirection: "column", gap: 12 },
  previewRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  previewLabel: { fontSize: 14, color: "rgba(245,240,232,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 },
  previewValue: { fontSize: 17, fontWeight: 600, color: "#F5E6C8" },
  cardBody: { padding: "36px 28px 32px" },
  eyebrow: { fontSize: 13, fontWeight: 600, color: "#C8A96E", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px 0" },
  heading: { fontSize: 32, fontWeight: 700, color: "#F5F0E8", letterSpacing: "-0.8px", lineHeight: 1.15, margin: "0 0 14px 0" },
  subheading: { fontSize: 16, lineHeight: 1.65, color: "rgba(245,240,232,0.6)", margin: "0 0 28px 0" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { width: "100%", padding: "15px 16px", fontSize: 17, background: "rgba(245,230,200,0.06)", border: "1px solid rgba(245,230,200,0.18)", borderRadius: 10, color: "#F5F0E8", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  button: { display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 24px", fontSize: 17, fontWeight: 600, background: "#F5E6C8", color: "#0F0E0C", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" },
  buttonDisabled: { opacity: 0.5, cursor: "not-allowed" },
  errorText: { fontSize: 15, color: "#E87060", margin: 0 },
  privacy: { fontSize: 13, color: "rgba(245,240,232,0.3)", lineHeight: 1.6, margin: "16px 0 0 0" },
  successCard: { background: "#1A1916", border: "1px solid rgba(245,230,200,0.12)", borderRadius: 16, padding: "48px 32px", textAlign: "center" },
  successIcon: { width: 64, height: 64, borderRadius: "50%", background: "rgba(200,169,110,0.15)", border: "1.5px solid rgba(200,169,110,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", color: "#C8A96E" },
  successHeading: { fontSize: 36, fontWeight: 700, color: "#F5F0E8", letterSpacing: "-1px", margin: "0 0 16px 0" },
  successBody: { fontSize: 17, lineHeight: 1.65, color: "rgba(245,240,232,0.7)", margin: "0 0 12px 0" },
  successSub: { fontSize: 14, lineHeight: 1.6, color: "rgba(245,240,232,0.35)", margin: "0 0 28px 0" },
  successDivider: { height: 1, background: "rgba(245,230,200,0.1)", margin: "0 0 24px 0" },
  successNext: { fontSize: 16, lineHeight: 1.65, color: "rgba(245,240,232,0.65)", margin: "0 0 28px 0" },
  successLink: { display: "inline-block", fontSize: 15, color: "#C8A96E", textDecoration: "none", borderBottom: "1px solid rgba(200,169,110,0.4)", paddingBottom: 2 },
};
