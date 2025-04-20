import { type } from "arktype";

const arkEnv = type({
  BACKLOG_HOST: "string > 0",
  BACKLOG_API_KEY: "string > 0",
});

const env = arkEnv.assert(Bun.env);

type ArkType = typeof env;

declare module "bun" {
  interface Env extends ArkType {}
}
