"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const task_model_1 = require("../models/task.model");
const auth_middleware_1 = require("../middleware/auth.middleware");
const apiResponse_1 = require("../utils/apiResponse");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get("/", async (req, res) => {
    try {
        const tasks = await task_model_1.TaskModel.find({ user: req.userId }).sort({
            createdAt: -1
        });
        return (0, apiResponse_1.sendSuccess)(res, { tasks });
    }
    catch (error) {
        return (0, apiResponse_1.sendError)(res, 500, "Failed to fetch tasks", error);
    }
});
router.post("/", async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (typeof title !== "string" || title.trim().length === 0) {
            return (0, apiResponse_1.sendError)(res, 400, "Title is required");
        }
        let taskStatus = "pending";
        if (typeof status === "string") {
            if (status !== "pending" && status !== "completed") {
                return (0, apiResponse_1.sendError)(res, 400, "Invalid status");
            }
            taskStatus = status;
        }
        const task = await task_model_1.TaskModel.create({
            title: title.trim(),
            description: typeof description === "string" ? description.trim() : undefined,
            status: taskStatus,
            user: new mongoose_1.default.Types.ObjectId(req.userId)
        });
        return (0, apiResponse_1.sendSuccess)(res, { task }, "Task created", 201);
    }
    catch (error) {
        return (0, apiResponse_1.sendError)(res, 500, "Failed to create task", error);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return (0, apiResponse_1.sendError)(res, 400, "Invalid task id");
        }
        const { title, description, status } = req.body;
        const update = {};
        if (typeof title === "string") {
            if (title.trim().length === 0) {
                return (0, apiResponse_1.sendError)(res, 400, "Title cannot be empty");
            }
            update.title = title.trim();
        }
        if (typeof description === "string") {
            update.description = description.trim();
        }
        if (typeof status === "string") {
            if (status !== "pending" && status !== "completed") {
                return (0, apiResponse_1.sendError)(res, 400, "Invalid status");
            }
            update.status = status;
        }
        const task = await task_model_1.TaskModel.findOneAndUpdate({ _id: id, user: req.userId }, update, { new: true });
        if (!task) {
            return (0, apiResponse_1.sendError)(res, 404, "Task not found");
        }
        return (0, apiResponse_1.sendSuccess)(res, { task }, "Task updated");
    }
    catch (error) {
        return (0, apiResponse_1.sendError)(res, 500, "Failed to update task", error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return (0, apiResponse_1.sendError)(res, 400, "Invalid task id");
        }
        const task = await task_model_1.TaskModel.findOneAndDelete({
            _id: id,
            user: req.userId
        });
        if (!task) {
            return (0, apiResponse_1.sendError)(res, 404, "Task not found");
        }
        return (0, apiResponse_1.sendSuccess)(res, undefined, "Task deleted");
    }
    catch (error) {
        return (0, apiResponse_1.sendError)(res, 500, "Failed to delete task", error);
    }
});
exports.default = router;
