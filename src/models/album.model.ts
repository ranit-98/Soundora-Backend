import mongoose, { Schema, Document } from "mongoose";

export interface AlbumDocument extends Document {
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const albumSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

export const Album = mongoose.model<AlbumDocument>("Album", albumSchema);