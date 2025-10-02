import { Request, Response, NextFunction } from "express";
import { StatService } from "../services/stat.service";
import { HTTP_STATUS } from "../constants/httpStatus";

export class StatController {
  private statService: StatService;

  constructor() {
    this.statService = new StatService();
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await this.statService.getStats();
      res.status(HTTP_STATUS.OK).json(stats);
    } catch (error) {
      next(error);
    }
  }
}