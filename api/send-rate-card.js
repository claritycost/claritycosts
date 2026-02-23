import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, rateCard } = req.body;

  if (!email || !rateCard) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const {
    dayRate,
    projectRate,
    retainerRate,
    positioningStatement,
    chargeScript,
    submissionId,
  } = rateCard;

  // ─── Send email via Resend ───────────────────────────────────────────────
  try {
    await resend.emails.send({
      from: "Clarity Costs <hello@claritycosts.co.uk>",
      to: email,
      subject: "Your rate card — keep this somewhere safe",
      html: buildEmailHTML({
        dayRate,
        projectRate,
        retainerRate,
        positioningStatement,
        chargeScript,
      }),
    });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }

  // ─── Store email in Supabase ─────────────────────────────────────────────
  try {
    if (submissionId) {
      // Update existing submission row with email
      await supabase
        .from("submissions")
        .update({ email, email_sent_at: new Date().toISOString() })
        .eq("id", submissionId);
    } else {
      // Fallback: insert a minimal record
      await supabase
        .from("submissions")
        .insert({ email, rate_card: rateCard, email_sent_at: new Date().toISOString() });
    }
  } catch (err) {
    // Non-fatal — email was already sent
    console.error("Supabase error:", err);
  }

  return res.status(200).json({ success: true });
}

// ─── Email HTML Builder ──────────────────────────────────────────────────────

function buildEmailHTML({ dayRate, projectRate, retainerRate, positioningStatement, chargeScript }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Rate Card — Clarity Costs</title>
</head>
<body style="margin:0;padding:0;background-color:#0F0E0C;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;color:#0F0E0C;">
    Your personalised rates, positioning, and the words to use when a client asks your price.
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F0E0C;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:36px;">
              <span style="font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#F5F0E8;">
                Clarity<span style="color:#F5E6C8;">Costs</span>
              </span>
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td style="background-color:#1A1916;border:1px solid rgba(245,230,200,0.12);border-radius:16px;overflow:hidden;">

              <!-- Card header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:rgba(245,230,200,0.05);border-bottom:1px solid rgba(245,230,200,0.1);padding:24px 32px;">
                    <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#C8A96E;">
                      Your Rate Card
                    </p>
                    <p style="margin:0;font-size:22px;font-weight:700;color:#F5F0E8;letter-spacing:-0.5px;">
                      What you should charge
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Rate rows -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:0 32px;">

                <!-- Day rate -->
                <tr>
                  <td style="padding:20px 0;border-bottom:1px solid rgba(245,230,200,0.08);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(245,240,232,0.4);">Day Rate</p>
                          <p style="margin:0;font-size:28px;font-weight:700;color:#F5E6C8;letter-spacing:-0.8px;">${dayRate || "—"}</p>
                        </td>
                        <td align="right" valign="middle">
                          <span style="font-size:12px;color:rgba(245,240,232,0.3);white-space:nowrap;">per day</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Project rate -->
                <tr>
                  <td style="padding:20px 0;border-bottom:1px solid rgba(245,230,200,0.08);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(245,240,232,0.4);">Project Rate</p>
                          <p style="margin:0;font-size:28px;font-weight:700;color:#F5F0E8;letter-spacing:-0.8px;">${projectRate || "—"}</p>
                        </td>
                        <td align="right" valign="middle">
                          <span style="font-size:12px;color:rgba(245,240,232,0.3);white-space:nowrap;">per project</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Retainer -->
                <tr>
                  <td style="padding:20px 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(245,240,232,0.4);">Monthly Retainer</p>
                          <p style="margin:0;font-size:28px;font-weight:700;color:#F5F0E8;letter-spacing:-0.8px;">${retainerRate || "—"}</p>
                        </td>
                        <td align="right" valign="middle">
                          <span style="font-size:12px;color:rgba(245,240,232,0.3);white-space:nowrap;">per month</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 32px;">
                    <div style="height:1px;background-color:rgba(245,230,200,0.1);"></div>
                  </td>
                </tr>
              </table>

              <!-- Positioning statement -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 32px 0;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#C8A96E;">
                      Your Positioning Statement
                    </p>
                    <p style="margin:0;font-size:16px;line-height:1.65;color:#F5F0E8;font-style:italic;">
                      "${positioningStatement || "—"}"
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Charge script -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 32px 32px;">
                <tr>
                  <td style="background-color:rgba(245,230,200,0.04);border:1px solid rgba(245,230,200,0.1);border-radius:10px;padding:20px 22px;">
                    <p style="margin:0 0 10px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(245,240,232,0.5);">
                      When they ask your rate — say this
                    </p>
                    <p style="margin:0;font-size:15px;line-height:1.7;color:rgba(245,240,232,0.85);">
                      ${chargeScript || "—"}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer nudge -->
          <tr>
            <td style="padding:28px 0 0 0;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:14px;color:rgba(245,240,232,0.5);">
                Bookmark this email. Refer to it before every new client conversation.
              </p>
              <p style="margin:0;font-size:13px;color:rgba(245,240,232,0.25);">
                © Clarity Costs · <a href="https://claritycosts.co.uk" style="color:rgba(245,240,232,0.25);text-decoration:underline;">claritycosts.co.uk</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}
