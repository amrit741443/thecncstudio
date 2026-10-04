import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"], // Add schema if sub-exported
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2022",
  external: ["drizzle-orm", "pg", "dotenv", "@repo/tsconfig"],
})
