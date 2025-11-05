"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export default function NoteList({ householdId }: { householdId: Id<"households"> }) {
  const notes = useQuery(api.queries.notes.getNotesByHousehold, {
    householdId,
    pinnedOnly: true,
  });
  const addNote = useMutation(api.mutations.notes.addNote);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addNote({
      householdId,
      title: title.trim(),
      content: content.trim(),
      pinned: true,
    });
    setTitle("");
    setContent("");
  };

  if (!notes)
    return (
      <div className="flex items-center justify-center py-10 text-sm text-[hsl(var(--text-muted))]">
        Loading notes…
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
          placeholder="Note title..."
          className="w-full border-none bg-transparent px-0 py-0 text-base text-[hsl(var(--text-high))] placeholder:text-[hsl(var(--text-muted))] focus-visible:outline-none"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content..."
          rows={3}
          className="min-h-[120px] w-full border border-[hsl(var(--input))]/60 bg-[hsl(var(--surface))] px-4 py-3 text-sm text-[hsl(var(--text-medium))] shadow-[inset_0_12px_28px_-26px_hsl(220_70%_20%/0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]/45"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--secondary))] to-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-[0_12px_35px_-24px_hsl(330_70%_50%/0.6)] transition hover:shadow-[0_18px_45px_-24px_hsl(330_70%_50%/0.7)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]/60 focus-visible:outline-none"
        >
          Add Note
        </button>
      </form>

      {notes.length > 0 ? (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="rounded-[1.5rem] border border-[hsl(var(--accent))]/35 bg-[hsl(var(--accent))]/12 p-5 text-sm shadow-[0_18px_45px_-32px_hsl(330_70%_50%/0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-35px_hsl(330_70%_50%/0.55)]"
            >
              <h3 className="text-base font-semibold text-[hsl(var(--text-high))]">
                {note.title}
              </h3>
              <p className="mt-2 whitespace-pre-wrap text-sm text-[hsl(var(--text-medium))]">
                {note.content || "No details yet."}
              </p>
              <div className="mt-3 text-[0.7rem] uppercase tracking-wide text-[hsl(var(--text-muted))]">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-[hsl(var(--border))]/35 bg-[hsl(var(--surface))]/55 px-6 py-10 text-center text-sm text-[hsl(var(--text-muted))]">
          No notes pinned yet. Add a quick reminder above to keep everyone aligned.
        </div>
      )}
    </div>
  );
}
