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

          {/* Table of Contents */}
          <div className="mb-10 rounded-lg bg-[#a8d05f]/10 p-6">
            <h2 className="text-lg font-semibold text-[#6b8f2b] mb-4">Contents</h2>
            <nav className="space-y-2">
              <a href="#getting-started" className="block text-[#6b8f2b] hover:underline text-sm">Getting Started</a>
              <a href="#creating-account" className="block text-[#6b8f2b] hover:underline text-sm">Creating an Account</a>
              <a href="#marking-slides" className="block text-[#6b8f2b] hover:underline text-sm">Marking Coding Slides</a>
              <a href="#launching-session" className="block text-[#6b8f2b] hover:underline text-sm">Launching a Session</a>
              <a href="#teacher-view" className="block text-[#6b8f2b] hover:underline text-sm">Teacher Presentation View</a>
              <a href="#monitoring-students" className="block text-[#6b8f2b] hover:underline text-sm">Monitoring Students (Dashboard)</a>
              <a href="#inspecting-code" className="block text-[#6b8f2b] hover:underline text-sm">Inspecting & Editing Student Code</a>
              <a href="#student-experience" className="block text-[#6b8f2b] hover:underline text-sm">The Student Experience</a>
              <a href="#best-practices" className="block text-[#6b8f2b] hover:underline text-sm">Best Practices</a>
              <a href="#troubleshooting" className="block text-[#6b8f2b] hover:underline text-sm">Troubleshooting</a>
              <a href="#faq" className="block text-[#6b8f2b] hover:underline text-sm">FAQ</a>
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-10">

            {/* Getting Started */}
            <section id="getting-started">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Getting Started</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                CodeKiwi turns your Google Slides presentations into live, interactive coding lessons. Students see your slides in real-time while writing and running code side-by-side — no accounts or installs required on their end.
              </p>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                As a teacher you'll need:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>A Google account (to sign in and access Google Slides)</li>
                <li>A Google Slides presentation with your lesson content</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                Students only need a modern web browser and the session code you share with them.
              </p>
            </section>

            {/* Creating Account */}
            <section id="creating-account">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Creating an Account</h2>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Sign Up with Google (Recommended)</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Go to <a href="https://www.codekiwi.tech/signup" className="text-[#6b8f2b] hover:underline">codekiwi.tech/signup</a></li>
                <li>Click <strong>Sign in with Google</strong></li>
                <li>Select your Google account and grant the requested permissions</li>
                <li>You'll land on your dashboard at <a href="https://www.codekiwi.tech/home" className="text-[#6b8f2b] hover:underline">codekiwi.tech/home</a></li>
              </ol>
              <div className="rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b] mb-4">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Why Google sign-in?</strong> CodeKiwi uses Google sign-in to access the presentations you select and retrieve slide thumbnails via the Google Slides API. No files are modified.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Sign Up with Email</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80">
                <li>Go to <a href="https://www.codekiwi.tech/signup" className="text-[#6b8f2b] hover:underline">codekiwi.tech/signup</a></li>
                <li>Fill in your name, email, and password</li>
                <li>Click <strong>Create Account</strong></li>
              </ol>
            </section>

            {/* Marking Slides */}
            <section id="marking-slides">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Marking Coding Slides</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                By default, students see only the slide. To show the live code editor on a specific slide, mark it as a <strong>Code Question</strong>. There are two ways to do this:
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3">Option A — Via the Add-On Sidebar (recommended)</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li className="leading-relaxed">Open your presentation and make sure the <strong>CodeKiwi</strong> sidebar is open</li>
                <li className="leading-relaxed">Click the slide you want to mark in the slide panel on the left</li>
                <li className="leading-relaxed">Click <strong>Mark Current Slide</strong> in the <em>Coding Slides</em> section of the sidebar</li>
                <li className="leading-relaxed">The slide number appears instantly as a green chip in the list</li>
              </ol>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-2">
                The <strong>Coding Slides</strong> panel shows all marked slides as compact numbered chips. To remove a slide's coding marker, click the <strong>×</strong> on its chip.
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Option B — Via Speaker Notes (manual)</h3>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li className="leading-relaxed">Open the slide in Google Slides</li>
                <li className="leading-relaxed">Open <strong>Speaker Notes</strong> (View → Show Speaker Notes)</li>
                <li className="leading-relaxed">
                  At the very top of the notes, type exactly:
                  <div className="mt-2 ml-4 inline-block rounded bg-[#1e1e1e] px-3 py-1.5 font-mono text-sm text-[#a8d05f]">
                    Code Question: Write a function that…
                  </div>
                </li>
                <li className="leading-relaxed">The text after the colon becomes the question prompt students see</li>
              </ol>

              <div className="rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Tip:</strong> Mix regular slides and coding slides freely — the editor only appears on slides marked with <code className="font-mono bg-white/60 px-1 rounded">Code Question:</code>. The marker must be at the very first line of the Speaker Notes and is case-sensitive.
                </p>
              </div>
            </section>

            {/* Launching a Session */}
            <section id="launching-session">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Launching a Session</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-6">
                There are two ways to start a CodeKiwi session:
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3">Option 1 — From your Dashboard (web)</h3>
              <ol className="list-decimal list-inside space-y-3 text-[#6b8f2b]/80 mb-6">
                <li className="leading-relaxed">Sign in at <a href="https://www.codekiwi.tech/home" className="text-[#6b8f2b] hover:underline">codekiwi.tech/home</a></li>
                <li className="leading-relaxed">Click <strong>Launch Session</strong></li>
                <li className="leading-relaxed">
                  Choose one of two options:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li><strong>Use Template</strong> — creates a fresh CodeKiwi starter deck in your Google Drive and opens it for editing</li>
                    <li><strong>Choose from Drive</strong> — pick an existing Google Slides presentation; CodeKiwi retrieves the slide thumbnails and launches the session immediately</li>
                  </ul>
                </li>
                <li className="leading-relaxed">You'll be taken directly to the teacher presentation view at <strong>codekiwi.app</strong></li>
              </ol>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3">Option 2 — From the Google Slides Add-On</h3>
              <ol className="list-decimal list-inside space-y-3 text-[#6b8f2b]/80 mb-4">
                <li className="leading-relaxed">Open your Google Slides presentation</li>
                <li className="leading-relaxed">Go to <strong>Extensions → CodeKiwi → Open CodeKiwi Add-On</strong> to open the sidebar</li>
                <li className="leading-relaxed">Use the <strong>Coding Slides</strong> panel to mark or unmark slides as coding questions right from the sidebar</li>
                <li className="leading-relaxed">Select a language (Python or JavaScript) from the <strong>Session Language</strong> toggle</li>
                <li className="leading-relaxed">Click <strong>Start Lesson</strong> — CodeKiwi exports your slides and generates a session</li>
                <li className="leading-relaxed">A new tab opens with the teacher presentation view</li>
              </ol>
              <div className="rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Add-on not installed?</strong> Go to <strong>Extensions → Add-ons → Get add-ons</strong> and search for <strong>CodeKiwi</strong> in the Google Workspace Marketplace.
                </p>
              </div>
            </section>

            {/* Teacher View */}
            <section id="teacher-view">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Teacher Presentation View</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-6">
                When a session starts, you land on the teacher presentation view at <strong>codekiwi.app</strong>. A lobby modal appears over your slides.
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3">The Lobby</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Shows the 6-digit <strong>session code</strong> students use to join at <a href="https://www.codekiwi.app" className="text-[#6b8f2b] hover:underline">codekiwi.app</a></li>
                <li>Displays a live count of connected students</li>
                <li><strong>Give Students a Link</strong> copies a direct join URL to your clipboard</li>
                <li>Click <strong>Start Class</strong> to dismiss the lobby and begin presenting</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">During the Presentation</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Use <strong>Previous / Next</strong> in the bottom bar to advance slides — students sync in real-time</li>
                <li>Click the <strong>Session: XXXXXX</strong> title above the slides at any time to reopen the lobby (to copy the session code again)</li>
                <li>The <strong>Dashboard</strong> button opens a live view of all student code</li>
                <li><strong>Lock Editors</strong> disables the student code editor — useful when you want students to focus on your explanation</li>
                <li><strong>End Session</strong> ends the class for everyone and returns you to your dashboard</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Speaker Notes Sidebar</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                Your slide notes appear in a sidebar on the right — visible only to you, not to students.
              </p>
            </section>

            {/* Monitoring Students */}
            <section id="monitoring-students">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Monitoring Students (Dashboard)</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                Click <strong>Dashboard</strong> from the presentation view to open the live student dashboard. Each student appears as a card showing:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Student name and color-coded card</li>
                <li>A status dot indicating their coding state (idle, coding, ran code successfully, or error)</li>
                <li>A live preview of their most recent code</li>
                <li>Timestamp of their last update</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                Cards refresh automatically every few seconds. Click any card to open the full inspect view for that student.
              </p>
            </section>

            {/* Inspecting Code */}
            <section id="inspecting-code">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Inspecting & Editing Student Code</h2>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                Click a student card in the dashboard (or navigate directly to a student) to open the inspect view. You'll see their full code and terminal output in real-time.
              </p>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3">Navigating Between Students</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Use the <strong>← / →</strong> arrows to jump between students in order</li>
                <li>Use the dropdown to jump to any student directly</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Editing Student Code</h3>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                You can edit a student's code directly from the inspect view to provide assistance:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Click the <strong>pencil icon</strong> in the editor header</li>
                <li>Make your changes in the editor</li>
                <li>Click <strong>Save</strong> — the updated code is pushed to the student's editor in real-time</li>
                <li>Click <strong>Cancel</strong> to discard changes and return to read-only view</li>
              </ol>
              <div className="rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Note:</strong> While you're editing, the inspect view pauses its live refresh so your edits aren't overwritten by the student's code.
                </p>
              </div>
            </section>

            {/* Student Experience */}
            <section id="student-experience">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">The Student Experience</h2>
              <ol className="list-decimal list-inside space-y-3 text-[#6b8f2b]/80 mb-6">
                <li className="leading-relaxed">Students go to <a href="https://www.codekiwi.app" className="text-[#6b8f2b] hover:underline font-medium">codekiwi.app</a></li>
                <li className="leading-relaxed">Enter the 6-digit session code and their name</li>
                <li className="leading-relaxed">They join immediately — no account needed</li>
              </ol>
              <p className="text-[#6b8f2b]/80 leading-relaxed mb-4">
                Once inside, students see:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li><strong>Left pane:</strong> Your Google Slides synced in real-time as you advance them</li>
                <li><strong>Right pane (coding slides only):</strong> A syntax-highlighted code editor and an output terminal</li>
                <li>A <strong>Run</strong> button to execute their code and see the result instantly</li>
              </ul>
              <p className="text-[#6b8f2b]/80 leading-relaxed">
                When you advance to a new slide, the student's editor and terminal reset automatically — each slide starts fresh.
              </p>
            </section>

            {/* Best Practices */}
            <section id="best-practices">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Best Practices</h2>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Preparing Your Slides</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Keep each coding slide focused on one concept or task</li>
                <li>Write a clear <code className="font-mono bg-[#f1f3f4] px-1 rounded text-sm">Code Question:</code> prompt in the Speaker Notes so students know exactly what to write</li>
                <li>Use regular slides for explanation, coding slides for practice</li>
                <li>Test your slides by running the session yourself before class</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">During the Session</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80 mb-4">
                <li>Share the session code early — project it or paste it in your class chat</li>
                <li>Use <strong>Lock Editors</strong> while explaining to keep students focused</li>
                <li>Open the <strong>Dashboard</strong> during coding time to spot students who are stuck</li>
                <li>Use the <strong>inspect view</strong> to nudge a struggling student's code rather than calling them out publicly</li>
                <li>Advance slides deliberately — the editor resets on each slide change</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#6b8f2b] mb-3 mt-6">Suggested Lesson Structure</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6b8f2b]/80">
                <li><strong>Intro (5–10 min):</strong> Regular slides explaining the concept</li>
                <li><strong>Demo (10–15 min):</strong> Walk through examples; lock editors so students watch</li>
                <li><strong>Practice (20–30 min):</strong> Coding slides; monitor the dashboard; assist as needed</li>
                <li><strong>Review (5–10 min):</strong> Discuss common errors you spotted in the dashboard</li>
              </ul>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Troubleshooting</h2>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">"Google Drive permission denied" when selecting a presentation</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Sign out of codekiwi.tech, then sign back in with Google</li>
                    <li>When prompted, approve the Google Slides permissions</li>
                    <li>Try selecting the presentation again</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Students can't access the session</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Confirm the session is active (the lobby or presentation view should be open)</li>
                    <li>Double-check that students are entering the correct 6-digit code at <strong>codekiwi.app</strong></li>
                    <li>Make sure the session hasn't been ended via the End Session button</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Slides aren't syncing for students</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Advance the slide in the teacher view — the sync message fires on each change</li>
                    <li>Ask the student to refresh their browser tab</li>
                    <li>Verify they're connected to the internet</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">The code editor isn't showing for students</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Check that the slide has <code className="font-mono bg-[#f1f3f4] px-1 rounded text-sm">Code Question:</code> at the very first line of its Speaker Notes</li>
                    <li>The marker is case-sensitive — it must be typed exactly as <code className="font-mono bg-[#f1f3f4] px-1 rounded text-sm">Code Question:</code></li>
                    <li>Use the <strong>Coding Slides</strong> panel in the Add-On sidebar to see which slides are currently marked</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Dashboard shows "no students"</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#6b8f2b]/80 ml-4">
                    <li>Make sure students have fully joined (entered code + name)</li>
                    <li>Refresh the dashboard page</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-[#a8d05f]/10 p-4 border-l-4 border-[#6b8f2b]">
                <p className="text-sm text-[#6b8f2b]/80">
                  <strong>Still stuck?</strong> Email <a href="mailto:jaymaheshwari2603@gmail.com" className="text-[#6b8f2b] hover:underline">jaymaheshwari2603@gmail.com</a> — I typically respond within 24 hours.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-[#6b8f2b] mb-4">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Do students need to create an account?</h4>
                  <p className="text-[#6b8f2b]/80">No. Students visit codekiwi.app, enter the session code and a name, and they're in. No sign-up, no download.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">What programming languages are supported?</h4>
                  <p className="text-[#6b8f2b]/80">Currently Python and JavaScript. The language is set when you start the session via the Add-On; "Choose from Drive" sessions default to Python.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Is CodeKiwi free?</h4>
                  <p className="text-[#6b8f2b]/80">Yes — CodeKiwi is free to use while in beta. All features are fully accessible at no cost.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Can I reuse a presentation for multiple sessions?</h4>
                  <p className="text-[#6b8f2b]/80">Yes. Every session generates a new 6-digit code. Just launch a new session from the dashboard or the Add-On sidebar using the same presentation.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Is student code saved after the session?</h4>
                  <p className="text-[#6b8f2b]/80">Student code lives in the session's in-memory state. Once the session is ended, it is cleared. Students should copy any work they want to keep before the session ends.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Can I edit a student's code during class?</h4>
                  <p className="text-[#6b8f2b]/80">Yes. In the inspect view, click the pencil icon to edit their code, then Save — the changes are pushed to their editor in real-time.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">How many students can join a session?</h4>
                  <p className="text-[#6b8f2b]/80">There's no hard limit. For the best experience we recommend up to 50 students per session.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">What browsers are supported?</h4>
                  <p className="text-[#6b8f2b]/80">Chrome, Firefox, Safari, and Edge — all modern versions. Chrome is recommended for the best experience.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#6b8f2b] mb-2">Does CodeKiwi work for remote teaching?</h4>
                  <p className="text-[#6b8f2b]/80">Absolutely. Students only need internet access. Share your screen for the visual context and share the session code via chat or video conferencing.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-[#d6c49f]/30">
            <h3 className="text-xl font-bold text-[#6b8f2b] mb-3">Need More Help?</h3>
            <p className="text-[#6b8f2b]/80 mb-4">
              Can't find what you're looking for? Have a question or feedback?
            </p>
            <div className="rounded-lg bg-[#a8d05f]/10 p-6">
              <p className="text-[#6b8f2b] font-semibold mb-2">Get in Touch</p>
              <p className="text-[#6b8f2b]/80 mb-1">Email: <a href="mailto:jaymaheshwari2603@gmail.com" className="text-[#6b8f2b] hover:underline">jaymaheshwari2603@gmail.com</a></p>
              <p className="text-[#6b8f2b]/80 text-sm mt-3">I typically respond within 24 hours.</p>
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
            <p className="text-sm text-[#6b8f2b]/70">© 2025 CodeKiwi. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">Terms</Link>
              <Link href="/privacy" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">Privacy</Link>
              <Link href="/support" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
