import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
  username: string;
}

export function signToken(payload: JwtPayload, expiresIn: SignOptions["expiresIn"] = "1h") {
  const options: SignOptions = { expiresIn };

  return jwt.sign(payload, env.jwtSecret, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}
