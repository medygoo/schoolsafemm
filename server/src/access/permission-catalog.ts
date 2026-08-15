import { readFileSync } from "node:fs";

const permissionPattern = /^[a-z][a-z0-9.-]+$/;

export function loadPermissionCatalog(): ReadonlySet<string> {
  const url = new URL("../../../shared/permissions.json", import.meta.url);
  const parsed: unknown = JSON.parse(readFileSync(url, "utf8"));

  if (!Array.isArray(parsed) || !parsed.every((value) => typeof value === "string")) {
    throw new Error("Permission catalog must be a string array");
  }

  const values = parsed as string[];
  if (values.some((value) => !permissionPattern.test(value))) {
    throw new Error("Permission catalog contains an invalid identifier");
  }

  const catalog = new Set(values);
  if (catalog.size !== values.length) {
    throw new Error("Permission catalog contains duplicates");
  }

  return catalog;
}
