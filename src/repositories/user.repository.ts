import { User, UserDocument } from "../models/user.model";

export class UserRepository {
  async findByGoogleId(googleId: string): Promise<UserDocument | null> {
    return User.findOne({ googleId }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return User.findById(id).exec();
  }

  async create(userData: Partial<UserDocument>): Promise<UserDocument> {
    return User.create(userData);
  }

  async findAllExcept(userId: string): Promise<UserDocument[]> {
    return User.find({ googleId: { $ne: userId } }).exec();
  }

  async count(): Promise<number> {
    return User.countDocuments().exec();
  }
}