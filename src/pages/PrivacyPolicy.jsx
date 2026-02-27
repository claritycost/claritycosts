import PolicyLayout from './PolicyLayout.jsx'

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="1 March 2026">
      <h2>Who we are</h2>
      <p>Clarity Costs is operated by Hello Clarity Ltd, registered in England and Wales. We run the rate calculator at <strong>claritycosts.co.uk</strong>. Questions? <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a></p>

      <h2>What information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li><strong>Email address</strong> — collected when you submit the questionnaire or purchase the full report.</li>
        <li><strong>Questionnaire answers</strong> — discipline, experience, location, income target, and similar. Used to generate your rate card. We do not collect your name.</li>
        <li><strong>Payment information</strong> — processed by Stripe. We never see or store your card details.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Usage data</strong> — pages visited, time spent, device type, browser. Collected via analytics cookies only if you accept them.</li>
        <li><strong>IP address</strong> — collected by our hosting provider (Vercel) for security and performance.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To generate and deliver your personalised rate card by email.</li>
        <li>To process payments for the full report via Stripe.</li>
        <li>To send the full PDF report and guides you have purchased.</li>
        <li>To improve the calculator based on aggregated, anonymised usage data.</li>
        <li>To send occasional product updates — only if you have explicitly opted in.</li>
      </ul>

      <h2>Legal basis for processing (UK GDPR)</h2>
      <ul>
        <li><strong>Contract performance</strong> — processing your answers to deliver your rate card.</li>
        <li><strong>Legitimate interests</strong> — analytics to improve the product; fraud prevention.</li>
        <li><strong>Consent</strong> — optional analytics cookies and any marketing emails.</li>
      </ul>

      <h2>Who we share your data with</h2>
      <p>We only share data with processors who help us deliver the service:</p>
      <ul>
        <li><strong>Supabase</strong> — database storage (servers in the EU).</li>
        <li><strong>OpenAI</strong> — anonymised answers sent via API to generate rate recommendations. OpenAI does not use API data for training by default.</li>
        <li><strong>Stripe</strong> — payment processing. Subject to Stripe's own privacy policy.</li>
        <li><strong>Resend</strong> — email delivery.</li>
        <li><strong>Vercel</strong> — website hosting.</li>
      </ul>
      <p>We do not sell, rent, or trade your personal data with any third parties for marketing purposes.</p>

      <h2>How long we keep your data</h2>
      <ul>
        <li>Questionnaire responses and rate cards: up to 2 years.</li>
        <li>Email addresses: until you unsubscribe or request deletion.</li>
        <li>Payment records: 7 years (UK tax law requirement).</li>
      </ul>

      <h2>Your rights under UK GDPR</h2>
      <p>You have the right to access, rectify, erase, restrict, or port your data, and to object to processing. To exercise any right, email <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a>. We will respond within 30 days. You may also complain to the ICO at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>

      <h2>Cookies</h2>
      <p>We use essential cookies to keep the site working and, where you consent, optional analytics cookies. See our <a href="/cookie-policy">Cookie Policy</a> for full details.</p>

      <h2>Security</h2>
      <p>We use HTTPS encryption, access controls, and reputable third-party processors. If you suspect a security issue, contact <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a> immediately.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. Changes will be posted here with a revised date. For significant changes we will notify users by email where possible.</p>

      <h2>Contact</h2>
      <p><a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a></p>
    </PolicyLayout>
  )
}
