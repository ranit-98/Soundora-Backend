import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AppError } from "../middleware/error.middleware";
import { MESSAGES } from "../constants/messages";

interface CustomRequest extends Request {
  user?: { id: string; email: string; isAdmin: boolean };
}

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }
      const users = await this.userService.getAllUsers(req.user.id);
      res.status(HTTP_STATUS.OK).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }
      const messages = await this.userService.getMessages(req.params.userId, req.user.id);
      res.status(HTTP_STATUS.OK).json(messages);
    } catch (error) {
      next(error);
    }
  }

  async getUserDetails(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }
      const user = await this.userService.getUserDetails(req.params.userId);
      if (!user) {
        throw new AppError(MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      }
      res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUserDetails(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new AppError(MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }
      if (req.user.id !== req.params.userId && !req.user.isAdmin) {
        throw new AppError(MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
      }
      const updatedUser = await this.userService.updateUserDetails(req.params.userId, req.body);
      if (!updatedUser) {
        throw new AppError(MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
      }
      res.status(HTTP_STATUS.OK).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}