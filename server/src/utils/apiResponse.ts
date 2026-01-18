import { Response } from "express";

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data?: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: unknown;
}

export function sendSuccess<T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode = 200
) {
  const payload: ApiSuccess<T> = {
    success: true,
    message,
    data
  };

  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  errors?: unknown
) {
  const payload: ApiError = {
    success: false,
    message,
    errors
  };

  return res.status(statusCode).json(payload);
}

