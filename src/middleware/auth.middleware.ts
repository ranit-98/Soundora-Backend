import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { AppError } from "./error.middleware";

interface JwtPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError(MESSAGES.NO_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError(MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }
};

export const requireAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isAdmin) {
    throw new AppError(MESSAGES.ADMIN_REQUIRED, HTTP_STATUS.FORBIDDEN);
  }
  next();
};