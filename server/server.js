const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { DrawingState } = require("./drawing-state");
const { RoomManager } = require("./rooms");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client"));

const drawingState = new DrawingState();
const roomManager = new RoomManager();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const user = roomManager.addUser(socket.id);
  io.emit("users", roomManager.getUsers());
  socket.emit("init", drawingState.getHistory());

  socket.on("draw", (data) => {
    drawingState.addStroke(data);
    io.emit("draw", data);
  });

  socket.on("undo", () => {
    drawingState.undo();
    io.emit("updateHistory", drawingState.getHistory());
  });

  socket.on("redo", () => {
    drawingState.redo();
    io.emit("updateHistory", drawingState.getHistory());
  });

  socket.on("clear", () => {
    drawingState.clear();
    io.emit("clear");
  });

  socket.on("disconnect", () => {
    roomManager.removeUser(socket.id);
    io.emit("users", roomManager.getUsers());
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
