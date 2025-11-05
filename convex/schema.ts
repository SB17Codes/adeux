import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    name: v.optional(v.string()),
    color: v.optional(v.string()),
  }).index("by_clerk_user_id", ["clerkUserId"]),

  households: defineTable({
    name: v.string(),
  }),

  memberships: defineTable({
    userId: v.id("users"),
    householdId: v.id("households"),
  })
    .index("by_user", ["userId"])
    .index("by_household", ["householdId"]),

  lists: defineTable({
    householdId: v.id("households"),
    title: v.string(),
    kind: v.union(v.literal("groceries"), v.literal("todo")),
    createdAt: v.number(),
  }).index("by_household", ["householdId"]),

  items: defineTable({
    listId: v.id("lists"),
    title: v.string(),
    done: v.boolean(),
    createdAt: v.number(),
    qty: v.optional(v.number()),
    assignedTo: v.optional(v.id("users")),
    dueDate: v.optional(v.number()),
  }).index("by_list", ["listId"]),

  notes: defineTable({
    householdId: v.id("households"),
    title: v.string(),
    content: v.string(),
    pinned: v.boolean(),
    createdAt: v.number(),
  }).index("by_household", ["householdId"]),
});
