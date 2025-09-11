import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LaunchSessionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-[#6b8f2b] hover:bg-[#a8d05f]/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-xl font-bold text-[#6b8f2b]">CodeKiwi</span>
          <span className="text-xl">🥝</span>
        </div>
      </header>
      <main className="container flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          <h1 className="text-3xl font-bold text-[#6b8f2b]">Install the CodeKiwi Add-on</h1>
          <div className="rounded-xl border border-[#d6c49f]/30 p-8 shadow-md bg-white">
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Google Slides Add-on Installation"
              className="mx-auto mb-6 rounded-lg"
            />
            <div className="space-y-4 text-left">
              <h2 className="text-xl font-semibold text-[#6b8f2b]">How to install:</h2>
              <ol className="list-decimal space-y-2 pl-5 text-[#6b8f2b]/80">
                <li>Open your Google Slides presentation</li>
                <li>Click on "Extensions" in the top menu</li>
                <li>Select "Add-ons" → "Get add-ons"</li>
                <li>Search for "CodeKiwi" and click "Install"</li>
                <li>Grant the necessary permissions</li>
              </ol>
              <p className="mt-4 text-[#6b8f2b]/80">
                Once installed, you can mark coding exercises in your slides using the CodeKiwi sidebar.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="border-[#d6c49f]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/10 bg-transparent"
              asChild
            >
              <Link href="https://workspace.google.com/marketplace" target="_blank">
                Google Workspace Marketplace
              </Link>
            </Button>
            <Button className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white" asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
