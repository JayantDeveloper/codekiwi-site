/* eslint-disable */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service — CodeKiwi",
  description: "Terms of Service for CodeKiwi",
};

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-[#6b8f2b] mb-2">Terms of Service</h1>
            <p className="text-sm text-[#6b8f2b]/60">Last updated: October 19, 2024</p>
          </div>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-[#6b8f2b]/80 leading-relaxed">
              Welcome to CodeKiwi! These Terms of Service govern your use of the CodeKiwi platform. By accessing or using CodeKiwi, you agree to be bound by these terms. If you don't agree, please don't use the service.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="mb-10 rounded-lg bg-[#a8d05f]/10 p-6">
            <h2 className="text-lg font-semibold text-[#6b8f2b] mb-4">Table of Contents</h2>
            <nav className="space-y-2">
              <a href="#service-description" className="block text-[#6b8f2b] hover:underline text-sm">1. Service Description</a>
              <a href="#accounts" className="block text-[#6b8f2b] hover:underline text-sm">2. User Accounts</a>
              <a href="#acceptable-use" className="block text-[#6b8f2b] hover:underline text-sm">3. Acceptable Use</a>
              <a href="#user-content" className="block text-[#6b8f2b] hover:underline text-sm">4. Your Content</a>
              <a href="#google-services" className="block text-[#6b8f2b] hover:underline text-sm">5. Google Services Integration</a>
              <a href="#intellectual-property" className="block text-[#6b8f2b] hover:underline text-sm">6. Intellectual Property</a>
              <a href="#disclaimers" className="block text-[#6b8f2b] hover:underline text-sm">7. Disclaimers and Limitations</a>
              <a href="#termination" className="block text-[#6b8f2b] hover:underline text-sm">8. Termination</a>
              <a href="#changes" className="block text-[#6b8f2b] hover:underline text-sm">9. Changes to Terms</a>
              <a href="#contact" className="block text-[#6b8f2b] hover:underline text-sm">10. Contact</a>
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            <section id="service-description">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">1. Service Description</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi is an educational platform that allows teachers and educators to create interactive coding sessions by connecting Google Slides presentations with a live code editor. The service enables:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80">
                <li>Creating and launching teaching sessions with Google Slides</li>
                <li>Providing students with a synchronized view of slides and code editor</li>
                <li>Real-time monitoring of student progress during coding sessions</li>
                <li>Managing multiple sessions and classes</li>
              </ul>
            </section>

            <section id="accounts">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">2. User Accounts</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Account Creation</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                To use CodeKiwi, you must create an account by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Signing in with Google, or</li>
                <li>Registering with an email address and password</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Account Responsibility</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying me immediately of any unauthorized access</li>
                <li>Providing accurate and current information</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Educational Use</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                CodeKiwi is intended for educational purposes. If you're a teacher using CodeKiwi with students under 13, you are responsible for obtaining any necessary parental consent as required by applicable law (such as COPPA in the United States).
              </p>
            </section>

            <section id="acceptable-use">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">3. Acceptable Use</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                You agree not to use CodeKiwi to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Violate any laws or regulations</li>
                <li>Infringe on others' intellectual property rights</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate others or misrepresent your affiliation</li>
                <li>Attempt to gain unauthorized access to the platform or other users' accounts</li>
                <li>Interfere with or disrupt the service</li>
                <li>Use automated tools to access the service without permission</li>
                <li>Share inappropriate or offensive content with students</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                Violation of these terms may result in suspension or termination of your account.
              </p>
            </section>

            <section id="user-content">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">4. Your Content</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Ownership</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                You retain all rights to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Your Google Slides presentations</li>
                <li>Content you create in sessions</li>
                <li>Student work created during sessions</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">License to Operate</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                By using CodeKiwi, you grant the platform a limited license to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Access and display your Google Slides during sessions</li>
                <li>Store session data necessary to provide the service</li>
                <li>Transmit student code in real-time during active sessions</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                This license ends when you delete your content or close your account.
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Responsibility</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                You are responsible for ensuring you have the right to use and share any content you upload or connect to CodeKiwi, including compliance with copyright and licensing requirements.
              </p>
            </section>

            <section id="google-services">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">5. Google Services Integration</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi integrates with Google services (Google Drive, Google Slides) to provide its functionality. By using CodeKiwi:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>You authorize CodeKiwi to access your Google Slides and Drive as needed for the service</li>
                <li>You agree to Google's Terms of Service and Privacy Policy</li>
                <li>You can revoke these permissions at any time through your Google Account settings</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                CodeKiwi is not affiliated with or endorsed by Google. Your use of Google services through CodeKiwi is subject to Google's terms.
              </p>
            </section>

            <section id="intellectual-property">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">6. Intellectual Property</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">CodeKiwi Platform</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                The CodeKiwi platform, including its design, code, features, and branding, is owned by Jay Maheshwari and protected by copyright and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Copy, modify, or create derivative works of the platform</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Remove or alter any copyright notices or branding</li>
                <li>Use the CodeKiwi name or logo without permission</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Feedback</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                If you provide feedback, suggestions, or ideas about CodeKiwi, you grant me the right to use them without any obligation or compensation to you.
              </p>
            </section>

            <section id="disclaimers">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">7. Disclaimers and Limitations</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Service Availability</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi is provided "as is" and "as available." I strive to keep the service running smoothly, but:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>The service may be temporarily unavailable due to maintenance, updates, or technical issues</li>
                <li>I don't guarantee uninterrupted or error-free operation</li>
                <li>Features may change or be discontinued</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">No Warranties</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                To the extent permitted by law, I make no warranties about:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>The accuracy, reliability, or completeness of the service</li>
                <li>Whether CodeKiwi will meet your specific needs</li>
                <li>The results you may obtain from using the service</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Limitation of Liability</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                To the maximum extent permitted by law, I am not liable for any indirect, incidental, special, or consequential damages arising from your use of CodeKiwi. This includes loss of data, loss of profits, or any other damages, even if I've been advised of the possibility.
              </p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">8. Termination</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">By You</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                You can stop using CodeKiwi at any time. To delete your account and data, contact me at jaymaheshwari2603@gmail.com.
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">By CodeKiwi</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                I may suspend or terminate your account if:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>You violate these Terms of Service</li>
                <li>You engage in fraudulent or illegal activity</li>
                <li>Your account has been inactive for an extended period</li>
                <li>I need to comply with legal requirements</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                I'll try to provide reasonable notice before terminating your account, unless it's necessary to terminate immediately for legal or security reasons.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">9. Changes to Terms</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                I may update these Terms of Service as CodeKiwi evolves. When I do:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>I'll update the "Last updated" date at the top</li>
                <li>For material changes, I'll try to notify you via email or through the platform</li>
                <li>Your continued use of CodeKiwi after changes means you accept the new terms</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                If you don't agree with the changes, please stop using the service.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">10. Contact</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact:
              </p>
              <div className="rounded-lg bg-[#a8d05f]/10 p-6">
                <p className="text-[#6b8f2b] font-semibold mb-2">Jay Maheshwari</p>
                <p className="text-[#6b8f2b]/80 mb-1">Email: <a href="mailto:jaymaheshwari2603@gmail.com" className="text-[#6b8f2b] hover:underline">jaymaheshwari2603@gmail.com</a></p>
                <p className="text-[#6b8f2b]/80 text-sm mt-3">Creator and maintainer of CodeKiwi</p>
              </div>
            </section>

            {/* Additional Legal Info */}
            <section className="border-t border-[#d6c49f]/30 pt-8">
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3">General Legal Terms</h3>
              <div className="space-y-4 text-[#6b8f2b]/80 text-sm">
                <p>
                  <strong>Governing Law:</strong> These terms are governed by the laws of the State of Maryland, United States, without regard to conflict of law principles.
                </p>
                <p>
                  <strong>Entire Agreement:</strong> These Terms of Service, together with the Privacy Policy, constitute the entire agreement between you and CodeKiwi.
                </p>
                <p>
                  <strong>Severability:</strong> If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force.
                </p>
                <p>
                  <strong>No Waiver:</strong> Failure to enforce any right or provision of these terms does not constitute a waiver of that right or provision.
                </p>
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