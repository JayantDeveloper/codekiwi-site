/* eslint-disable */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Presentation, Code2, Users, Zap, Eye, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — CodeKiwi",
  description: "Discover CodeKiwi's features for interactive coding education",
};

export default function FeaturesPage() {
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
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-[#6b8f2b] mb-4">
            Powerful Features for Interactive Coding Education
          </h1>
          <p className="text-xl text-[#6b8f2b]/70 max-w-3xl mx-auto">
            Everything you need to create engaging, live coding sessions with your students
          </p>
        </div>

        {/* Feature Showcase 1 - Google Slides Integration */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 w-fit">
                <Presentation className="h-10 w-10 text-[#6b8f2b]" />
              </div>
              <h2 className="text-3xl font-bold text-[#6b8f2b]">
                Google Slides Integration
              </h2>
              <p className="text-[#6b8f2b]/70 leading-relaxed text-lg">
                Connect your existing Google Slides presentations seamlessly. No need to recreate your teaching materials—use what you already have and make them interactive.
              </p>
              <ul className="space-y-3 text-[#6b8f2b]/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>Access any presentation from your Google Drive</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>Automatic syncing when you update slides</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>Secure OAuth integration with Google</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-6 shadow-xl overflow-hidden">
              {/* TODO: Add screenshot of Google Slides connection interface */}
              <div className="aspect-video bg-gradient-to-br from-[#a8d05f]/10 to-[#6b8f2b]/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Presentation className="h-16 w-16 text-[#6b8f2b]/30 mx-auto mb-4" />
                  <p className="text-[#6b8f2b]/50 text-sm">Screenshot: Dashboard showing Google Slides integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Showcase 2 - Live Code Editor (reversed) */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-6 shadow-xl overflow-hidden">
              {/* TODO: Add screenshot of student view with split screen */}
              <div className="aspect-video bg-gradient-to-br from-[#a8d05f]/10 to-[#6b8f2b]/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Code2 className="h-16 w-16 text-[#6b8f2b]/30 mx-auto mb-4" />
                  <p className="text-[#6b8f2b]/50 text-sm">Screenshot: Student view with slides and code editor</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 w-fit">
                <Code2 className="h-10 w-10 text-[#6b8f2b]" />
              </div>
              <h2 className="text-3xl font-bold text-[#6b8f2b]">
                Live Code Editor
              </h2>
              <p className="text-[#6b8f2b]/70 leading-relaxed text-lg">
                Students code alongside your presentation in a synchronized editor. They see your slides on the left and write code on the right—everything in one view.
              </p>
              <ul className="space-y-3 text-[#6b8f2b]/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>Split-screen interface: slides + code editor</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>Instant code execution and output</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>Support for multiple programming languages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Showcase 3 - Real-Time Monitoring */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 w-fit">
                <Eye className="h-10 w-10 text-[#6b8f2b]" />
              </div>
              <h2 className="text-3xl font-bold text-[#6b8f2b]">
                Real-Time Monitoring
              </h2>
              <p className="text-[#6b8f2b]/70 leading-relaxed text-lg">
                See exactly what every student is coding in real-time. Identify who needs help instantly and provide personalized guidance during the session.
              </p>
              <ul className="space-y-3 text-[#6b8f2b]/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>View all students' code as they type</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>See who's active, struggling, or ahead</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a8d05f] mt-1 text-lg">✓</span>
                  <span>Track student progress throughout the session</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-6 shadow-xl overflow-hidden">
              {/* TODO: Add screenshot of teacher monitoring dashboard */}
              <div className="aspect-video bg-gradient-to-br from-[#a8d05f]/10 to-[#6b8f2b]/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Eye className="h-16 w-16 text-[#6b8f2b]/30 mx-auto mb-4" />
                  <p className="text-[#6b8f2b]/50 text-sm">Screenshot: Teacher view showing student progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#6b8f2b] mb-12 text-center">
            And Many More Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 4 */}
            <div className="rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 w-fit mb-6">
                <Zap className="h-8 w-8 text-[#6b8f2b]" />
              </div>
              <h3 className="text-2xl font-bold text-[#6b8f2b] mb-3">
                Instant Session Launch
              </h3>
              <p className="text-[#6b8f2b]/70 leading-relaxed">
                Start a session with one click. Share a simple PIN with your students—no accounts, downloads, or complex setup required for them.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 w-fit mb-6">
                <Users className="h-8 w-8 text-[#6b8f2b]" />
              </div>
              <h3 className="text-2xl font-bold text-[#6b8f2b] mb-3">
                Multiple Sessions
              </h3>
              <p className="text-[#6b8f2b]/70 leading-relaxed">
                Manage multiple classes and sessions simultaneously. Keep your different courses organized and switch between them effortlessly.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 w-fit mb-6">
                <RefreshCw className="h-8 w-8 text-[#6b8f2b]" />
              </div>
              <h3 className="text-2xl font-bold text-[#6b8f2b] mb-3">
                Sync Your Slides
              </h3>
              <p className="text-[#6b8f2b]/70 leading-relaxed">
                Update your Google Slides anytime and the changes sync automatically. Your presentations stay current without recreating sessions.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="rounded-2xl border border-[#d6c49f]/30 bg-white p-8 sm:p-12 shadow-lg mb-20">
          <h2 className="text-3xl font-bold text-[#6b8f2b] mb-8 text-center">
            How It Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#a8d05f] text-white font-bold text-xl flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#6b8f2b] mb-2">Create Your Presentation</h3>
                <p className="text-[#6b8f2b]/70">
                  Design your lesson in Google Slides just like you normally would. Add your coding examples, explanations, and exercises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#a8d05f] text-white font-bold text-xl flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#6b8f2b] mb-2">Connect to CodeKiwi</h3>
                <p className="text-[#6b8f2b]/70">
                  Sign in with Google and connect your slides. CodeKiwi creates a new interactive session linked to your presentation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#a8d05f] text-white font-bold text-xl flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#6b8f2b] mb-2">Share PIN with Students</h3>
                <p className="text-[#6b8f2b]/70">
                  Launch your session to get a PIN code. Students visit codekiwi.app, enter the PIN, and instantly see your slides with a code editor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#a8d05f] text-white font-bold text-xl flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#6b8f2b] mb-2">Teach Live</h3>
                <p className="text-[#6b8f2b]/70">
                  Present your slides while students follow along and code. Monitor their progress in real-time and provide instant feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center rounded-2xl bg-gradient-to-r from-[#6b8f2b] to-[#7da332] p-12 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Coding Lessons?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join CodeKiwi today and start creating interactive coding sessions that engage your students.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[#6b8f2b] font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d6c49f]/30 py-8 bg-white mt-16">
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