import { expect, it } from "vitest";
import { parseEnv } from "../src/config/env.js";

it("refuse une configuration serveur sans URL Supabase", () => {
  expect(() => parseEnv({ NODE_ENV: "test" })).toThrow(/SUPABASE_URL/);
});
