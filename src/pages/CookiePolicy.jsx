import PolicyLayout from './PolicyLayout.jsx'

export default function CookiePolicy() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="1 March 2026">
      <p>This Cookie Policy explains how Clarity Costs (Hello Clarity Ltd) uses cookies on <strong>claritycosts.co.uk</strong>. Essential cookies are always active. Optional analytics cookies are only set with your consent via the banner when you first visit.</p>

      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help the site work properly, remember preferences, and — where you consent — help us understand usage patterns.</p>

      <h2>Cookies we use</h2>

      <h3>Essential cookies (always active)</h3>
      <table>
        <thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td>cc_cookie_consent</td><td>Remembers your cookie consent choice so we don't ask on every visit</td><td>12 months</td></tr>
          <tr><td>Session storage<br/>(cc_answers, rateCardData, userEmail)</td><td>Temporarily stores your questionnaire answers and rate card during your session. Cleared when you close your browser tab.</td><td>Session only</td></tr>
        </tbody>
      </table>

      <h3>Analytics cookies (optional — only with your consent)</h3>
      <table>
        <thead><tr><th>Cookie</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td>_ga, _ga_*</td><td>Google Analytics</td><td>Tracks page views and user behaviour in aggregate. Data is anonymised.</td><td>2 years</td></tr>
        </tbody>
      </table>

      <h3>Payment cookies (Stripe)</h3>
      <p>When you proceed to Stripe Checkout, Stripe sets its own cookies for fraud prevention and session management. These are governed by <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer">Stripe's Privacy Policy</a>.</p>

      <h2>Managing your preferences</h2>
      <p>You can change your cookie preferences at any time by clearing your browser cookies and reloading the page — the consent banner will reappear. You can also use your browser settings to block or delete cookies. Note: blocking essential cookies may break parts of the site.</p>
      <p>Browser guides:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. Changes will be posted here with a revised date.</p>

      <h2>Contact</h2>
      <p>Questions about cookies? <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a> — or see our <a href="/privacy">Privacy Policy</a>.</p>
    </PolicyLayout>
  )
}
