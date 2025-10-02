import { Message, MessageDocument } from "../models/message.model";

export class MessageRepository {
  async create(messageData: Partial<MessageDocument>): Promise<MessageDocument> {
    return Message.create(messageData);
  }

  async findByUsers(senderId: string, receiverId: string): Promise<MessageDocument[]> {
    return Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .exec();
  }
}