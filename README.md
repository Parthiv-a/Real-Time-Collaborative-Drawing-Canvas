# Real-Time Collaborative Drawing Canvas

A real-time, multi-user collaborative drawing web app built using **Vanilla JavaScript**, **HTML5 Canvas**, and **Socket.io**.  
Multiple users can draw simultaneously on a shared canvas with live synchronization, global undo/redo, and user presence tracking.

---

##  Features

- **Live Drawing Sync** — Draw in one tab and see it appear instantly in all others.
- **Brush Controls** — Adjust brush color and size dynamically.
- **Global Undo/Redo** — Undo or redo actions reflect across all connected users.
- **Active Users List** — Shows currently connected users with assigned colors.
- **Clear Canvas** — One click clears the canvas globally for everyone.
- **Responsive Layout** — Scales for different screen sizes.

---

## Tech Stack

| Component | Technology |
|------------|-------------|
| Frontend | Vanilla JS, HTML5 Canvas, CSS |
| Backend | Node.js, Express, Socket.io |
| Communication | WebSockets (via Socket.io) |
| Architecture | Event-driven client-server model |

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Real-Time-Collaborative-Drawing-Canvas.git
   cd collaborative-canvas
2. Install the required dependencies:
   npm install
3. Start Command
   npm start

