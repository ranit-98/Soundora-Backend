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
      console.log("Google ID token:", token);
      const { jwtToken, userId, googleId, isAdmin } = await this.authService.googleAuth(token);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        token: jwtToken,
        userId,
        googleId,
        isAdmin,
      });
    } catch (error) {
      next(error);
    }
  }
}