import { SongRepository } from "../repositories/song.repository";
import { AlbumRepository } from "../repositories/album.repository";
import { UserRepository } from "../repositories/user.repository";
import { Song } from "../models/song.model";

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}

export class StatService {
  private songRepository: SongRepository;
  private albumRepository: AlbumRepository;
  private userRepository: UserRepository;

  constructor() {
    this.songRepository = new SongRepository();
    this.albumRepository = new AlbumRepository();
    this.userRepository = new UserRepository();
  }

  async getStats(): Promise<Stats> {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
      this.songRepository.count(),
      this.albumRepository.count(),
      this.userRepository.count(),
      Song.aggregate([
        { $unionWith: { coll: "albums", pipeline: [] } },
        { $group: { _id: "$artist" } },
        { $count: "count" },
      ]),
    ]);

    return {
      totalSongs,
      totalAlbums,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    };
  }
}