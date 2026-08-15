import Fastify, { type FastifyInstance } from "fastify";
import { SchoolSafeError, type ApiErrorBody } from "./http/errors.js";
import { createRequestId } from "./http/request-id.js";

export type BuildAppOptions = {
  testRoutes?: boolean;
};

export function buildApp(options: BuildAppOptions = {}): FastifyInstance {
  const app = Fastify({ logger: false });

  app.setErrorHandler((error, _request, reply) => {
    const request_id = createRequestId();

    if (error instanceof SchoolSafeError) {
      const body: ApiErrorBody = {
        code: error.code,
        message: error.publicMessage,
        request_id,
        retryable: error.retryable
      };
      return reply.status(error.statusCode).send(body);
    }

    const body: ApiErrorBody = {
      code: "INTERNAL_ERROR",
      message: "Erreur interne",
      request_id,
      retryable: false
    };
    return reply.status(500).send(body);
  });

  app.get("/health", async () => ({ status: "ok" as const }));

  if (options.testRoutes === true) {
    app.get("/__test/error", async () => {
      throw new SchoolSafeError(
        400,
        "VALIDATION_INVALID",
        "Donnée invalide",
        false
      );
    });
  }

  return app;
}
