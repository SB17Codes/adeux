"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";

export default function TodayPage() {
  console.log("=== TodayPage component loaded ===");
  
  const householdId = useQuery(api.auth.getCurrentUserHousehold);
  const todayItems = useQuery(
    api.queries.items.getTodayItems,
    householdId ? { householdId } : "skip"
  );
  const toggleItem = useMutation(api.mutations.items.toggleItem);
  const ensureSeed = useMutation(api.auth.ensureHouseholdSeed);
  const getOrCreateUser = useMutation(api.auth.getOrCreateUser);

  console.log("=== TodayPage render ===");
  console.log("householdId:", householdId);
  console.log("todayItems:", todayItems);
  console.log("mutations loaded:", { ensureSeed: !!ensureSeed, getOrCreateUser: !!getOrCreateUser });

  useEffect(() => {
    let mounted = true;
    console.log("=== useEffect triggered ===");
    const init = async () => {
      try {
        console.log(">>> Starting initialization...");
        const userId = await getOrCreateUser();
        console.log(">>> User created/found:", userId);
        if (!mounted) return;
        const household = await ensureSeed();
        console.log(">>> Household seeded:", household);
      } catch (error) {
        console.error(">>> Error initializing:", error);
      }
    };
    init();
    return () => { 
      console.log("=== useEffect cleanup ===");
      mounted = false; 
    };
  }, [getOrCreateUser, ensureSeed]);

  const groceries = todayItems?.filter((item) => item.list?.kind === "groceries") || [];
  const tasks = todayItems?.filter((item) => item.list?.kind === "todo") || [];

  const { tasksCompleted, groceriesCompleted, tasksProgress, groceriesProgress } = useMemo(() => {
    const taskDone = tasks.filter((item) => item.done).length;
    const groceryDone = groceries.filter((item) => item.done).length;
    const taskProgress = tasks.length ? Math.round((taskDone / tasks.length) * 100) : 0;
    const groceryProgress = groceries.length ? Math.round((groceryDone / groceries.length) * 100) : 0;
    return {
      tasksCompleted: taskDone,
      groceriesCompleted: groceryDone,
      tasksProgress: taskProgress,
      groceriesProgress: groceryProgress,
    };
  }, [tasks, groceries]);

  if (!householdId || !todayItems)
    return (
      <div className="relative min-h-screen pb-36">
        <Navigation />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
          <div className="rounded-full border border-[hsl(var(--border))]/40 bg-[hsl(var(--surface))] px-4 py-2 text-sm text-[hsl(var(--text-medium))] shadow-[0_12px_35px_-24px_hsl(220_70%_20%/0.6)] backdrop-blur">
            Loading your household…
          </div>
          <div className="text-xs text-[hsl(var(--text-muted))]">
            {!householdId ? "Setting up your household..." : "Loading today's items..."}
          </div>
          <div className="text-xs text-[hsl(var(--text-muted))]">
            Check browser console for details
          </div>
        </div>
      </div>
    );

  const sectionCard =
    "rounded-[1.75rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/85 p-4 shadow-[0_22px_55px_-32px_hsl(220_70%_20%/0.65)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_40px_80px_-35px_hsl(220_70%_25%/0.7)] sm:p-5";
  const itemCard =
    "flex items-center gap-3 rounded-[1.25rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/70 px-3 py-3 text-sm text-[hsl(var(--text-medium))] transition hover:border-[hsl(var(--primary))]/35 hover:bg-[hsl(var(--surface-hover))] sm:px-4";

  return (
    <div className="relative min-h-screen pb-36 pt-4">
      <Navigation />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--text-muted))]">
            Today
          </div>
          <h1 className="text-balance text-3xl font-semibold text-[hsl(var(--text-high))]">Your shared plan for the day</h1>
          <p className="max-w-xl text-sm text-[hsl(var(--text-medium))]">Tick off chores, keep groceries synced, and enjoy a little calm in the chaos.</p>
        </header>

        <div className="grid gap-6">
          <section className={sectionCard}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[hsl(var(--text-high))]">Tasks</h2>
                <p className="text-xs text-[hsl(var(--text-muted))]">{tasks.length ? "Tap to check things off together." : "Add a task from the Tasks tab when you need it."}</p>
              </div>
              {tasks.length > 0 && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--success))]">
                  {tasksCompleted}/{tasks.length} done
                </div>
              )}
            </div>
            {tasks.length > 0 ? (
              <>
                <div className="mt-4 h-2 w-full rounded-full bg-[hsl(var(--surface))]">
                  <div
                    className="h-full rounded-full bg-[hsl(var(--success))] transition-all"
                    style={{ width: `${tasksProgress}%` }}
                    aria-hidden
                  />
                </div>
                <ul className="mt-5 space-y-3">
                  {tasks.map((item) => (
                    <li key={item._id} className={itemCard}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleItem({ itemId: item._id })}
                        className="h-5 w-5 rounded-md border-2 border-[hsl(var(--input))] bg-[hsl(var(--surface))] accent-[hsl(var(--success))] transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--success))] focus-visible:ring-offset-1 focus-visible:ring-offset-[hsl(var(--background))]"
                      />
                      <div className="flex flex-1 flex-col">
                        <span
                          className={`text-sm font-medium ${
                            item.done
                              ? "text-[hsl(var(--text-muted))] line-through"
                              : "text-[hsl(var(--text-high))]"
                          }`}
                        >
                          {item.title}
                        </span>
                        {item.dueDate && (
                          <span className="text-xs text-[hsl(var(--text-muted))]">
                            Due {new Date(item.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="mt-4 rounded-[1.35rem] border border-dashed border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/55 px-5 py-8 text-center text-sm text-[hsl(var(--text-muted))]">
                Nothing to check off yet. 💡 Head to the Tasks tab to add your first chore.
              </div>
            )}
          </section>

          <section className={sectionCard}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[hsl(var(--text-high))]">Groceries</h2>
                <p className="text-xs text-[hsl(var(--text-muted))]">Keep the cart in sync before your next shop.</p>
              </div>
              {groceries.length > 0 && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--accent))]">
                  {groceriesCompleted}/{groceries.length} ready
                </div>
              )}
            </div>
            {groceries.length > 0 ? (
              <>
                <div className="mt-4 h-2 w-full rounded-full bg-[hsl(var(--surface))]">
                  <div
                    className="h-full rounded-full bg-[hsl(var(--accent))] transition-all"
                    style={{ width: `${groceriesProgress}%` }}
                    aria-hidden
                  />
                </div>
                <ul className="mt-5 space-y-3">
                  {groceries.map((item) => (
                    <li key={item._id} className={itemCard}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleItem({ itemId: item._id })}
                        className="h-5 w-5 rounded-md border-2 border-[hsl(var(--input))] bg-[hsl(var(--surface))] accent-[hsl(var(--accent))] transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-1 focus-visible:ring-offset-[hsl(var(--background))]"
                      />
                      <span
                        className={`text-sm font-medium ${
                          item.done
                            ? "text-[hsl(var(--text-muted))] line-through"
                            : "text-[hsl(var(--text-high))]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="mt-4 rounded-[1.35rem] border border-dashed border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/55 px-5 py-8 text-center text-sm text-[hsl(var(--text-muted))]">
                No groceries for today. 🛒 Add items from the Groceries tab when the list starts to grow.
              </div>
            )}
          </section>

          {tasks.length === 0 && groceries.length === 0 && (
            <div className="rounded-[1.75rem] border border-[hsl(var(--border))]/40 bg-[hsl(var(--surface))]/80 p-10 text-center text-[hsl(var(--text-medium))] shadow-[0_22px_55px_-32px_hsl(220_70%_20%/0.65)]">
              Nothing for today! 🎉 Take a breather—you deserve it.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
