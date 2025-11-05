"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export default function GroceryList({ listId }: { listId: Id<"lists"> }) {
  const items = useQuery(api.queries.items.getItemsByList, { listId });
  const addItem = useMutation(api.mutations.items.addItem);
  const toggleItem = useMutation(api.mutations.items.toggleItem);

  const [title, setTitle] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addItem({ listId, title: title.trim() });
    setTitle("");
  };

  if (!items)
    return (
      <div className="flex items-center justify-center py-10 text-sm text-[hsl(var(--text-muted))]">
        Loading groceries…
      </div>
    );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAdd}
        className="grid gap-3 rounded-[1.5rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/80 p-4 shadow-[0_18px_45px_-32px_hsl(220_70%_20%/0.6)] backdrop-blur sm:grid-cols-[1fr_auto] sm:items-center"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add grocery item..."
          className="w-full border-none bg-transparent px-0 py-0 text-base text-[hsl(var(--text-high))] placeholder:text-[hsl(var(--text-muted))] focus-visible:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--success))] to-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-[0_12px_35px_-24px_hsl(150_70%_40%/0.6)] transition hover:shadow-[0_18px_45px_-24px_hsl(150_70%_40%/0.7)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--success))]/60 focus-visible:outline-none sm:w-auto"
        >
          Add
        </button>
      </form>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-3 rounded-[1.25rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/70 px-4 py-3 text-sm text-[hsl(var(--text-medium))] transition hover:border-[hsl(var(--success))]/40 hover:bg-[hsl(var(--surface-hover))]"
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem({ itemId: item._id })}
                className="h-5 w-5 rounded-md border-2 border-[hsl(var(--input))] bg-[hsl(var(--surface))] accent-[hsl(var(--success))] transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--success))] focus-visible:ring-offset-1 focus-visible:ring-offset-[hsl(var(--background))]"
              />
              <span
                className={`font-medium ${
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
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/55 px-6 py-10 text-center text-sm text-[hsl(var(--text-muted))]">
          Your basket is empty. Add the first item above when you&apos;re ready to shop.
        </div>
      )}
    </div>
  );
}
