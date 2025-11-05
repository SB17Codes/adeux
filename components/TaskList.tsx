"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export default function TaskList({ listId }: { listId: Id<"lists"> }) {
  const items = useQuery(api.queries.items.getItemsByList, { listId });
  const addItem = useMutation(api.mutations.items.addItem);
  const toggleItem = useMutation(api.mutations.items.toggleItem);

  const [title, setTitle] = useState("");
  const [dueToday, setDueToday] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    await addItem({
      listId,
      title: title.trim(),
      dueDate: dueToday ? today.getTime() : undefined,
    });
    setTitle("");
    setDueToday(false);
  };

  if (!items)
    return (
      <div className="flex items-center justify-center py-10 text-sm text-[hsl(var(--text-muted))]">
        Loading tasks…
      </div>
    );

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleAdd}
        className="space-y-3 rounded-[1.5rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/80 p-4 shadow-[0_18px_45px_-32px_hsl(220_70%_20%/0.6)] backdrop-blur"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add task..."
          className="w-full border-none bg-transparent px-0 py-0 text-base text-[hsl(var(--text-high))] placeholder:text-[hsl(var(--text-muted))] focus-visible:outline-none"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="dueToday"
            checked={dueToday}
            onChange={(e) => setDueToday(e.target.checked)}
            className="h-4 w-4 rounded border-2 border-[hsl(var(--input))] bg-[hsl(var(--surface))] accent-[hsl(var(--primary))]"
          />
          <label htmlFor="dueToday" className="text-sm text-[hsl(var(--text-medium))]">
            Due today
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-[0_12px_35px_-24px_hsl(220_70%_40%/0.7)] transition hover:shadow-[0_20px_45px_-24px_hsl(220_70%_40%/0.7)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]/60 focus-visible:outline-none"
        >
          Add Task
        </button>
      </form>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-3 rounded-[1.25rem] border border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/70 px-4 py-3 text-sm text-[hsl(var(--text-medium))] transition hover:border-[hsl(var(--primary))]/40 hover:bg-[hsl(var(--surface-hover))]"
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem({ itemId: item._id })}
                className="h-5 w-5 rounded-md border-2 border-[hsl(var(--input))] bg-[hsl(var(--surface))] accent-[hsl(var(--secondary))] transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--secondary))] focus-visible:ring-offset-1 focus-visible:ring-offset-[hsl(var(--background))]"
              />
              <div className="flex flex-1 flex-col">
                <span
                  className={`font-medium ${
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
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/55 px-6 py-10 text-center text-sm text-[hsl(var(--text-muted))]">
          No tasks yet. Use the form above to capture quick wins for today.
        </div>
      )}
    </div>
  );
}
