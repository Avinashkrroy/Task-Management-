import { Router } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { sendError, sendSuccess } from "../utils/apiResponse";
import { signToken } from "../utils/jwt";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body as {
      username?: unknown;
      password?: unknown;
    };

    if (typeof username !== "string" || username.trim().length < 3) {
      return sendError(res, 400, "Username must be at least 3 characters");
    }

    if (typeof password !== "string" || password.length < 6) {
      return sendError(res, 400, "Password must be at least 6 characters");
    }

    const existing = await UserModel.findOne({ username: username.trim() });

    if (existing) {
      return sendError(res, 409, "Username is already taken");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await UserModel.create({
      username: username.trim(),
      passwordHash
    });

    return sendSuccess(res, undefined, "User registered successfully", 201);
  } catch (error) {
    return sendError(res, 500, "Failed to register user", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body as {
      username?: unknown;
      password?: unknown;
    };

    if (typeof username !== "string" || typeof password !== "string") {
      return sendError(res, 400, "Username and password are required");
    }

    const user = await UserModel.findOne({ username: username.trim() });

    if (!user) {
      return sendError(res, 401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return sendError(res, 401, "Invalid credentials");
    }

    const token = signToken({
      userId: user._id.toString(),
      username: user.username
    });

    return sendSuccess(res, { token }, "Login successful");
  } catch (error) {
    return sendError(res, 500, "Failed to login", error);
  }
});

export default router;

