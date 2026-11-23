import { z } from 'zod';

const schema = z.object({
  appEnv: z.enum(['development', 'staging', 'production']),
  apiUrl: z.url(),
});

export type AppEnv = z.infer<typeof schema>;

export const parseAppEnv = (raw: Record<keyof AppEnv, string | undefined>): AppEnv => schema.parse(raw);
