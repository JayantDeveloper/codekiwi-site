"use client";
import { useState } from "react";
import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import GoogleIcon from "@/components/GoogleIcon";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Failed to sign up with Google");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          school: formData.school,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account");
        setIsLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Account created, but sign-in failed. Please try signing in.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#a8d05f]/5 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <span className="text-3xl">🥝</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-[#d6c49f]/30 bg-white p-8 shadow-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#6b8f2b]">
                Create your CodeKiwi account
              </h1>
              <p className="mt-2 text-sm text-[#6b8f2b]/70">
                Join thousands of teachers making coding interactive.
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white shadow-md"
              >
                <GoogleIcon />
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-[#d6c49f]/30" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-[#6b8f2b]/70">Or</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#6b8f2b]">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#6b8f2b]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school" className="text-[#6b8f2b]">
                    School/Institution (Optional)
                  </Label>
                  <Input
                    id="school"
                    type="text"
                    placeholder="Enter your school or institution"
                    value={formData.school}
                    onChange={(e) =>
                      handleInputChange("school", e.target.value)
                    }
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
                      placeholder="Create a password (min. 8 characters)"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                      minLength={8}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#6b8f2b]">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                      className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-[#6b8f2b]/70" />
                      ) : (
                        <Eye className="h-4 w-4 text-[#6b8f2b]/70" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                    className="border-[#6b8f2b] data-[state=checked]:bg-[#6b8f2b] data-[state=checked]:text-white"
                  />
                  <Label htmlFor="terms" className="text-sm text-[#6b8f2b]/70">
                    I agree to the{" "}
                    <Link
                      href="/terms#acceptable-use"
                      className="text-[#6b8f2b] hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy#data-collection"
                      className="text-[#6b8f2b] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white"
                >
                  {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : null}
                  Create Account
                </Button>
              </form>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#6b8f2b]/70">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-[#6b8f2b] hover:text-[#6b8f2b]/80 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-[#6b8f2b]/50">
          <p>© 2024 CodeKiwi. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}