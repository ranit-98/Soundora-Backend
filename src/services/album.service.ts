import { AlbumRepository } from "../repositories/album.repository";
import { AlbumDocument } from "../models/album.model";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class AlbumService {
  private albumRepository: AlbumRepository;

  constructor() {
    this.albumRepository = new AlbumRepository();
  }

  async getAllAlbums(): Promise<AlbumDocument[]> {
    return this.albumRepository.findAll();
  }

  async getAlbumById(id: string): Promise<AlbumDocument> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new AppError(MESSAGES.ALBUM_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return album;
  }
}