import mongoose, { Schema, Document } from "mongoose";

export interface SongDocument extends Document {
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const songSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    audioUrl: { type: String, required: true },
    duration: { type: Number, required: true },
    albumId: { type: Schema.Types.ObjectId, ref: "Album", required: false },
  },
  { timestamps: true }
);

export const Song = mongoose.model<SongDocument>("Song", songSchema);