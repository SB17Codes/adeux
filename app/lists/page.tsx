"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Navigation from "@/components/Navigation";
import GroceryList from "@/components/GroceryList";

export default function ListsPage() {
  const householdId = useQuery(api.auth.getCurrentUserHousehold);
  const lists = useQuery(
    api.queries.lists.getListsByHousehold,
    householdId ? { householdId, kind: "groceries" } : "skip"
  );

  if (!householdId || !lists)
    return (
      <div className="relative min-h-screen pb-36">
        <Navigation />
        <div className="flex min-h-[60vh] items-center justify-center px-6 text-sm text-[hsl(var(--text-muted))]">
          Gathering your grocery list…
        </div>
      </div>
    );

  const groceryList = lists[0];

  return (
    <div className="relative min-h-screen pb-36 pt-4">
      <Navigation />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--text-muted))]">Groceries</div>
          <h1 className="text-balance text-3xl font-semibold text-[hsl(var(--text-high))]">
            {groceryList?.title || "Groceries"}
          </h1>
          <p className="max-w-xl text-sm text-[hsl(var(--text-medium))]">
            Share your basket and keep track of what&apos;s already in the cart.
          </p>
        </header>

        {groceryList ? (
          <div className="rounded-[1.75rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/80 p-4 shadow-[0_22px_55px_-32px_hsl(220_70%_20%/0.65)] backdrop-blur sm:p-6">
            <GroceryList listId={groceryList._id} />
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/55 p-8 text-center text-sm text-[hsl(var(--text-muted))]">
            No grocery list yet—start by adding items once your household is seeded.
          </div>
        )}
      </main>
    </div>
  );
}
