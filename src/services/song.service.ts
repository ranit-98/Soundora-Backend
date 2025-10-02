import { SongRepository } from "../repositories/song.repository";
import { SongDocument } from "../models/song.model";

export class SongService {
  private songRepository: SongRepository;

  constructor() {
    this.songRepository = new SongRepository();
  }

  async getAllSongs(): Promise<SongDocument[]> {
    return this.songRepository.findAll();
  }

  async getFeaturedSongs(): Promise<SongDocument[]> {
    return this.songRepository.findRandom(6);
  }

  async getMadeForYouSongs(): Promise<SongDocument[]> {
    return this.songRepository.findRandom(4);
  }

  async getTrendingSongs(): Promise<SongDocument[]> {
    return this.songRepository.findRandom(4);
  }
}