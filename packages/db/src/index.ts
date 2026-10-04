export * from "./client.js"
export * as schema from "./schema/index.js"
export * from "./schema/index.js" // lets you do: import { user } from "@repo/db"
// Re-export helpers so every consumer uses the SAME drizzle-orm instance
export { eq, and, or, desc, asc, sql } from "drizzle-orm"
