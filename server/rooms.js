class RoomManager {
  constructor() {
    this.users = {};
  }

  addUser(id) {
    const color = this.randomColor();
    const name = "User-" + id.substring(0, 4);
    this.users[id] = { id, name, color };
    return this.users[id];
  }

  removeUser(id) {
    delete this.users[id];
  }

  getUsers() {
    return Object.values(this.users);
  }

  randomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

module.exports = { RoomManager };
