import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";

const presentations: Array<{
  id: string;
  title: string;
  lastModified: string;
  thumbnail: string;
}> = [];

export default function HomePage() {
  return (
    <main className="w-full px-4 sm:px-8 md:px-12 py-6 bg-gradient-to-b from-[#a8d05f]/5 to-[#f8faf5]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#6b8f2b]">My Presentations</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-[#6b8f2b]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/20 bg-white"
        >
          Sort by
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {presentations.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-[#6b8f2b] p-6 mb-4 shadow-lg">
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
                className="text-white"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h10" />
                <path d="M7 12h10" />
                <path d="M7 17h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#6b8f2b] mb-2">
              No presentations yet
            </h3>
            <p className="text-[#6b8f2b]/70 mb-6 max-w-md">
              Get started by launching your first coding session with Google
              Slides
            </p>
            <Link href="/launch-session" target="_blank">
              <Button className="bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Launch Your First Session
              </Button>
            </Link>
          </div>
        ) : (
          presentations.map((p) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-xl border-2 border-[#a8d05f] bg-white shadow-md transition-all hover:shadow-xl hover:border-[#6b8f2b] hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden bg-[#a8d05f]/10">
                <img
                  src={p.thumbnail || "/placeholder.svg"}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-[#6b8f2b] mb-1">{p.title}</h3>
                <p className="text-sm text-[#6b8f2b]/70">
                  Modified {p.lastModified}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#6b8f2b]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/20 bg-white"
                  >
                    Edit
                  </Button>
                  <Link href="/launch-session" target="_blank">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white"
                    >
                      Launch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
