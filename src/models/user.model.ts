import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  fullName: string;
  imageUrl: string;
  googleId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);