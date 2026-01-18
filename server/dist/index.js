"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const apiResponse_1 = require("./utils/apiResponse");
async function bootstrap() {
    await (0, db_1.connectDb)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/health", (_req, res) => {
        res.json({ status: "ok" });
    });
    app.use("/api/auth", auth_routes_1.default);
    app.use("/api/tasks", task_routes_1.default);
    app.use((_req, res) => {
        return (0, apiResponse_1.sendError)(res, 404, "Route not found");
    });
    app.use((error, _req, res) => {
        return (0, apiResponse_1.sendError)(res, 500, "Internal server error", error);
    });
    app.listen(env_1.env.port, () => {
        process.stdout.write(`Server listening on port ${env_1.env.port}\n`);
    });
}
bootstrap().catch(error => {
    process.stderr.write(`Failed to start server: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
});
