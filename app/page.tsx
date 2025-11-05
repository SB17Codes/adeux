"use client";

import { SignedOut, SignIn, SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <SignedOut>
        <div className="relative flex min-h-screen flex-col overflow-hidden px-4 pb-12 pt-14 sm:px-6">
          <div className="pointer-events-none absolute -left-28 top-32 h-72 w-72 rounded-full bg-[hsl(var(--secondary))]/35 blur-[140px]" />
          <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-[hsl(var(--primary))]/35 blur-[140px]" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-48 rounded-full bg-[hsl(var(--accent))]/30 blur-[120px]" />

          <div className="z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
            <div className="w-full rounded-[2rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/85 p-6 text-center shadow-[0_30px_80px_-40px_hsl(220_70%_20%/0.7)] backdrop-blur-xl sm:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/40 bg-[hsl(var(--primary))]/10 px-4 py-2 text-sm font-medium text-[hsl(var(--text-medium))]">
                <span aria-hidden>✨</span> Shared home hub
              </div>
              <h1 className="text-balance text-4xl font-semibold text-[hsl(var(--text-high))]">
                À Deux
              </h1>
              <p className="mt-4 text-pretty text-base text-[hsl(var(--text-medium))]">
                Bring tasks, groceries, and notes together so your household can flow with ease.
              </p>
              <div className="mt-8 text-left text-sm text-[hsl(var(--text-muted))]">
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--primary))]/20 text-xs font-semibold text-[hsl(var(--primary))]">
                      1
                    </span>
                    Sync to-do&apos;s and shopping lists instantly.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--primary))]/20 text-xs font-semibold text-[hsl(var(--primary))]">
                      2
                    </span>
                    Pin quick notes everyone can see.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(var(--primary))]/20 text-xs font-semibold text-[hsl(var(--primary))]">
                      3
                    </span>
                    Designed to feel calm and intuitive on your phone.
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                <SignIn
                  fallbackRedirectUrl="/today"
                  appearance={{
                    elements: {
                      card: "bg-transparent shadow-none",
                      formFieldInput: "bg-[hsl(var(--surface))] border border-[hsl(var(--input))] text-[hsl(var(--text-high))]",
                      formButtonPrimary:
                        "bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/85 text-[hsl(var(--primary-foreground))] font-semibold rounded-xl",
                      formFieldLabel: "text-[hsl(var(--text-medium))] text-sm",
                    },
                    variables: {
                      colorPrimary: "#3b82f6",
                      colorText: "#E9EEF9",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <footer className="z-10 mt-12 text-center text-xs text-[hsl(var(--text-muted))]">
            Crafted for busy households — add to your home screen for the fastest access.
          </footer>
        </div>
      </SignedOut>

      <SignedIn>
        <RedirectToToday />
      </SignedIn>
    </>
  );
}

function RedirectToToday() {
  const router = useRouter();
  useEffect(() => {
    router.push("/today");
  }, [router]);
  return null;
}
