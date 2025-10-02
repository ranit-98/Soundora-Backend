import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { MessageRepository } from "../repositories/message.repository";
import { MessageDocument } from "../models/message.model";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

interface SocketMessage {
  senderId: string;
  receiverId: string;
  content: string;
}

export const initializeSocket = (server: HttpServer): void => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSockets = new Map<string, string>();
  const userActivities = new Map<string, string>();
  const messageRepository = new MessageRepository();

  io.on("connection", (socket: Socket) => {
    socket.on("user_connected", (userId: string) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");
      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
    });

    socket.on("update_activity", ({ userId, activity }: { userId: string; activity: string }) => {
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data: SocketMessage) => {
      try {
        const message = await messageRepository.create({
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
        });

        const receiverSocketId = userSockets.get(data.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        socket.emit("message_error", (error as Error).message);
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUserId: string | undefined;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};