import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a8d05f]/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#6b8f2b]/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#8fb73a]/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1400ms" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-6 max-w-4xl">
          <h1
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Teach Coding with Slides —{" "}
            <span className="bg-gradient-to-r from-[#a8d05f] to-[#6b8f2b] bg-clip-text text-transparent">
              Live &amp; Interactive
            </span>
          </h1>
          <p
            className="mx-auto max-w-[700px] text-lg text-[#a8d05f] md:text-xl leading-relaxed animate-fade-in font-medium"
            style={{ animationDelay: "200ms" }}
          >
            Sync Google Slides with a live code editor. Monitor student progress
            in real-time and make coding lessons engaging.
          </p>
        </div>

        <div
          className="flex flex-col gap-4 sm:flex-row animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8"
          >
            <Link href="/signup">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Get Started with Google
            </Link>
          </Button>
          <Link href="/signup">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#a8d05f] text-[#a8d05f] hover:bg-[#a8d05f] hover:text-[#1a1a1a] shadow-md hover:shadow-lg transition-all duration-300 bg-transparent text-base px-8"
            >
              Create Account
            </Button>
          </Link>
        </div>

        <p
          className="text-sm text-[#a8d05f] animate-fade-in font-medium"
          style={{ animationDelay: "400ms" }}
        >
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-bold text-white hover:text-[#a8d05f] transition-colors hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
}
