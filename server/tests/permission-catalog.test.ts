import { expect, it } from "vitest";
import { loadPermissionCatalog } from "../src/access/permission-catalog.js";

const required = [
  "session.bootstrap",
  "school.class.read",
  "school.student.read",
  "school.guardian.read",
  "school.guardian.manage",
  "security.pickup.read",
  "security.pickup.manage",
  "finance.status.read",
  "sync.submit",
  "file.upload",
  "file.download",
  "notification.subscribe"
];

it("charge un catalogue stable, unique et bien formé", () => {
  const catalog = loadPermissionCatalog();
  for (const permission of required) {
    expect(catalog.has(permission)).toBe(true);
  }
  expect([...catalog].every((id) => /^[a-z][a-z0-9.-]+$/.test(id))).toBe(true);
  expect(catalog.size).toBe(required.length);
});
