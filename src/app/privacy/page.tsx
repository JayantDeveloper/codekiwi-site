/* eslint-disable */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy — CodeKiwi",
  description: "Privacy Policy for CodeKiwi - Learn how we protect your data",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8faf5]">
      {/* Header */}
      <header className="border-b border-[#d6c49f]/30 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <Image 
              src="https://www.codekiwi.app/codekiwilogo.png" 
              alt="CodeKiwi Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#d6c49f]/30 bg-white p-8 shadow-lg sm:p-12">
          {/* Title */}
          <div className="mb-8 border-b border-[#d6c49f]/30 pb-6">
            <h1 className="text-4xl font-bold text-[#6b8f2b] mb-2">Privacy Policy</h1>
            <p className="text-sm text-[#6b8f2b]/60">Last updated: October 19, 2024</p>
          </div>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-[#6b8f2b]/80 leading-relaxed">
              At CodeKiwi, I am committed to protecting your privacy. This Privacy Policy explains how CodeKiwi collects, uses, and safeguards your data when you use the platform to create interactive coding sessions with Google Slides.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="mb-10 rounded-lg bg-[#a8d05f]/10 p-6">
            <h2 className="text-lg font-semibold text-[#6b8f2b] mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#data-collection" className="block text-[#6b8f2b] hover:underline text-sm">1. Information We Collect</a>
              <a href="#data-usage" className="block text-[#6b8f2b] hover:underline text-sm">2. How We Use Your Information</a>
              <a href="#data-sharing" className="block text-[#6b8f2b] hover:underline text-sm">3. Information Sharing</a>
              <a href="#google-services" className="block text-[#6b8f2b] hover:underline text-sm">4. Google Services Integration</a>
              <a href="#security" className="block text-[#6b8f2b] hover:underline text-sm">5. Data Security</a>
              <a href="#retention" className="block text-[#6b8f2b] hover:underline text-sm">6. Data Retention</a>
              <a href="#rights" className="block text-[#6b8f2b] hover:underline text-sm">7. Your Rights</a>
              <a href="#changes" className="block text-[#6b8f2b] hover:underline text-sm">8. Changes to This Policy</a>
              <a href="#contact" className="block text-[#6b8f2b] hover:underline text-sm">9. Contact</a>
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            <section id="data-collection">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">1. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Account Information</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                When you create a CodeKiwi account, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Name and email address (via Google Sign-In or direct registration)</li>
                <li>Hashed password (if you register with email/password)</li>
                <li>School or institution name (optional)</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Usage Information</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                We automatically collect basic usage information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Sessions you create and launch</li>
                <li>Pages you visit within CodeKiwi</li>
                <li>Device and browser information</li>
                <li>IP address and access times (stored in logs)</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Session Data</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                When you use CodeKiwi for teaching sessions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80">
                <li>Links to Google Slides presentations you connect</li>
                <li>Student join data (anonymous unless students provide names)</li>
                <li>Code written by students during sessions (temporary, stored only during active sessions)</li>
              </ul>
            </section>

            <section id="data-usage">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">2. How We Use Your Information</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                I use the information collected to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80">
                <li>Provide the core service: create and manage interactive coding sessions</li>
                <li>Authenticate users and maintain account security</li>
                <li>Connect to your Google Slides presentations</li>
                <li>Improve the platform based on usage patterns</li>
                <li>Send important updates about your account or the service</li>
                <li>Troubleshoot technical issues</li>
              </ul>
            </section>

            <section id="data-sharing">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">3. Information Sharing</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                <strong>I do not sell your personal information.</strong> Your data is shared only in these specific cases:
              </p>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Service Providers</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi uses the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li><strong>Vercel:</strong> Hosts the web application</li>
                <li><strong>PostgreSQL database:</strong> Stores your account and session data</li>
                <li><strong>Google OAuth:</strong> Handles authentication when you sign in with Google</li>
                <li><strong>Google Drive API:</strong> Accesses slides you explicitly connect to sessions</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Legal Requirements</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                I may disclose information if required by law, such as in response to a valid court order or to protect the rights and safety of users.
              </p>
            </section>

            <section id="google-services">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">4. Google Services Integration</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                When you connect your Google account to CodeKiwi:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>You grant CodeKiwi permission to access your Google Slides and Google Drive</li>
                <li>CodeKiwi can read presentations you choose to use in sessions</li>
                <li>CodeKiwi can create copies of template presentations in your Drive (when you create new sessions)</li>
                <li>You can revoke these permissions at any time via your Google Account settings</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                CodeKiwi's use of information received from Google APIs adheres to <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-[#6b8f2b] hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
            </section>

            <section id="security">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">5. Data Security</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi implements security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>All data transmitted between your browser and CodeKiwi is encrypted using HTTPS/TLS</li>
                <li>Passwords are hashed using industry-standard bcrypt</li>
                <li>Google OAuth tokens are stored securely and used only for authorized operations</li>
                <li>Database access is restricted and secured</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                While I take reasonable precautions, no system is 100% secure. Please use a strong password and keep your account credentials safe.
              </p>
            </section>

            <section id="retention">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">6. Data Retention</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi retains your data as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li><strong>Account data:</strong> Retained while your account is active</li>
                <li><strong>Session data:</strong> Stored as long as you keep the session</li>
                <li><strong>Student code during sessions:</strong> Temporary - only exists during active sessions and is not permanently stored</li>
                <li><strong>Server logs:</strong> Retained for up to 90 days for troubleshooting</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                You can request deletion of your account and associated data by contacting me at jaymaheshwari2603@gmail.com.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">7. Your Rights</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li><strong>Access:</strong> Request a copy of your data</li>
                <li><strong>Correction:</strong> Update incorrect information in your account settings</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Request an export of your data</li>
                <li><strong>Revoke permissions:</strong> Disconnect Google access at any time through your Google Account settings</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                To exercise these rights, contact me at jaymaheshwari2603@gmail.com.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">8. Changes to This Policy</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                I may update this Privacy Policy as CodeKiwi evolves. Any changes will be posted on this page with an updated "Last updated" date. Continued use of CodeKiwi after changes indicates your acceptance of the updated policy.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">9. Contact</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or how your data is handled, please contact:
              </p>
              <div className="rounded-lg bg-[#a8d05f]/10 p-6">
                <p className="text-[#6b8f2b] font-semibold mb-2">Jay Maheshwari</p>
                <p className="text-[#6b8f2b]/80 mb-1">Email: <a href="mailto:jaymaheshwari2603@gmail.com" className="text-[#6b8f2b] hover:underline">jaymaheshwari2603@gmail.com</a></p>
                <p className="text-[#6b8f2b]/80 text-sm mt-3">Creator and maintainer of CodeKiwi</p>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-[#d6c49f]/30 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-[#6b8f2b] hover:text-[#6b8f2b]/80 font-medium hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d6c49f]/30 py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#6b8f2b]">CodeKiwi</span>
              <Image 
                src="https://www.codekiwi.app/codekiwilogo.png" 
                alt="CodeKiwi Logo" 
                width={28} 
                height={28}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-[#6b8f2b]/70">
              © 2024 CodeKiwi. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">
                Privacy
              </Link>
              <Link href="mailto:jaymaheshwari2603@gmail.com" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}