import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { HTTP_STATUS } from "../constants/httpStatus";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async googleAuthCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      const { jwtToken } = await this.authService.googleAuth(token);
      res.status(HTTP_STATUS.OK).json({ success: true, token: jwtToken });
    } catch (error) {
      next(error);
    }
  }
}