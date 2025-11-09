# Architecture Overview — Real-Time Collaborative Drawing Canvas

This document explains how the Collaborative Drawing Canvas works internally, including data flow, real-time communication via WebSockets, undo/redo logic, and conflict handling strategies.



## Data Flow Diagram

 User A/B  ──> Draw ──>  Socket.io Client  ── Event ──>   Node.js WebSocket Server
    
     ↑                      ↓                                   ↓
     │                 Canvas Update   ←──────       Broadcast Event ←─|
     └─────────────────────────────────────────────────────────────────┘

### Flow Description**
1. A user performs a drawing action on their canvas.
2. The client emits a `draw` event to the server via Socket.io.
3. The server updates its global canvas state and broadcasts the event to all connected clients.
4. Each client receives the event and renders the new stroke on its local canvas.
5. The same flow applies for `clear`, `undo`, and `redo` operations.

---

## WebSocket Protocol (Message Structure)

| **Event Name** | **Direction** | **Payload Example** | **Description** |
|----------------|----------------|----------------------|------------------|
| `init` | Server → Client | `[ {x, y, color, size}, ... ]` | Sends the full existing drawing history to a newly joined user. |
| `draw` | Client → Server → All | `{x:120, y:340, color:"#ff0000", size:5}` | Broadcasts a single drawing point to all connected clients. |
| `clear` | Client → Server → All | none | Clears the canvas for all users. |
| `undo` | Client → Server → All | none | Removes the last stroke globally from the shared history. |
| `redo` | Client → Server → All | none | Restores the most recent undone stroke globally. |
| `updateHistory` | Server → All | `[ {x, y, color, size}, ... ]` | Sends updated canvas history to all clients after undo/redo. |
| `users` | Server → All | `[ { id, name, color } ]` | Updates the list of currently connected users. |

---

## Undo/Redo Strategy

### Concept
Undo/Redo actions are handled globally by the server, ensuring that all clients maintain a consistent view of the shared canvas.