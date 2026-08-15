import fs from "node:fs/promises";

const bundlePath = new URL("../app/vendor/supabase-sdk.js", import.meta.url);
const source = await fs.readFile(bundlePath, "utf8");

if (!source.includes("SchoolSafeSupabaseSDK")) {
  throw new Error("Auth bundle does not expose SchoolSafeSupabaseSDK");
}

const forbidden = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "service_role",
  "R2_SECRET_ACCESS_KEY",
  "VAPID_PRIVATE_KEY",
  "supabase.co/auth/v1",
];

for (const token of forbidden) {
  if (source.includes(token)) {
    throw new Error(`Forbidden secret/config marker in auth bundle: ${token}`);
  }
}

console.log("PASS auth bundle is self-contained and contains no privileged config markers");
