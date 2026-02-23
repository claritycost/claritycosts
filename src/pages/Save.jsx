import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "claritycosts_results";

export default function Save() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [rateCard, setRateCard] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRateCard(JSON.parse(stored));
      } else {
        // No data — send them back to start
        navigate("/start");
      }
    } catch {
      navigate("/start");
    }
  }, [navigate]);

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

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (!rateCard) return null;

  return (
    <div style={styles.page}>
      {/* Background texture */}
      <div style={styles.bgNoise} />

      <div style={styles.container}>
        {/* Logo */}
        <a href="/" style={styles.logo}>
          Clarity<span style={styles.logoAccent}>Costs</span>
        </a>

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
      {/* Preview strip */}
      <div style={styles.previewStrip}>
        <PreviewRow label="Day rate" value={rateCard.dayRate} />
        <PreviewRow label="Project rate" value={rateCard.projectRate} />
        <PreviewRow label="Retainer" value={rateCard.retainerRate} />
      </div>

      <div style={styles.cardBody}>
        <p style={styles.eyebrow}>Your rate card is ready</p>
        <h1 style={styles.heading}>
          Get it in your inbox
        </h1>
        <p style={styles.subheading}>
          We'll send you a clean, save-worthy email with your full rate card — day rate, project rate, retainer, positioning statement, and the exact words to use when a client asks your price.
        </p>

        <form onSubmit={onSubmit} style={styles.form} noValidate>
          <div style={styles.inputWrapper}>
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
          </div>

          {errorMsg && (
            <p style={styles.errorText}>{errorMsg}</p>
          )}

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(status === "loading" ? styles.buttonLoading : {}),
            }}
            disabled={status === "loading" || !email.trim()}
          >
            {status === "loading" ? (
              <span style={styles.spinner} />
            ) : (
              <>
                Email me my rate card
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 10 }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p style={styles.privacy}>
          No spam. No account. We store your email alongside your submission so we can improve the product.
        </p>
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

      <p style={styles.successBody}>
        Your rate card has been sent to <strong style={{ color: "#F5E6C8" }}>{email}</strong>.
        Check your inbox — it should arrive within the next minute.
      </p>

      <p style={styles.successSub}>
        Not there? Check your spam folder and mark it as safe so future emails land in your inbox.
      </p>

      <div style={styles.successDivider} />

      <p style={styles.successNext}>
        <strong>What to do next:</strong> Read your charge script before your next client call. The words are there — you just have to say them.
      </p>

      <a href="/" style={styles.successLink}>
        Back to Clarity Costs
      </a>
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0F0E0C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  bgNoise: {
    position: "fixed",
    inset: 0,
    background: `
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(245,230,200,0.04) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 90%, rgba(245,230,200,0.03) 0%, transparent 60%)
    `,
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    width: "100%",
    maxWidth: 520,
    position: "relative",
    zIndex: 1,
  },
  logo: {
    display: "block",
    textAlign: "center",
    marginBottom: 36,
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    color: "#F5F0E8",
    textDecoration: "none",
  },
  logoAccent: {
    color: "#F5E6C8",
  },

  // Capture card
  card: {
    background: "#1A1916",
    border: "1px solid rgba(245,230,200,0.12)",
    borderRadius: 16,
    overflow: "hidden",
  },
  previewStrip: {
    background: "rgba(245,230,200,0.05)",
    borderBottom: "1px solid rgba(245,230,200,0.1)",
    padding: "20px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  previewRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewLabel: {
    fontSize: 13,
    color: "rgba(245,240,232,0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 500,
  },
  previewValue: {
    fontSize: 15,
    fontWeight: 600,
    color: "#F5E6C8",
    letterSpacing: "-0.2px",
  },
  cardBody: {
    padding: "36px 28px 32px",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 600,
    color: "#C8A96E",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 12,
    margin: "0 0 12px 0",
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    color: "#F5F0E8",
    letterSpacing: "-0.8px",
    lineHeight: 1.15,
    margin: "0 0 14px 0",
  },
  subheading: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "rgba(245,240,232,0.6)",
    margin: "0 0 28px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    background: "rgba(245,230,200,0.06)",
    border: "1px solid rgba(245,230,200,0.18)",
    borderRadius: 10,
    color: "#F5F0E8",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 24px",
    fontSize: 16,
    fontWeight: 600,
    background: "#F5E6C8",
    color: "#0F0E0C",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.15s",
    fontFamily: "inherit",
    letterSpacing: "-0.2px",
  },
  buttonLoading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  spinner: {
    display: "inline-block",
    width: 18,
    height: 18,
    border: "2px solid rgba(15,14,12,0.3)",
    borderTopColor: "#0F0E0C",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  errorText: {
    fontSize: 14,
    color: "#E87060",
    margin: 0,
  },
  privacy: {
    fontSize: 12,
    color: "rgba(245,240,232,0.3)",
    marginTop: 16,
    lineHeight: 1.6,
    margin: "16px 0 0 0",
  },

  // Success card
  successCard: {
    background: "#1A1916",
    border: "1px solid rgba(245,230,200,0.12)",
    borderRadius: 16,
    padding: "48px 32px",
    textAlign: "center",
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "rgba(200,169,110,0.15)",
    border: "1.5px solid rgba(200,169,110,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 28px",
    color: "#C8A96E",
  },
  successHeading: {
    fontSize: 32,
    fontWeight: 700,
    color: "#F5F0E8",
    letterSpacing: "-1px",
    margin: "0 0 16px 0",
  },
  successBody: {
    fontSize: 16,
    lineHeight: 1.65,
    color: "rgba(245,240,232,0.7)",
    margin: "0 0 12px 0",
  },
  successSub: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "rgba(245,240,232,0.35)",
    margin: "0 0 28px 0",
  },
  successDivider: {
    height: 1,
    background: "rgba(245,230,200,0.1)",
    margin: "0 0 24px 0",
  },
  successNext: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "rgba(245,240,232,0.65)",
    margin: "0 0 28px 0",
  },
  successLink: {
    display: "inline-block",
    fontSize: 14,
    color: "#C8A96E",
    textDecoration: "none",
    borderBottom: "1px solid rgba(200,169,110,0.4)",
    paddingBottom: 2,
  },
};
