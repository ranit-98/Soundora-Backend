// repositories/message.repository.ts
import { MessageDocument, MessageModel } from "../models/message.model";

export class MessageRepository {
  async create(data: {
    senderId: string; 
    receiverId: string;
    content: string;
    createdAt?: Date;
  }): Promise<MessageDocument> {
    try {
      const message = await MessageModel.create(data);
      return message;
    } catch (error) {
      console.error("Error in MessageRepository.create:", error);
      throw new Error("Failed to create message");
    }
  }

  async findByUsers(userId: string, otherUserId: string): Promise<MessageDocument[]> {
    try {
      const messages = await MessageModel.find({
        $or: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      }).sort({ createdAt: 1 });
      return messages;
    } catch (error) {
      console.error("Error in MessageRepository.findByUsers:", error);
      throw new Error("Failed to fetch messages");
    }
  }
}