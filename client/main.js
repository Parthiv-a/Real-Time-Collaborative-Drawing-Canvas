import { setupSocket } from "./websocket.js";
import { initCanvas, remoteDraw, clearCanvas, applyUndoRedo } from "./canvas.js";

const userList = document.getElementById("users");

setupSocket(remoteDraw, clearCanvas, initCanvas, updateUsers, applyUndoRedo);

function updateUsers(users) {
  userList.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u.name;
    li.style.color = u.color;
    userList.appendChild(li);
  });
}
