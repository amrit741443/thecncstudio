import { createDb } from "@repo/db"
import { createAuth } from "./server.js"

export const auth = createAuth(createDb(process.env.DATABASE_URL!), {
  secret: "cli",
  baseURL: "http://localhost:3000",
  trustedOrigins: [],
})
