import { query } from "../_generated/server";
import { v } from "convex/values";

export const getItemsByList = query({
  args: { listId: v.id("lists") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("items")
      .withIndex("by_list", (q) => q.eq("listId", args.listId))
      .order("desc")
      .collect();
  },
});

export const getTodayItems = query({
  args: { householdId: v.id("households") },
  handler: async (ctx, args) => {
    // Get all lists for household
    const lists = await ctx.db
      .query("lists")
      .withIndex("by_household", (q) => q.eq("householdId", args.householdId))
      .collect();

    const listIds = lists.map((l) => l._id);

    // Get all items from these lists
    const allItems = await Promise.all(
      listIds.map((listId) =>
        ctx.db
          .query("items")
          .withIndex("by_list", (q) => q.eq("listId", listId))
          .collect()
      )
    );

    const items = allItems.flat();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimestamp = tomorrow.getTime();

    // Filter: tasks due today or no dueDate, or unchecked groceries
    const todayItems = items.filter((item) => {
      const list = lists.find((l) => l._id === item.listId);
      if (!list) return false;

      if (list.kind === "groceries") {
        return !item.done;
      }

      if (list.kind === "todo") {
        // Due today or no due date
        if (!item.dueDate) return true;
        return item.dueDate >= todayTimestamp && item.dueDate < tomorrowTimestamp;
      }

      return false;
    });

    // Attach list info
    return todayItems.map((item) => ({
      ...item,
      list: lists.find((l) => l._id === item.listId),
    }));
  },
});
