import { createSecretKey } from "crypto";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const secretKey = createSecretKey(process.env.JWT_SECRET!, "utf-8");
