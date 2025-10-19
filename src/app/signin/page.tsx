"use client";
import { useState } from "react";
import type React from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GoogleIcon from "@/components/GoogleIcon";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (err) {
      setError("Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-[#a8d05f]/40 to-[#a8d05f] p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
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

        {/* Card */}
        <div className="rounded-2xl border border-[#d6c49f]/30 bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#6b8f2b]">
                Sign in to CodeKiwi
              </h1>
              <p className="mt-2 text-sm text-[#6b8f2b]/70">
                Welcome back! Please sign in to your account.
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            {!showEmailForm ? (
              <div className="space-y-4">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white shadow-md"
                >
                  <GoogleIcon />
                  Sign in with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-[#d6c49f]/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-[#6b8f2b]/70">Or</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowEmailForm(true)}
                  variant="outline"
                  className="w-full border-[#6b8f2b] text-[#6b8f2b] hover:bg-[#a8d05f]/10 bg-transparent"
                >
                  Sign in with Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#6b8f2b]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#6b8f2b]">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-[#6b8f2b]/70" />
                      ) : (
                        <Eye className="h-4 w-4 text-[#6b8f2b]/70" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#6b8f2b] hover:text-[#6b8f2b]/80 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white"
                >
                  {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : null}
                  Sign In
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowEmailForm(false);
                      setError("");
                    }}
                    className="text-sm text-[#6b8f2b] hover:text-[#6b8f2b]/80"
                  >
                    ← Back to sign-in options
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center">
              <p className="text-sm text-[#6b8f2b]/70">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#6b8f2b] hover:text-[#6b8f2b]/80 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-white">
          <p>© 2024 CodeKiwi. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
