import { query } from "../_generated/server";
import { v } from "convex/values";

export const getListsByHousehold = query({
  args: { householdId: v.id("households"), kind: v.optional(v.union(v.literal("groceries"), v.literal("todo"))) },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("lists")
      .withIndex("by_household", (q) => q.eq("householdId", args.householdId));

    const lists = await q.collect();

    if (args.kind) {
      return lists.filter((l) => l.kind === args.kind);
    }

    return lists;
  },
});

export const getList = query({
  args: { listId: v.id("lists") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.listId);
  },
});
