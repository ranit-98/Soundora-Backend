import { UserRepository } from "../repositories/user.repository";
import { MessageRepository } from "../repositories/message.repository";
import { UserDocument } from "../models/user.model";
import { MessageDocument } from "../models/message.model";

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
}