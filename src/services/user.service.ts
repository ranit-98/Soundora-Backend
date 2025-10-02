import { MessageDocument } from "../models/message.model";
import { UserDocument } from "../models/user.model";
import { MessageRepository } from "../repositories/message.repository";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;
  private messageRepository: MessageRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.messageRepository = new MessageRepository();
  }

  async getAllUsers(currentUserId: string): Promise<UserDocument[]> {
    return this.userRepository.findAllExcept(currentUserId);
  }

  async getMessages(userId: string, currentUserId: string): Promise<MessageDocument[]> {
    return this.messageRepository.findByUsers(currentUserId, userId);
  }

  async getUserDetails(userId: string): Promise<UserDocument | null> {
    return this.userRepository.findById(userId);
  }

  async updateUserDetails(userId: string, updateData: Partial<UserDocument>): Promise<UserDocument | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return null;
    }
    if (updateData.fullName) user.fullName = updateData.fullName;
    if (updateData.imageUrl) user.imageUrl = updateData.imageUrl;
    return user.save();
  }
}