"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI || "";
const jwtSecret = process.env.JWT_SECRET || "";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
}
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}
exports.env = {
    mongoUri,
    jwtSecret,
    port
};
