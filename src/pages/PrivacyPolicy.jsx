import PolicyLayout from './PolicyLayout'

export default function PrivacyPolicy() {
  return (
    <PolicyLayout tag="Legal" title="Privacy" highlight="Policy" subtitle="How we collect, use, and protect your personal data.">
      <p className="last-updated">Last updated: 1 January 2025</p>
      <h2>1. Who we are</h2>
      <p>Clarity Costs is a product of Hello Clarity Ltd, registered in England and Wales. Contact us at <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a>.</p>
      <h2>2. What data we collect</h2>
      <p>Your email address, questionnaire answers, usage data (with consent), and payment data processed by our payment provider.</p>
      <h2>3. How we use your data</h2>
      <p>To deliver your results, improve rate accuracy using anonymised data, process payments, and respond to enquiries. We never sell your data.</p>
      <h2>4. Legal basis</h2>
      <p>Contract performance, legitimate interests, consent (analytics), and legal obligation.</p>
      <h2>5. Data retention</h2>
      <p>Up to 24 months. Request deletion any time by emailing us.</p>
      <h2>6. Your rights</h2>
      <p>Under UK GDPR you have the right to access, correct, delete, or port your data. Email <a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a> or complain to the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ICO</a>.</p>
      <h2>7. Cookies</h2>
      <p>See our <a href="/cookie-policy">Cookie Policy</a>.</p>
      <h2>8. Contact</h2>
      <p><a href="mailto:hello@claritycosts.co.uk">hello@claritycosts.co.uk</a></p>
    </PolicyLayout>
  )
}
