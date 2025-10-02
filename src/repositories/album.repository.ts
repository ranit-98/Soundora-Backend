import { Album, AlbumDocument } from "../models/album.model";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class AlbumRepository {
  async findAll(): Promise<AlbumDocument[]> {
    return Album.find().exec();
  }

  async findById(id: string): Promise<AlbumDocument | null> {
    return Album.findById(id).populate("songs").exec();
  }

  async create(albumData: Partial<AlbumDocument>): Promise<AlbumDocument> {
    return Album.create(albumData);
  }

  async delete(id: string): Promise<void> {
    const album = await Album.findById(id).exec();
    if (!album) {
      throw new AppError(MESSAGES.ALBUM_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    await Album.findByIdAndDelete(id).exec();
  }

    async count(): Promise<number> {
      return Album.countDocuments().exec();
    }
}