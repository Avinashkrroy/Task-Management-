import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGODB_URI || "";
const jwtSecret = process.env.JWT_SECRET || "";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined");
}

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

export const env = {
  mongoUri,
  jwtSecret,
  port
};

