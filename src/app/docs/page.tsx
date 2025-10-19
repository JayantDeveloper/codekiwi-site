/* eslint-disable */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Documentation — CodeKiwi",
  description: "Learn how to use CodeKiwi for interactive coding education",
};

export default function DocsPage() {
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
            <h1 className="text-4xl font-bold text-[#6b8f2b] mb-2">Documentation</h1>
            <p className="text-sm text-[#6b8f2b]/60">Everything you need to get started with CodeKiwi</p>
          </div>

          {/* Quick Start */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Quick Start Guide</h2>
            <p className="text-[#6b8f2b]/80 leading-relaxed mb-6">
              Get up and running with CodeKiwi in just a few minutes. Follow these simple steps to create your first interactive coding session.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="mb-10 rounded-lg bg-[#a8d05f]/10 p-6">
            <h2 className="text-lg font-semibold text-[#6b8f2b] mb-4">Contents</h2>
            <nav className="space-y-2">
              <a href="#getting-started" className="block text-[#6b8f2b] hover:underline text-sm">Getting Started</a>
              <a href="#creating-account" className="block text-[#6b8f2b] hover:underline text-sm">Creating an Account</a>
              <a href="#installing-addon" className="block text-[#6b8f2b] hover:underline text-sm">Installing the Add-On</a>
              <a href="#creating-session" className="block text-[#6b8f2b] hover:underline text-sm">Creating a Session</a>
              <a href="#launching-session" className="block text-[#6b8f2b] hover:underline text-sm">Launching a Session</a>
              <a href="#monitoring-students" className="block text-[#6b8f2b] hover:underline text-sm">Monitoring Students</a>
              <a href="#best-practices" className="block text-[#6b8f2b] hover:underline text-sm">Best Practices</a>
              <a href="#troubleshooting" className="block text-[#6b8f2b] hover:underline text-sm">Troubleshooting</a>
              <a href="#faq" className="block text-[#6b8f2b] hover:underline text-sm">FAQ</a>
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">
            <section id="getting-started">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Getting Started</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi is designed to make teaching coding simple and interactive. You'll need:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>A Google account (for signing in and accessing Google Slides)</li>
                <li>Google Slides presentations with your coding lessons</li>
                <li>Students with internet access and a modern web browser</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                That's it! No software installation, no complex setup—just sign in and start teaching.
              </p>
            </section>

            <section id="creating-account">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Creating an Account</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Sign Up with Google (Recommended)</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Go to <a href="/signup" className="text-[#6b8f2b] hover:underline">codekiwi.app/signup</a></li>
                <li>Click "Sign up with Google"</li>
                <li>Select your Google account</li>
                <li>Grant CodeKiwi permission to access your Google Slides</li>
                <li>You're ready to go!</li>
              </ol>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Sign Up with Email</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Go to <a href="/signup" className="text-[#6b8f2b] hover:underline">codekiwi.app/signup</a></li>
                <li>Fill in your name, email, and password</li>
                <li>Optionally add your school/institution</li>
                <li>Agree to the Terms and Privacy Policy</li>
                <li>Click "Create Account"</li>
              </ol>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                Note: You'll still need to connect your Google account later to access Google Slides.
              </p>
            </section>

            <section id="installing-addon">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Installing the CodeKiwi Add-On</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi works as a Google Slides Add-On that appears in a sidebar within your presentations.
              </p>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Installation Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Open any Google Slides presentation</li>
                <li>Go to <strong>Extensions</strong> in the top menu</li>
                <li>Click <strong>Add-ons → Get add-ons</strong></li>
                <li>Search for "CodeKiwi" in the Google Workspace Marketplace</li>
                <li>Click <strong>Install</strong> and grant the necessary permissions</li>
              </ol>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Accessing the Add-On</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                Once installed, you can access CodeKiwi in any presentation:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Open your Google Slides presentation</li>
                <li>Go to <strong>Extensions → CodeKiwi → Start Lesson</strong></li>
                <li>The CodeKiwi sidebar will appear on the right side of your presentation</li>
              </ol>

              <div className="rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Pro Tip:</strong> The add-on will remember your preferences and automatically appear when you open presentations you've used with CodeKiwi before.
                </p>
              </div>
            </section>

            <section id="creating-session">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Creating a Session</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Using the Sidebar</h3>
              <ol className="list-decimal list-inside space-y-3 text-[#6b8f2b]/80 mb-4">
                <li className="leading-relaxed">
                  <strong>Open Your Presentation:</strong> Open the Google Slides presentation you want to use for teaching
                </li>
                <li className="leading-relaxed">
                  <strong>Launch CodeKiwi:</strong> Go to Extensions → CodeKiwi → Start Lesson to open the sidebar
                </li>
                <li className="leading-relaxed">
                  <strong>Create Session:</strong> Click the "🚀 Start Lesson" button in the sidebar
                </li>
                <li className="leading-relaxed">
                  <strong>Session Created:</strong> CodeKiwi will generate a unique session linked to your current presentation
                </li>
              </ol>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Marking Interactive Slides</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                Use the "Slide Tools" section in the sidebar to mark specific slides as coding exercises:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Navigate to a slide you want to make interactive</li>
                <li>Click "Add Code Question" in the sidebar</li>
                <li>Students will see a code editor when they reach this slide</li>
              </ul>

              <div className="rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Note:</strong> You can mix regular presentation slides with interactive coding slides throughout your lesson.
                </p>
              </div>
            </section>

            <section id="launching-session">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Launching a Session</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Starting Your Session</h3>
              <ol className="list-decimal list-inside space-y-3 text-[#6b8f2b]/80 mb-4">
                <li className="leading-relaxed">
                  <strong>Open the Sidebar:</strong> Make sure the CodeKiwi sidebar is open (Extensions → CodeKiwi → Start Lesson)
                </li>
                <li className="leading-relaxed">
                  <strong>Click "Start Lesson":</strong> This activates the session and generates a unique PIN code
                </li>
                <li className="leading-relaxed">
                  <strong>Display the PIN:</strong> The PIN will appear in the sidebar—share it with your students via screen share, whiteboard, or chat
                </li>
                <li className="leading-relaxed">
                  <strong>Students Join:</strong> Students go to <a href="https://www.codekiwi.app" className="text-[#6b8f2b] hover:underline font-mono">codekiwi.app</a>, enter the PIN, and immediately see your slides with a code editor
                </li>
              </ol>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">How Students Join</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Students visit <a href="https://www.codekiwi.app" className="text-[#6b8f2b] hover:underline font-mono">codekiwi.app</a></li>
                <li>They enter the PIN code you provided</li>
                <li>They're instantly in the session—no account needed!</li>
              </ol>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">What Students See</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                When students join your session with the PIN, they see:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li><strong>Left side:</strong> Your Google Slides presentation, synced with your current slide</li>
                <li><strong>Right side:</strong> A live code editor where they can write and test code</li>
                <li><strong>Run button:</strong> To execute their code and see results</li>
              </ul>

              <div className="rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Note:</strong> As you advance slides in your presentation, students' views will automatically sync to follow along!
                </p>
              </div>
            </section>

            <section id="monitoring-students">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Monitoring Students</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                The CodeKiwi sidebar shows real-time information about your active session.
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">What You Can See</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Number of students currently connected</li>
                <li>Which students are actively coding</li>
                <li>Real-time view of student code (click on student names to see their work)</li>
                <li>Who needs help or is stuck</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Best Practices for Monitoring</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80">
                <li>Check in on students who haven't started coding</li>
                <li>Look for common errors across multiple students</li>
                <li>Celebrate students who solve problems correctly</li>
                <li>Use insights to adjust your teaching pace</li>
              </ul>
            </section>

            <section id="best-practices">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Best Practices</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Preparing Your Slides</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Keep slides simple and focused—one concept per slide</li>
                <li>Include code examples students can reference</li>
                <li>Add clear instructions for coding exercises</li>
                <li>Use visuals and diagrams to explain concepts</li>
                <li>Mark interactive slides with "Add Code Question" before the session starts</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">During the Session</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Give students time to code along—don't rush</li>
                <li>Pause frequently to check student progress in the sidebar</li>
                <li>Address common mistakes as a group</li>
                <li>Encourage students to experiment and test their code</li>
                <li>Keep the CodeKiwi sidebar visible so you can monitor participation</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Structuring Your Lesson</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80">
                <li><strong>Introduction (5-10 min):</strong> Explain the concept</li>
                <li><strong>Demonstration (10-15 min):</strong> Show examples in the slides</li>
                <li><strong>Practice (20-30 min):</strong> Let students code with your guidance</li>
                <li><strong>Review (5-10 min):</strong> Discuss solutions and common issues</li>
              </ul>
            </section>

            <section id="troubleshooting">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Troubleshooting</h2>
              
              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Common Issues</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Students can't access the session</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Verify you clicked "Start Lesson" in the sidebar</li>
                    <li>Check that students are entering the correct PIN</li>
                    <li>Make sure students are going to codekiwi.app (not a different URL)</li>
                    <li>Ensure students aren't using an outdated browser</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">The sidebar isn't showing</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Go to Extensions → CodeKiwi → Start Lesson</li>
                    <li>Make sure you installed the add-on from the Google Workspace Marketplace</li>
                    <li>Try closing and reopening your presentation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Slides aren't syncing with students</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Make sure the session is active (check the sidebar)</li>
                    <li>Verify students are connected (look at the student count)</li>
                    <li>Try refreshing the student view</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Code editor isn't working</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Refresh the page</li>
                    <li>Check internet connection</li>
                    <li>Try a different browser (Chrome or Firefox recommended)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Can't see student progress</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Make sure students have actually joined the session</li>
                    <li>Check that students are on an interactive slide (marked with "Add Code Question")</li>
                    <li>Refresh the sidebar</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Still having issues?</strong> Contact me at <a href="mailto:jaymaheshwari2603@gmail.com" className="text-[#6b8f2b] hover:underline">jaymaheshwari2603@gmail.com</a> for help.
                </p>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Do I need to install anything?</h4>
                  <p className="text-[#6b8f2b]/80">
                    You only need to install the CodeKiwi Add-On from the Google Workspace Marketplace. It integrates directly into Google Slides—no separate software needed!
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Do students need accounts?</h4>
                  <p className="text-[#6b8f2b]/80">
                    No! Students just need to visit codekiwi.app and enter the PIN you give them. They can join and start coding immediately without creating an account.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Is CodeKiwi free?</h4>
                  <p className="text-[#6b8f2b]/80">
                    Yes, CodeKiwi is currently free to use while in beta. Enjoy full access to all features at no cost.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">What programming languages are supported?</h4>
                  <p className="text-[#6b8f2b]/80">
                    Currently, CodeKiwi supports JavaScript, Python, and other popular languages. More language support is coming soon!
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Can I use CodeKiwi for remote teaching?</h4>
                  <p className="text-[#6b8f2b]/80">
                    Absolutely! CodeKiwi works great for both in-person and remote classes. Students just need internet access.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">How many students can join a session?</h4>
                  <p className="text-[#6b8f2b]/80">
                    There's no hard limit, but for the best experience, we recommend sessions with up to 50 students.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Is student code saved?</h4>
                  <p className="text-[#6b8f2b]/80">
                    Student code exists only during the active session for privacy. If you need to save student work, students can copy their code before leaving.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Can I reuse sessions?</h4>
                  <p className="text-[#6b8f2b]/80">
                    Yes! Open the same presentation again and start a new lesson through the sidebar. Each session gets a new PIN code.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">What browsers are supported?</h4>
                  <p className="text-[#6b8f2b]/80">
                    CodeKiwi works best on modern browsers like Chrome, Firefox, Safari, and Edge. Make sure you're using an updated version.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-[#d6c49f]/30">
            <h3 className="text-xl font-bold text-[#6b8f2b] mb-3">Need More Help?</h3>
            <p className="text-[#6b8f2b]/80 mb-4">
              Can't find what you're looking for? Have a question or suggestion?
            </p>
            <div className="rounded-lg bg-[#a8d05f]/10 p-6">
              <p className="text-[#6b8f2b] font-semibold mb-2">Get in Touch</p>
              <p className="text-[#6b8f2b]/80 mb-1">Email: <a href="mailto:jaymaheshwari2603@gmail.com" className="text-[#6b8f2b] hover:underline">jaymaheshwari2603@gmail.com</a></p>
              <p className="text-[#6b8f2b]/80 text-sm mt-3">I typically respond within 24-48 hours.</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
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