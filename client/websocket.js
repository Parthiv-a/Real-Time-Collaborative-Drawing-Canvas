const socket = io();

export function setupSocket(onDraw, onClear, onInit, onUsersUpdate, onUndoRedo) {
  socket.on("init", onInit);
  socket.on("draw", onDraw);
  socket.on("clear", onClear);
  socket.on("users", onUsersUpdate);
  socket.on("updateHistory", onUndoRedo);
}

export function sendDraw(data) {
  socket.emit("draw", data);
}

export function sendClear() {
  socket.emit("clear");
}

export function sendUndo() {
  socket.emit("undo");
}

export function sendRedo() {
  socket.emit("redo");
}

export function getSocket() {
  return socket;
}
