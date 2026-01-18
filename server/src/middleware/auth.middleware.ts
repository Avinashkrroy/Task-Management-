import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/apiResponse";

export interface AuthRequest extends Request {
  userId?: string;
  username?: string;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  if (!token) {
    return sendError(res, 401, "Authorization token is required");
  }

  try {
    const decoded = verifyToken(token);

    req.userId = decoded.userId;
    req.username = decoded.username;

    return next();
  } catch {
    return sendError(res, 401, "Invalid or expired token");
  }
}

