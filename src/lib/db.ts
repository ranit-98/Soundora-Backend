import mongoose from "mongoose";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new AppError(MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};