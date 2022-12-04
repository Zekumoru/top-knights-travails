const ChessVertex = require('./ChessVertex');

module.exports = class ChessGraph {
  #vertices;

  constructor() {
    this.#vertices = [];
    this.#createVertices();
  }

  get vertices() {
    return Object.freeze(this.#vertices);
  }

  #createVertices() {
    for (let i = 0; i < 8; i++) {
      const row = [];

      for (let j = 0; j < 8; j++) {
        const col = new ChessVertex(i, j);
        row.push(col);
      }

      this.#vertices.push(row);
    }
  }
};
