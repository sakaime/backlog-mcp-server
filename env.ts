import { z } from "zod";

const zEnv = z.object({
  BACKLOG_HOST: z.string().min(1),
  BACKLOG_API_KEY: z.string().min(1),
});

export const env = zEnv.parse(process.env);

declare module "bun" {
  interface Env extends z.infer<typeof zEnv> {}
}
