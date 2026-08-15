import { expect, it } from "vitest";
import { buildApp } from "../src/app.js";

it("retourne 503 quand une dépendance requise n’est pas prête", async () => {
  const app = buildApp({
    readinessProbe: async () => ({ ready: false, dependency: "postgres" })
  });
  const response = await app.inject({ method: "GET", url: "/ready" });
  expect(response.statusCode).toBe(503);
  expect(response.json()).toMatchObject({
    code: "DEPENDENCY_UNAVAILABLE",
    retryable: true
  });
  await app.close();
});

it("retourne ready sans contacter la production par défaut", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "GET", url: "/ready" });
  expect(response.statusCode).toBe(200);
  expect(response.json()).toEqual({ status: "ready" });
  await app.close();
});
