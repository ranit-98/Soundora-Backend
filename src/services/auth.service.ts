
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../middleware/error.middleware";
import { UserRepository } from "../repositories/user.repository";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async googleAuth(token: string): Promise<{ jwtToken: string; userId: string; googleId: string; isAdmin: boolean }> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new AppError(MESSAGES.INVALID_GOOGLE_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    }

    const { sub, name, picture, email } = payload;

    let user = await this.userRepository.findByGoogleId(sub);
    if (!user) {
      user = await this.userRepository.create({
        googleId: sub,
        fullName: name || "Unknown",
        imageUrl: picture || "",
        email: email || "",
      });
    }

    const isAdmin = user.email === process.env.ADMIN_EMAIL;

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return {
      jwtToken,
      userId: user?._id.toString(),
      googleId: sub,
      isAdmin,
    };
  }
}