import Fastify, { type FastifyInstance } from "fastify";

export type BuildAppOptions = {
  testRoutes?: boolean;
};

export function buildApp(_options: BuildAppOptions = {}): FastifyInstance {
  const app = Fastify({ logger: false });
  app.get("/health", async () => ({ status: "ok" as const }));
  return app;
}
