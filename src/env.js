/* eslint-disable unicorn/prevent-abbreviations */

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const isDev = process.env.NODE_ENV === 'development';
export const env = createEnv({
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENT_VAR: z.string(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    SHADOW_DATABASE_URL: isDev ? z.string().url() : z.string().url().optional(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes
   * (e.g. middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // client
    // NEXT_PUBLIC_CLIENT_VAR: process.env.NEXT_PUBLIC_CLIENT_VAR,

    // server
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});
