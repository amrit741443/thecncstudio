import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import type * as _zod from "zod/v4/core"
import { schema, type Database } from "@repo/db"
// your drizzle instance
import { admin } from "better-auth/plugins/admin"

export interface AuthOptions {
  secret: string
  baseURL: string
  trustedOrigins: string[]
}

export function createAuth(db: Database, options: AuthOptions) {
  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema }),
    secret: options.secret,
    baseURL: options.baseURL,
    trustedOrigins: options.trustedOrigins,
    emailAndPassword: { enabled: true },
    plugins: [admin()],
  })
}

export type Auth = ReturnType<typeof createAuth>
