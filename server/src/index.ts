import { buildApp } from "./app.js";
import { createSupabaseAuthVerifier } from "./auth/supabase.js";
import { createBootstrapService } from "./bootstrap/service.js";
import { parseEnv } from "./config/env.js";

const env = parseEnv(process.env);
const app = buildApp({
  bootstrap: {
    authVerifier: createSupabaseAuthVerifier(env.SUPABASE_URL, env.SUPABASE_ANON_KEY),
    service: createBootstrapService(env.SUPABASE_URL, env.SUPABASE_ANON_KEY),
  },
});

await app.listen({ host: env.HOST, port: env.PORT });
