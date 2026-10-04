import { createAuthClient } from "better-auth/client"
import { adminClient } from "better-auth/client/plugins"
import type * as _zod from "zod/v4/core"

export const authClient = createAuthClient({
  plugins: [adminClient()],
})
