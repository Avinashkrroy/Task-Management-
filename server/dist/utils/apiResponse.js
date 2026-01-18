"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(res, data, message, statusCode = 200) {
    const payload = {
        success: true,
        message,
        data
    };
    return res.status(statusCode).json(payload);
}
function sendError(res, statusCode, message, errors) {
    const payload = {
        success: false,
        message,
        errors
    };
    return res.status(statusCode).json(payload);
}
