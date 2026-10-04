import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

export function createDb(connectionString: string) {
  const pool = new Pool({
    connectionString,
  })

  return drizzle({ client: pool })
}

export type Database = ReturnType<typeof createDb>
