"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
const apiResponse_1 = require("../utils/apiResponse");
function authMiddleware(req, res, next) {
    const authHeader = req.header("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice("Bearer ".length).trim()
        : "";
    if (!token) {
        return (0, apiResponse_1.sendError)(res, 401, "Authorization token is required");
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.userId = decoded.userId;
        req.username = decoded.username;
        return next();
    }
    catch {
        return (0, apiResponse_1.sendError)(res, 401, "Invalid or expired token");
    }
}
