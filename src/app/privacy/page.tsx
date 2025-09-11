import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CodeKiwi",
  description: "Privacy Policy for CodeKiwi",
};

export default function PrivacyPage() {
  return (
    <main className="prose mx-auto p-6">
      <h1 id="overview">Privacy Policy</h1>
      <p>Last updated: September 1, 2025</p>

      <h2 id="data-collection">1. Data We Collect</h2>
      <ul>
        <li>Account info (name, email from Google)</li>
        <li>Usage data (pages, features)</li>
        <li>Log data (IP, user agent)</li>
      </ul>

      <h2 id="data-usage">2. How We Use Data</h2>
      <ul>
        <li>Provide and secure the service</li>
        <li>Improve CodeKiwi features</li>
        <li>Communicate updates</li>
      </ul>

      <h2 id="cookies">3. Cookies & Analytics</h2>
      <p>…</p>

      <h2 id="sharing">4. Sharing</h2>
      <p>We don’t sell personal data. We may share with processors under DPAs.</p>

      <h2 id="security">5. Security</h2>
      <p>…</p>

      <h2 id="retention">6. Retention</h2>
      <p>…</p>

      <h2 id="rights">7. Your Rights</h2>
      <p>…</p>

      <h2 id="contact">8. Contact</h2>
      <p>Email: privacy@codekiwi.tech</p>
    </main>
  );
}
