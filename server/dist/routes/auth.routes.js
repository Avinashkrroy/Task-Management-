"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const apiResponse_1 = require("../utils/apiResponse");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (typeof username !== "string" || username.trim().length < 3) {
            return (0, apiResponse_1.sendError)(res, 400, "Username must be at least 3 characters");
        }
        if (typeof password !== "string" || password.length < 6) {
            return (0, apiResponse_1.sendError)(res, 400, "Password must be at least 6 characters");
        }
        const existing = await user_model_1.UserModel.findOne({ username: username.trim() });
        if (existing) {
            return (0, apiResponse_1.sendError)(res, 409, "Username is already taken");
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        await user_model_1.UserModel.create({
            username: username.trim(),
            passwordHash
        });
        return (0, apiResponse_1.sendSuccess)(res, undefined, "User registered successfully", 201);
    }
    catch (error) {
        return (0, apiResponse_1.sendError)(res, 500, "Failed to register user", error);
    }
});
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (typeof username !== "string" || typeof password !== "string") {
            return (0, apiResponse_1.sendError)(res, 400, "Username and password are required");
        }
        const user = await user_model_1.UserModel.findOne({ username: username.trim() });
        if (!user) {
            return (0, apiResponse_1.sendError)(res, 401, "Invalid credentials");
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            return (0, apiResponse_1.sendError)(res, 401, "Invalid credentials");
        }
        const token = (0, jwt_1.signToken)({
            userId: user._id.toString(),
            username: user.username
        });
        return (0, apiResponse_1.sendSuccess)(res, { token }, "Login successful");
    }
    catch (error) {
        return (0, apiResponse_1.sendError)(res, 500, "Failed to login", error);
    }
});
exports.default = router;
