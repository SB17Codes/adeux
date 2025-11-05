"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBasket,
  CheckCircle2,
  StickyNote,
  User,
  CreditCard,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/today", label: "Today", icon: Home },
    { href: "/lists", label: "Groceries", icon: ShoppingBasket },
    { href: "/tasks", label: "Tasks", icon: CheckCircle2 },
    { href: "/notes", label: "Notes", icon: StickyNote },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 hidden border-b border-[hsl(var(--border))]/45 bg-[hsl(var(--background))]/85 backdrop-blur-xl transition md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--text-muted))]">
            À Deux
          </div>
          <div className="flex items-center gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[hsl(var(--surface-hover))] text-[hsl(var(--text-high))] shadow-[0_10px_30px_-20px_hsl(220_70%_35%/0.6)]"
                      : "text-[hsl(var(--text-muted))] hover:bg-[hsl(var(--surface))] hover:text-[hsl(var(--text-high))]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <nav className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-5 md:hidden">
        <div className="mx-auto flex w-full max-w-lg items-center justify-between gap-1 rounded-[2.5rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--background))]/90 px-4 py-3 shadow-[0_24px_60px_-30px_hsl(220_70%_20%/0.7)] backdrop-blur-xl">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex flex-1 flex-col items-center gap-1 rounded-full px-2 py-1 text-[0.72rem] font-medium transition ${
                  isActive
                    ? "text-[hsl(var(--text-high))]"
                    : "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-high))]"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition ${
                    isActive
                      ? "text-[hsl(var(--primary))] drop-shadow-[0_0_18px_hsl(var(--primary)/0.4)]"
                      : "text-[hsl(var(--text-muted))] group-hover:text-[hsl(var(--primary))]"
                  }`}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
