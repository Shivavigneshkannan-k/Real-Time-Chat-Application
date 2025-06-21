import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();
const server = createServer(app);
import dotenv from "dotenv";
dotenv.config();
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS
  }
});
const userSocketMap = new Map();
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    console.error("No userId provided in socket connection");
    return;
  }

  userSocketMap.set(userId, socket.id);
  io.emit("activeUsers", Array.from(userSocketMap.keys()));
  console.log("connected to socket",Array.from(userSocketMap.keys()) );
  socket.on("newMessage", (data) => {
    console.log(data);
    socket.to(userSocketMap.get(data.toUserId)).emit("recieveMessage", {
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
      content: data.content,
      photoPublicId: data.photoPublicId,
      photoUrl: data.photoUrl
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected from socket", socket.id);
    if (userSocketMap.has(userId)) {
      userSocketMap.delete(userId);
      io.emit("activeUsers", Array.from(userSocketMap.keys()));
    }
  });
});
export { server, app, express };
