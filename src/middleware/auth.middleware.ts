// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { HTTP_STATUS } from "../constants/httpStatus";
// import { MESSAGES } from "../constants/messages";
// import { AppError } from "./error.middleware";

// interface JwtPayload {
//   id: string;
//   email: string;
//   isAdmin: boolean;
// }

// interface CustomRequest extends Request {
//   user?: JwtPayload;
// }

// export const protectRoute = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     throw new AppError(MESSAGES.NO_TOKEN, HTTP_STATUS.UNAUTHORIZED);
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
//     req.user = decoded;
//     next();
//   } catch (error) {
//     throw new AppError(MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
//   }
// };

// export const requireAdmin = async (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.user?.isAdmin) {
//     throw new AppError(MESSAGES.ADMIN_REQUIRED, HTTP_STATUS.FORBIDDEN);
//   }
//   next();
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { AppError } from "./error.middleware";


// Ensure you use cookieParser in your app
// app.use(cookieParser());

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
  try {
    // Check Authorization header first, fallback to cookie
    let token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return next(new AppError(MESSAGES.NO_TOKEN, HTTP_STATUS.UNAUTHORIZED));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError(MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED));
  }
};

export const requireAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isAdmin) {
    return next(new AppError(MESSAGES.ADMIN_REQUIRED, HTTP_STATUS.FORBIDDEN));
  }
  next();
};
