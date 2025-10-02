import { Request, Response, NextFunction } from "express";
import { AlbumService } from "../services/album.service";
import { HTTP_STATUS } from "../constants/httpStatus";

export class AlbumController {
  private albumService: AlbumService;

  constructor() {
    this.albumService = new AlbumService();
  }

  async getAllAlbums(req: Request, res: Response, next: NextFunction) {
    try {
      const albums = await this.albumService.getAllAlbums();
      res.status(HTTP_STATUS.OK).json(albums);
    } catch (error) {
      next(error);
    }
  }

  async getAlbumById(req: Request, res: Response, next: NextFunction) {
    try {
      const album = await this.albumService.getAlbumById(req.params.albumId);
      res.status(HTTP_STATUS.OK).json(album);
    } catch (error) {
      next(error);
    }
  }
}