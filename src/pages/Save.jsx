import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "cc_ratecard";

export default function Save() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [rateCard, setRateCard] = useState(null);
  const [dataStatus, setDataStatus] = useState("loading");

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRateCard(parsed);
        setDataStatus("ready");
      } else {
        setDataStatus("missing");
      }
    } catch (err) {
      console.error("Save page error:", err);
      setDataStatus("missing");
    }
  }, []);

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

  if (dataStatus === "loading") {
    return (
      <div style={styles.page}>
        <p style={{ color: "rgba(245,240,232,0.4)", fontSize: 16 }}>Loading…</p>
      </div>
    );
  }

  if (dataStatus === "missing") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <a href="/" style={styles.logo}>Clarity<span style={styles.logoAccent}>Costs</span></a>
          <div style={styles.card}>
            <div style={styles.cardBody}>
              <h1 style={{ ...styles.heading, fontSize: 24, marginBottom: 14 }}>Session expired</h1>
              <p style={styles.subheading}>
                Your rate card is no longer in this browser session. Please go through the questionnaire again — it only takes two minutes.
              </p>
              <button style={styles.button} onClick={() => navigate("/start")}>
                Start the questionnaire
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <a href="/" style={styles.logo}>Clarity<span style={styles.logoAccent}>Costs</span></a>
        {status === "success" ? (
          <SuccessScreen email={email} />
        ) : (
          <CaptureForm
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmit}
            status={status}
            errorMsg={errorMsg}
            rateCard={rateCard}
          />
        )}
      </div>
    </div>
  );
}

function CaptureForm({ email, setEmail, onSubmit, status, errorMsg, rateCard }) {
  return (
    <div style={styles.card}>
      <div style={styles.previewStrip}>
        <PreviewRow label="Day rate" value={rateCard.dayRate} />
        <PreviewRow label="Project rate" value={rateCard.projectRate} />
        <PreviewRow label="Retainer" value={rateCard.retainerRate} />
      </div>
      <div style={styles.cardBody}>
        <p style={styles.eyebrow}>Your rate card is ready</p>
        <h1 style={styles.heading}>Get it in your inbox</h1>
        <p style={styles.subheading}>
          We'll send you a clean, save-worthy email with your full rate card — day rate, project rate, retainer, positioning statement, and the exact words to use when a client asks your price.
        </p>
        <form onSubmit={onSubmit} style={styles.form} noValidate>
          <input
            type="email"
            required
            placeholder="you@yourdomain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            disabled={status === "loading"}
            autoComplete="email"
          />
          {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}
          <button
            type="submit"
            style={{ ...styles.button, ...(status === "loading" || !email.trim() ? styles.buttonDisabled : {}) }}
            disabled={status === "loading" || !email.trim()}
          >
            {status === "loading" ? "Sending…" : "Email me my rate card →"}
          </button>
        </form>
        <p style={styles.privacy}>No spam. No account. We store your email alongside your submission so we can improve the product.</p>
      </div>
    </div>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div style={styles.previewRow}>
      <span style={styles.previewLabel}>{label}</span>
      <span style={styles.previewValue}>{value}</span>
    </div>
  );
}

function SuccessScreen({ email }) {
  return (
    <div style={styles.successCard}>
      <div style={styles.successIcon}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 style={styles.successHeading}>On its way</h1>
      <p style={styles.successBody}>Your rate card has been sent to <strong style={{ color: "#F5E6C8" }}>{email}</strong>. Check your inbox — it should arrive within the next minute.</p>
      <p style={styles.successSub}>Not there? Check your spam folder and mark it as safe.</p>
      <div style={styles.successDivider} />
      <p style={styles.successNext}><strong>What to do next:</strong> Read your charge script before your next client call. The words are there — you just have to say them.</p>
      <a href="/" style={styles.successLink}>Back to Clarity Costs</a>
    </div>
  );
}

const styles = {
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
