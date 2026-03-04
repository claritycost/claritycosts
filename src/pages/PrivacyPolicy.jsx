import PolicyLayout from './PolicyLayout'

export default function PrivacyPolicy() {
  return (
    <PolicyLayout tag="Legal" title="Privacy" highlight="Policy" subtitle="How we collect, use, and protect your personal data.">
      <p className="last-updated">Last updated: 1 January 2025</p>
      <h2>1. Who we are</h2>
      <p>Clarity Costs is a product of Hello Clarity Ltd, registered in England and Wales. Contact us at <a href="mailto:contactus@claritycosts.co.uk">contactus@claritycosts.co.uk</a>.</p>
      <h2>2. What data we collect</h2>
      <ul>
        <li><strong>Email address</strong> — provided when you request your results</li>
        <li><strong>Questionnaire answers</strong> — specialty, experience, location, income target, and work preferences</li>
        <li><strong>Usage data</strong> — pages visited, time on site, browser type (with analytics cookie consent)</li>
        <li><strong>Payment data</strong> — processed by Stripe; we never store card details</li>
      </ul>
      <h2>3. How we use your data</h2>
      <p>To deliver personalised results, improve rate accuracy using anonymised data, process payments, and respond to enquiries. We never sell your data.</p>
      <h2>4. Legal basis</h2>
      <p>Contract performance (delivering results), legitimate interests (improving the product), consent (analytics cookies), and legal obligation (financial records).</p>
      <h2>5. Data retention</h2>
      <p>Up to 24 months. Request deletion any time by emailing us.</p>
      <h2>6. Your rights</h2>
      <p>Under UK GDPR you have the right to access, correct, delete, restrict, or port your data. Email <a href="mailto:privacy@claritycosts.co.uk">privacy@claritycosts.co.uk</a> or complain to the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ICO</a>.</p>
      <h2>7. Cookies</h2>
      <p>See our <a href="/cookie-policy">Cookie Policy</a> for full details.</p>
      <h2>8. Contact</h2>
      <p><a href="mailto:contactus@claritycosts.co.uk">contactus@claritycosts.co.uk</a></p>
    </PolicyLayout>
  )
}
