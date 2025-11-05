"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Navigation from "@/components/Navigation";

export default function ProfilePage() {
  const user = useQuery(api.auth.getCurrentUser);

  if (!user)
    return (
      <div className="relative min-h-screen pb-36">
        <Navigation />
        <div className="flex min-h-[60vh] items-center justify-center px-6 text-sm text-[hsl(var(--text-muted))]">
          Loading your profile…
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen pb-36 pt-4">
      <Navigation />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--text-muted))]">Profile</div>
          <h1 className="text-balance text-3xl font-semibold text-[hsl(var(--text-high))]">
            Hello, {user.name || "there"}
          </h1>
          <p className="max-w-xl text-sm text-[hsl(var(--text-medium))]">
            Personalize your experience and keep your shared home in sync.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/80 p-4 shadow-[0_22px_55px_-32px_hsl(220_70%_20%/0.65)] backdrop-blur sm:p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-full bg-[hsl(var(--primary))]/35 blur-2xl" />
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-[2rem] text-lg font-semibold text-white shadow-[0_20px_45px_-28px_hsl(220_70%_30%/0.8)]"
                  style={{ backgroundColor: user.color || "#3b82f6" }}
                >
                  {(user.name || "User").slice(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-[hsl(var(--text-high))]">
                  {user.name || "User"}
                </h2>
                <p className="text-sm text-[hsl(var(--text-muted))]">{user.clerkUserId}</p>
              </div>
            </div>

            <dl className="mt-6 space-y-3">
              <div>
                <dt className="text-xs uppercase tracking-wide text-[hsl(var(--text-muted))]">Display Name</dt>
                <dd className="text-sm font-medium text-[hsl(var(--text-high))]">
                  {user.name || "Set via Clerk"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-[hsl(var(--text-muted))]">Member ID</dt>
                <dd className="text-sm font-medium text-[hsl(var(--text-high))]">
                  {user.clerkUserId}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex h-full flex-col justify-between gap-6 rounded-[1.75rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/80 p-4 shadow-[0_22px_55px_-32px_hsl(220_70%_20%/0.65)] backdrop-blur sm:p-6">
            <div>
              <h2 className="text-lg font-semibold text-[hsl(var(--text-high))]">Theme</h2>
              <p className="mt-2 text-sm text-[hsl(var(--text-medium))]">
                À Deux now lives in a calm, permanent dark mode for low-light spaces.
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface-hover))]/70 px-5 py-4 text-sm text-[hsl(var(--text-medium))]">
              Your account inherits system preferences for reduced motion and contrast automatically.
            </div>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-[hsl(var(--text-muted))]">
          Want to update your details? Open the Clerk menu in the top-right of the PWA.
        </p>
      </main>
    </div>
  );
}
