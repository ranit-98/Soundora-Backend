// backend/socket/index.ts
import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { MessageRepository } from "../repositories/message.repository";
import { MessageDocument } from "../models/message.model";
import { AppError } from "../middleware/error.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

interface SocketMessage {
  senderId: string; // _id from User
  receiverId: string; // _id from User
  content: string;
}

export const initializeSocket = (server: HttpServer): void => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSockets = new Map<string, string>(); // Maps _id to socket.id
  const userActivities = new Map<string, string>(); // Maps _id to activity
  const messageRepository = new MessageRepository();

  io.on("connection", (socket: Socket) => {
    socket.on("user_connected", (userId: string) => {
      console.log(`[SOCKET-BACKEND] User connected: ${userId}, Socket ID: ${socket.id} at ${new Date().toLocaleTimeString()}`);
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");
      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
      console.log(`[SOCKET-BACKEND] Emitted users_online:`, Array.from(userSockets.keys()));
    });

    socket.on("update_activity", ({ userId, activity }: { userId: string; activity: string }) => {
      console.log(`[SOCKET-BACKEND] Activity update for ${userId}: ${activity}`);
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data: SocketMessage) => {
      console.log(`[SOCKET-BACKEND] Received send_message:`, data);
      try {
        const message = await messageRepository.create({
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
          createdAt: new Date(),
        });

        console.log(`[SOCKET-BACKEND] Message saved:`, message);

        const receiverSocketId = userSockets.get(data.receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
          console.log(`[SOCKET-BACKEND] Emitted receive_message to ${data.receiverId} at socket ${receiverSocketId}`);
        }

        socket.emit("message_sent", message);
        console.log(`[SOCKET-BACKEND] Emitted message_sent to sender ${data.senderId}`);
      } catch (error) {
        console.error(`[SOCKET-BACKEND] Error saving message:`, error);
        socket.emit("message_error", (error as Error).message || MESSAGES.ERROR.SEND_MESSAGE);
      }
    });

    socket.on("fetch_messages", async ({ userId, otherUserId }: { userId: string; otherUserId: string }) => {
      console.log(`[SOCKET-BACKEND] Received fetch_messages for userId: ${userId}, otherUserId: ${otherUserId}`);
      try {
        const messages = await messageRepository.findByUsers(userId, otherUserId);
        console.log(`[SOCKET-BACKEND] Fetched ${messages.length} messages:`, messages);
        socket.emit("messages_fetched", messages);
      } catch (error) {
        console.error(`[SOCKET-BACKEND] Error fetching messages:`, error);
        socket.emit("message_error", (error as Error).message || "Failed to fetch messages");
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
        console.log(`[SOCKET-BACKEND] User disconnected: ${disconnectedUserId} at ${new Date().toLocaleTimeString()}`);
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};