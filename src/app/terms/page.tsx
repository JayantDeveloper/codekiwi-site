import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — CodeKiwi",
  description: "Terms of Service for CodeKiwi",
};

export default function TermsPage() {
  return (
    <main className="prose mx-auto p-6">
      <h1 id="introduction">Terms of Service</h1>
      <p>Last updated: September 1, 2025</p>

      <h2 id="account">1. Accounts</h2>
      <p>…</p>

      <h2 id="acceptable-use">2. Acceptable Use</h2>
      <p>…</p>

      <h2 id="payments">3. Payments & Subscriptions</h2>
      <p>…</p>

      <h2 id="ip">4. Intellectual Property</h2>
      <p>…</p>

      <h2 id="termination">5. Termination</h2>
      <p>…</p>

      <h2 id="disclaimers">6. Disclaimers</h2>
      <p>…</p>

      <h2 id="contact">7. Contact</h2>
      <p>Email: support@codekiwi.tech</p>
    </main>
  );
}
