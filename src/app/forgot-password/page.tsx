"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-[#a8d05f]/40 to-[#a8d05f] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <Image
              src="https://www.codekiwi.app/codekiwilogo.png"
              alt="CodeKiwi Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#d6c49f]/30 bg-white p-8 shadow-lg text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#6b8f2b]">Reset Password</h1>
          <p className="text-[#6b8f2b]/70 text-sm">
            Password reset by email is coming soon. In the meantime, sign in with Google to access your account.
          </p>
          <Link href="/signin">
            <Button className="w-full bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white">
              Back to Sign In
            </Button>
          </Link>
        </div>

        <div className="text-center text-xs text-white">
          <p>© 2024 CodeKiwi. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
