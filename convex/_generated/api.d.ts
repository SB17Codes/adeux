/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as mutations_items from "../mutations/items.js";
import type * as mutations_lists from "../mutations/lists.js";
import type * as mutations_notes from "../mutations/notes.js";
import type * as queries_items from "../queries/items.js";
import type * as queries_lists from "../queries/lists.js";
import type * as queries_notes from "../queries/notes.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "mutations/items": typeof mutations_items;
  "mutations/lists": typeof mutations_lists;
  "mutations/notes": typeof mutations_notes;
  "queries/items": typeof queries_items;
  "queries/lists": typeof queries_lists;
  "queries/notes": typeof queries_notes;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
