import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addItem = mutation({
  args: {
    listId: v.id("lists"),
    title: v.string(),
    qty: v.optional(v.number()),
    dueDate: v.optional(v.number()),
    assignedTo: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("items", {
      listId: args.listId,
      title: args.title,
      done: false,
      createdAt: Date.now(),
      qty: args.qty,
      dueDate: args.dueDate,
      assignedTo: args.assignedTo,
    });
  },
});

export const toggleItem = mutation({
  args: { itemId: v.id("items") },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.itemId);
    if (!item) throw new Error("Item not found");

    await ctx.db.patch(args.itemId, {
      done: !item.done,
    });
  },
});

export const deleteItem = mutation({
  args: { itemId: v.id("items") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.itemId);
  },
});
