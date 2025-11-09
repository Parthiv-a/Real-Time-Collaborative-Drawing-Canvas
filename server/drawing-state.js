class DrawingState {
  constructor() {
    this.history = [];
    this.redoStack = [];
  }

  addStroke(stroke) {
    this.history.push(stroke);
    this.redoStack = []; 
  }

  undo() {
    if (this.history.length > 0) {
      const last = this.history.pop();
      this.redoStack.push(last);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const restored = this.redoStack.pop();
      this.history.push(restored);
    }
  }

  getHistory() {
    return this.history;
  }

  clear() {
    this.history = [];
    this.redoStack = [];
  }
}

module.exports = { DrawingState };
