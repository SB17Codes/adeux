import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addNote = mutation({
  args: {
    householdId: v.id("households"),
    title: v.string(),
    content: v.string(),
    pinned: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notes", {
      householdId: args.householdId,
      title: args.title,
      content: args.content,
      pinned: args.pinned,
      createdAt: Date.now(),
    });
  },
});

export const togglePin = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.noteId);
    if (!note) throw new Error("Note not found");

    await ctx.db.patch(args.noteId, {
      pinned: !note.pinned,
    });
  },
});

export const deleteNote = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.noteId);
  },
});
