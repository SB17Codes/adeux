import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Auth } from "convex/server";

// Get or create user from Clerk auth
export const getOrCreateUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("[getOrCreateUser] Called with identity:", identity?.subject || "none");
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const clerkUserId = identity.subject;

    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    if (existingUser) {
      console.log("[getOrCreateUser] Existing user found:", existingUser._id);
      return existingUser._id;
    }

    // Create new user
    console.log("[getOrCreateUser] Creating new user");
    const userId = await ctx.db.insert("users", {
      clerkUserId,
      name: identity.name || identity.email?.split("@")[0] || "User",
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });

    console.log("[getOrCreateUser] New user created:", userId);
    return userId;
  },
});

// Ensure household exists and seed lists
export const ensureHouseholdSeed = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("[ensureHouseholdSeed] Called with identity:", identity?.subject || "none");
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const clerkUserId = identity.subject;

    // Get user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    console.log("[ensureHouseholdSeed] User found:", !!user);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if user has household
    const membership = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    console.log("[ensureHouseholdSeed] Existing membership:", !!membership);
    if (membership) {
      console.log("[ensureHouseholdSeed] Returning existing household:", membership.householdId);
      return membership.householdId;
    }

    // Create household
    const householdId = await ctx.db.insert("households", {
      name: "Seif & Khadija",
    });

    // Create membership
    await ctx.db.insert("memberships", {
      userId: user._id,
      householdId,
    });

    // Create default lists
    const groceryListId = await ctx.db.insert("lists", {
      householdId,
      title: "Courses",
      kind: "groceries",
      createdAt: Date.now(),
    });

    const todoListId = await ctx.db.insert("lists", {
      householdId,
      title: "Tâches",
      kind: "todo",
      createdAt: Date.now(),
    });

    return householdId;
  },
});

// Get current user's household
export const getCurrentUserHousehold = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("[getCurrentUserHousehold] Identity:", identity?.subject || "none");
    if (!identity) {
      console.log("[getCurrentUserHousehold] No identity, returning null");
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", identity.subject))
      .first();

    console.log("[getCurrentUserHousehold] User found:", !!user);
    if (!user) {
      return null;
    }

    const membership = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    console.log("[getCurrentUserHousehold] Membership found:", !!membership, "householdId:", membership?.householdId);
    if (!membership) {
      return null;
    }

    return membership.householdId;
  },
});

// Get current user info
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", identity.subject))
      .first();

    return user;
  },
});
