import { Song, SongDocument } from "../models/song.model";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export class SongRepository {
  async findAll(): Promise<SongDocument[]> {
    return Song.find().sort({ createdAt: -1 }).exec();
  }

  async findRandom(size: number): Promise<SongDocument[]> {
    return Song.aggregate([
      { $sample: { size } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]).exec();
  }

  async findById(id: string): Promise<SongDocument | null> {
    return Song.findById(id).exec();
  }

  async create(songData: Partial<SongDocument>): Promise<SongDocument> {
    return Song.create(songData);
  }

  async delete(id: string): Promise<SongDocument | null> {
    const song = await Song.findById(id).exec();
    if (!song) {
      throw new AppError(MESSAGES.SONG_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    await Song.findByIdAndDelete(id).exec();
    return song;
  }

  async deleteByAlbumId(albumId: string): Promise<void> {
    await Song.deleteMany({ albumId }).exec();
  }
  async count(): Promise<number> {
    return Song.countDocuments().exec();
  }
  
}