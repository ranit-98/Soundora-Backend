import { SongRepository } from "../repositories/song.repository";
import { AlbumRepository } from "../repositories/album.repository";
import { Album, AlbumDocument } from "../models/album.model";
import { SongDocument } from "../models/song.model";
import cloudinary from "../lib/cloudinary";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import mongoose from "mongoose";

interface CloudinaryFile {
  tempFilePath: string;
}

export class AdminService {
  private songRepository: SongRepository;
  private albumRepository: AlbumRepository;

  constructor() {
    this.songRepository = new SongRepository();
    this.albumRepository = new AlbumRepository();
  }

  async uploadToCloudinary(file: CloudinaryFile): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",
      });
      return result.secure_url;
    } catch (error) {
      throw new AppError(MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }

  async createSong(
    data: {
      title: string;
      artist: string;
      albumId?: string;
      duration: number;
    },
    audioFile: CloudinaryFile,
    imageFile: CloudinaryFile
  ): Promise<SongDocument> {
    const [audioUrl, imageUrl] = await Promise.all([
      this.uploadToCloudinary(audioFile),
      this.uploadToCloudinary(imageFile),
    ]);

    const songData: Partial<SongDocument> = {
      title: data.title,
      artist: data.artist,
      audioUrl,
      imageUrl,
      duration: data.duration,
      albumId: data.albumId ? new mongoose.Types.ObjectId(data.albumId) : undefined,
    };

    const song = await this.songRepository.create(songData);

    if (songData.albumId) {
      await this.albumRepository.findById(songData.albumId.toString()); // Validate album exists
      await Album.findByIdAndUpdate(songData.albumId, {
        $push: { songs: song._id },
      });
    }

    return song;
  }

  async deleteSong(id: string): Promise<void> {
    const song = await this.songRepository.delete(id);
    if (song?.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
  }

  async createAlbum(
    data: { title: string; artist: string; releaseYear: number },
    imageFile: CloudinaryFile
  ): Promise<AlbumDocument> {
    const imageUrl = await this.uploadToCloudinary(imageFile);
    const albumData: Partial<AlbumDocument> = {
      title: data.title,
      artist: data.artist,
      imageUrl,
      releaseYear: data.releaseYear,
    };
    return this.albumRepository.create(albumData);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.songRepository.deleteByAlbumId(id);
    await this.albumRepository.delete(id);
  }
}