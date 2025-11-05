import { query } from "../_generated/server";
import { v } from "convex/values";

export const getNotesByHousehold = query({
  args: { householdId: v.id("households"), pinnedOnly: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_household", (q) => q.eq("householdId", args.householdId))
      .order("desc")
      .collect();

    if (args.pinnedOnly) {
      return notes.filter((n) => n.pinned);
    }

    return notes;
  },
});
