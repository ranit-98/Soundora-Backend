// models/message.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface MessageDocument extends Document {
  senderId: string; // _id from User
  receiverId: string; // _id from User
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);