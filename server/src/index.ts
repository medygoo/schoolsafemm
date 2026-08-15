import { buildApp } from "./app.js";
import { parseEnv } from "./config/env.js";

const env = parseEnv(process.env);
const app = buildApp();

await app.listen({ host: env.HOST, port: env.PORT });
