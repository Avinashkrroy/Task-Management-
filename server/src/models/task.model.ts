import mongoose from "mongoose";

export type TaskStatus = "pending" | "completed";

export interface TaskDocument extends mongoose.Document {
  title: string;
  description?: string;
  status: TaskStatus;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);

