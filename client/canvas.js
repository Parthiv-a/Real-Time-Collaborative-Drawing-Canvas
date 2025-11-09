import { sendDraw, sendClear, sendUndo, sendRedo } from "./websocket.js";

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const width = Math.min(window.innerWidth * 0.8, 2000);
  const height = 850;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let drawing = false;
let color = document.getElementById("color").value;
let size = document.getElementById("size").value;
let history = [];

export function initCanvas(drawHistory) {
  history = drawHistory;
  redrawAll();
}

function drawDot({ x, y, color, size }) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
  ctx.fill();
}

canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const data = { x, y, color, size };
  drawDot(data);
  sendDraw(data);
});

document.getElementById("color").oninput = (e) => (color = e.target.value);
document.getElementById("size").oninput = (e) => (size = e.target.value);
document.getElementById("clear").onclick = () => sendClear();
document.getElementById("undo").onclick = () => sendUndo();
document.getElementById("redo").onclick = () => sendRedo();

export function redrawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.forEach(drawDot);
}

export function remoteDraw(data) {
  history.push(data);
  drawDot(data);
}

export function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history = [];
}

export function applyUndoRedo(newHistory) {
  history = newHistory;
  redrawAll();
}
