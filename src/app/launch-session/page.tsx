"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LaunchSessionPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Creating your presentation...");
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);

  useEffect(() => {
    async function createPresentation() {
      try {
        console.log("Starting presentation creation...");
        
        // Call the API route to create a new presentation
        const response = await fetch("/api/create-presentation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        
        const data = await response.json();
        console.log("Response data:", data);

        if (!response.ok) {
          throw new Error(data.details || data.error || "Failed to create presentation");
        }
        
        if (data.presentationUrl) {
          setStatus("Redirecting to your presentation...");
          console.log("Redirecting to:", data.presentationUrl);
          // Small delay to show the status message
          setTimeout(() => {
            window.location.href = data.presentationUrl;
          }, 500);
        } else {
          throw new Error("No presentation URL returned");
        }
      } catch (err: unknown) {
        console.error("Error creating presentation:", err);
        if (err instanceof Error) {
          setError(err.message || "Failed to create presentation. Please try again.");
          setDetailedError(JSON.stringify(err, null, 2));
        } else {
          setError("An unknown error occurred. Please try again.");
          setDetailedError(String(err));
        }
      }
    }

    createPresentation();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a8d05f]/10 to-white">
      <div className="flex flex-col items-center space-y-6 text-center px-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-[#6b8f2b]">CodeKiwi</span>
          <Image 
            src="https://www.codekiwi.app/codekiwilogo.png" 
            alt="CodeKiwi Logo" 
            width={40} 
            height={40}
            className="object-contain"
          />
        </div>

        {error ? (
          <div className="space-y-4 max-w-2xl">
            <div className="rounded-full bg-red-100 p-4 mx-auto w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-red-600">{error}</p>
            {detailedError && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                  Show technical details
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-60">
                  {detailedError}
                </pre>
              </details>
            )}
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 rounded-lg bg-[#6b8f2b] px-6 py-2 text-white hover:bg-[#6b8f2b]/90"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#a8d05f]/30 border-t-[#6b8f2b]"></div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#6b8f2b]">{status}</h1>
              <p className="text-[#6b8f2b]/70">This will only take a moment</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}