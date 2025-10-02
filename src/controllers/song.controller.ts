import { Request, Response, NextFunction } from "express";
import { SongService } from "../services/song.service";
import { HTTP_STATUS } from "../constants/httpStatus";

export class SongController {
  private songService: SongService;

  constructor() {
    this.songService = new SongService();
  }

  async getAllSongs(req: Request, res: Response, next: NextFunction) {
    try {
      const songs = await this.songService.getAllSongs();
      res.status(HTTP_STATUS.OK).json(songs);
    } catch (error) {
      next(error);
    }
  }

  async getFeaturedSongs(req: Request, res: Response, next: NextFunction) {
    try {
      const songs = await this.songService.getFeaturedSongs();
      res.status(HTTP_STATUS.OK).json(songs);
    } catch (error) {
      next(error);
    }
  }

  async getMadeForYouSongs(req: Request, res: Response, next: NextFunction) {
    try {
      const songs = await this.songService.getMadeForYouSongs();
      res.status(HTTP_STATUS.OK).json(songs);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingSongs(req: Request, res: Response, next: NextFunction) {
    try {
      const songs = await this.songService.getTrendingSongs();
      res.status(HTTP_STATUS.OK).json(songs);
    } catch (error) {
      next(error);
    }
  }
}