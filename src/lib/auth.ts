import crypto from "crypto";

const AUTH_SECRET = process.env.AUTH_SECRET || "prugio-admin-secret-key-2025";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234";

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateToken(): string {
  const payload = `admin:${Date.now()}`;
  const hmac = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");
  const encoded = Buffer.from(payload).toString("base64");
  return `${encoded}.${hmac}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const [encoded, hmac] = token.split(".");
    if (!encoded || !hmac) return false;
    const payload = Buffer.from(encoded, "base64").toString("utf8");
    const expectedHmac = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(payload)
      .digest("hex");

    if (hmac !== expectedHmac) return false;

    const timestamp = parseInt(payload.split(":")[1]);
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) return false;

    return true;
  } catch {
    return false;
  }
}
