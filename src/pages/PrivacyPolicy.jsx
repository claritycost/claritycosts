import PolicyLayout from './PolicyLayout'

export default function PrivacyPolicy() {
  return (
    <PolicyLayout tag="Legal" title="Privacy" highlight="Policy" subtitle="How we collect, use, and protect your personal data.">
      <p className="last-updated">Last updated: 1 January 2025</p>

      <h2>1. Who we are</h2>
      <p>Clarity Costs is a product of Hello Clarity Ltd, registered in England and Wales. Contact us at <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a>.</p>

      <h2>2. What data we collect</h2>
      <p>When you use Clarity Costs we may collect:</p>
      <ul>
        <li><strong>Email address</strong> — provided by you when you request your results</li>
        <li><strong>Questionnaire answers</strong> — specialty, experience, location, income target, and work preferences</li>
        <li><strong>Usage data</strong> — pages visited, time on site, browser type (with consent via analytics cookies)</li>
        <li><strong>Payment data</strong> — processed by our payment provider; we do not store card details</li>
      </ul>

      <h2>3. How we use your data</h2>
      <p>We use your data to deliver personalised results to your inbox, improve rate calculation accuracy using anonymised data, process payments, and respond to enquiries. We do not sell your data to any third party.</p>

      <h2>4. Legal basis for processing</h2>
      <p>Contract performance (delivering results), legitimate interests (improving the product), consent (analytics cookies), and legal obligation (financial records).</p>

      <h2>5. Data retention</h2>
      <p>We retain your email and results for up to 24 months. You can request deletion at any time by emailing us.</p>

      <h2>6. Who we share data with</h2>
      <p>We use trusted third-party services for email delivery, payment processing, analytics (with your consent), and AI processing. All third parties are bound by data processing agreements and comply with UK GDPR.</p>

      <h2>7. Your rights</h2>
      <p>Under UK GDPR you have the right to access, correct, delete, restrict, or port your data, and to withdraw consent for analytics. Email us at <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a> to exercise any right. You can also complain to the ICO at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>

      <h2>8. Cookies</h2>
      <p>See our <a href="/cookie-policy">Cookie Policy</a> for full details.</p>

      <h2>9. Changes to this policy</h2>
      <p>We may update this Privacy Policy from time to time. The "last updated" date above will reflect any changes.</p>

      <h2>10. Contact</h2>
      <p>For any privacy-related questions, contact us at <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a>.</p>
    </PolicyLayout>
  )
}
