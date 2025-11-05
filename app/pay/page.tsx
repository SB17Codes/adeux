"use client";

import Navigation from "@/components/Navigation";
import {
  ArrowUpRight,
  ArrowDownRight,
  QrCode,
  Wallet,
  PhoneOutgoing,
  MoreHorizontal,
} from "lucide-react";

const quickActions = [
  { label: "Send", icon: ArrowUpRight },
  { label: "Request", icon: ArrowDownRight },
  { label: "QR Code", icon: QrCode },
  { label: "Top Up", icon: Wallet },
  { label: "Mobile", icon: PhoneOutgoing },
];

const transactions = [
  {
    id: 1,
    name: "Shared Groceries",
    description: "Farmers market",
    amount: "-€42.80",
    time: "Today, 09:12",
    status: "Completed",
  },
  {
    id: 2,
    name: "Roomie Rent",
    description: "Auto-transfer",
    amount: "+€780.00",
    time: "Yesterday, 18:04",
    status: "Cleared",
  },
  {
    id: 3,
    name: "Coffee Run",
    description: "Tap to split",
    amount: "-€12.40",
    time: "Wed, 14:31",
    status: "Pending",
  },
];

export default function PayPage() {
  return (
    <div className="relative min-h-screen pb-36 pt-4">
      <Navigation />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-4">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--text-muted))]">Wallet</div>
          <div className="rounded-[2.25rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/80 p-5 shadow-[0_35px_90px_-45px_hsl(220_70%_20%/0.7)] backdrop-blur md:p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-sm text-[hsl(var(--text-medium))]">Current balance</span>
                <div className="text-4xl font-semibold tracking-tight text-[hsl(var(--text-high))]">
                  €1,284.22
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-[hsl(var(--border))]/40 bg-[hsl(var(--surface-hover))]/80 px-4 py-3 sm:col-span-2">
                  <div className="text-xs text-[hsl(var(--text-muted))]">Household split limit</div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-lg font-semibold text-[hsl(var(--text-high))]">€2,500</span>
                    <span className="text-xs text-[hsl(var(--text-medium))]">60% used</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-[hsl(var(--surface))]">
                    <div
                      className="h-full rounded-full bg-[hsl(var(--secondary))]"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-[hsl(var(--border))]/40 bg-gradient-to-br from-[hsl(var(--secondary))]/20 via-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/25 px-4 py-3">
                  <div className="text-xs text-[hsl(var(--text-muted))]">Auto-payout</div>
                  <div className="mt-2 text-sm font-semibold text-[hsl(var(--text-high))]">Enabled</div>
                  <p className="mt-1 text-[0.7rem] text-[hsl(var(--text-muted))]">
                    Next transfer on Aug 28
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="flex flex-col items-start gap-3 rounded-[1.5rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/75 px-4 py-4 text-left text-sm text-[hsl(var(--text-medium))] shadow-[0_18px_55px_-40px_hsl(220_70%_20%/0.6)] transition hover:-translate-y-0.5 hover:border-[hsl(var(--primary))]/40 hover:text-[hsl(var(--text-high))] hover:shadow-[0_30px_70px_-45px_hsl(220_70%_25%/0.7)] sm:px-5"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--surface-hover))] text-[hsl(var(--primary))]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-[hsl(var(--text-high))]">{action.label}</span>
                </span>
                <span className="text-[0.7rem] text-[hsl(var(--text-muted))]">
                  {action.label === "Send" && "Split dinner tabs"}
                  {action.label === "Request" && "Remind a roommate"}
                  {action.label === "QR Code" && "Show to pay in person"}
                  {action.label === "Top Up" && "Add from main account"}
                  {action.label === "Mobile" && "Recharge phone plans"}
                </span>
              </button>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-[1.75rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/70 p-4 shadow-[0_22px_55px_-32px_hsl(220_70%_20%/0.65)] sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[hsl(var(--text-high))]">Recent activity</h2>
              <button className="rounded-full border border-[hsl(var(--border))]/40 px-3 py-1 text-xs text-[hsl(var(--text-muted))] transition hover:border-[hsl(var(--primary))]/40 hover:text-[hsl(var(--text-high))]">
                View all
              </button>
            </div>
            <ul className="space-y-3">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="flex flex-wrap items-center gap-4 rounded-[1.25rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface-hover))]/75 px-4 py-3 text-sm text-[hsl(var(--text-medium))] sm:flex-nowrap"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--surface))] text-[hsl(var(--primary))]">
                    <MoreHorizontal className="h-5 w-5" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="font-semibold text-[hsl(var(--text-high))]">{transaction.name}</span>
                    <span className="text-[0.75rem] text-[hsl(var(--text-muted))]">{transaction.description}</span>
                  </div>
                  <div className="w-full text-left text-sm font-semibold text-[hsl(var(--text-high))] sm:w-auto sm:text-right">
                    {transaction.amount}
                    <div className="mt-1 text-[0.7rem] font-normal text-[hsl(var(--text-muted))]">
                      {transaction.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4 rounded-[1.75rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/70 p-4 shadow-[0_22px_55px_-32px_hsl(220_70%_20%/0.65)] sm:p-5">
            <div className="rounded-[1.25rem] border border-[hsl(var(--border))]/35 bg-gradient-to-br from-[hsl(var(--primary))]/20 via-transparent to-[hsl(var(--accent))]/20 px-4 py-4">
              <h3 className="text-sm font-semibold text-[hsl(var(--text-high))]">Shared bill coming up</h3>
              <p className="mt-1 text-[0.8rem] text-[hsl(var(--text-medium))]">Streaming services renew Aug 20.</p>
              <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-2 text-[0.75rem] font-semibold text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/85">
                Set reminder
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-[1.25rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface-hover))]/70 px-4 py-4 text-[0.8rem] text-[hsl(var(--text-medium))]">
              <p className="font-semibold text-[hsl(var(--text-high))]">Tips</p>
              <p className="mt-1 leading-relaxed">
                Use quick notes to tag who owes what after a shop. Everyone sees updates instantly.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
