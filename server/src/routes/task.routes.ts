import { Router } from "express";
import mongoose from "mongoose";
import { TaskModel, TaskStatus } from "../models/task.model";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { sendError, sendSuccess } from "../utils/apiResponse";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const tasks = await TaskModel.find({ user: req.userId }).sort({
      createdAt: -1
    });

    return sendSuccess(res, { tasks });
  } catch (error) {
    return sendError(res, 500, "Failed to fetch tasks", error);
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { title, description, status } = req.body as {
      title?: unknown;
      description?: unknown;
      status?: unknown;
    };

    if (typeof title !== "string" || title.trim().length === 0) {
      return sendError(res, 400, "Title is required");
    }

    let taskStatus: TaskStatus = "pending";

    if (typeof status === "string") {
      if (status !== "pending" && status !== "completed") {
        return sendError(res, 400, "Invalid status");
      }
      taskStatus = status;
    }

    const task = await TaskModel.create({
      title: title.trim(),
      description:
        typeof description === "string" ? description.trim() : undefined,
      status: taskStatus,
      user: new mongoose.Types.ObjectId(req.userId)
    });

    return sendSuccess(res, { task }, "Task created", 201);
  } catch (error) {
    return sendError(res, 500, "Failed to create task", error);
  }
});

router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return sendError(res, 400, "Invalid task id");
    }

    const { title, description, status } = req.body as {
      title?: unknown;
      description?: unknown;
      status?: unknown;
    };

    const update: Partial<{
      title: string;
      description: string;
      status: TaskStatus;
    }> = {};

    if (typeof title === "string") {
      if (title.trim().length === 0) {
        return sendError(res, 400, "Title cannot be empty");
      }
      update.title = title.trim();
    }

    if (typeof description === "string") {
      update.description = description.trim();
    }

    if (typeof status === "string") {
      if (status !== "pending" && status !== "completed") {
        return sendError(res, 400, "Invalid status");
      }
      update.status = status;
    }

    const task = await TaskModel.findOneAndUpdate(
      { _id: id, user: req.userId },
      update,
      { new: true }
    );

    if (!task) {
      return sendError(res, 404, "Task not found");
    }

    return sendSuccess(res, { task }, "Task updated");
  } catch (error) {
    return sendError(res, 500, "Failed to update task", error);
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return sendError(res, 400, "Invalid task id");
    }

    const task = await TaskModel.findOneAndDelete({
      _id: id,
      user: req.userId
    });

    if (!task) {
      return sendError(res, 404, "Task not found");
    }

    return sendSuccess(res, undefined, "Task deleted");
  } catch (error) {
    return sendError(res, 500, "Failed to delete task", error);
  }
});

export default router;

