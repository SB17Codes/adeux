import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createList = mutation({
  args: {
    householdId: v.id("households"),
    title: v.string(),
    kind: v.union(v.literal("groceries"), v.literal("todo")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("lists", {
      householdId: args.householdId,
      title: args.title,
      kind: args.kind,
      createdAt: Date.now(),
    });
  },
});
