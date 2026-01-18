import express, { Request, Response } from "express";
import { env } from "./config/env";
import { connectDb } from "./config/db";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";
import { sendError } from "./utils/apiResponse";

async function bootstrap() {
  await connectDb();

  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/tasks", taskRouter);

  app.use((_req, res) => {
    return sendError(res, 404, "Route not found");
  });

  app.use((error: unknown, _req: Request, res: Response) => {
    return sendError(res, 500, "Internal server error", error);
  });

  app.listen(env.port, () => {
    process.stdout.write(`Server listening on port ${env.port}\n`);
  });
}

bootstrap().catch(error => {
  process.stderr.write(
    `Failed to start server: ${
      error instanceof Error ? error.message : String(error)
    }\n`
  );
  process.exit(1);
});
