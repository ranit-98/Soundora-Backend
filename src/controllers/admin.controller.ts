import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services/admin.service";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { UploadedFile } from "express-fileupload";

interface CloudinaryFile {
  tempFilePath: string;
}

interface CustomRequest extends Request {
  files?: Partial<{
    audioFile: UploadedFile;
    imageFile: UploadedFile;
  }>;
  user?: { id: string; email: string; isAdmin: boolean };
}

export class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  async createSong(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.files?.audioFile || !req.files?.imageFile) {
        throw new AppError(MESSAGES.FILES_REQUIRED, HTTP_STATUS.BAD_REQUEST);
      }
      const { title, artist, albumId, duration } = req.body;
      const song = await this.adminService.createSong(
        { title, artist, albumId, duration: Number(duration) },
        req.files.audioFile,
        req.files.imageFile
      );
      res.status(HTTP_STATUS.CREATED).json(song);
    } catch (error) {
      next(error);
    }
  }

  async deleteSong(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      await this.adminService.deleteSong(req.params.id);
      res.status(HTTP_STATUS.OK).json({ message: MESSAGES.SONG_DELETED });
    } catch (error) {
      next(error);
    }
  }

  async createAlbum(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (!req.files?.imageFile) {
        throw new AppError(MESSAGES.FILES_REQUIRED, HTTP_STATUS.BAD_REQUEST);
      }
      const { title, artist, releaseYear } = req.body;
      const album = await this.adminService.createAlbum(
        { title, artist, releaseYear: Number(releaseYear) },
        req.files.imageFile
      );
      res.status(HTTP_STATUS.CREATED).json(album);
    } catch (error) {
      next(error);
    }
  }

  async deleteAlbum(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      await this.adminService.deleteAlbum(req.params.id);
      res.status(HTTP_STATUS.OK).json({ message: MESSAGES.ALBUM_DELETED });
    } catch (error) {
      next(error);
    }
  }

  async checkAdmin(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      res.status(HTTP_STATUS.OK).json({ admin: true });
    } catch (error) {
      next(error);
    }
  }
}