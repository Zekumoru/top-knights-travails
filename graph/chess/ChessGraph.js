const Vertex = require('./Vertex');

module.exports = class ChessGraph {
  static #SIZE = 8;

  #vertices;

  constructor() {
    this.#vertices = [];
    this.#createVertices();
  }

  static get SIZE() {
    return ChessGraph.#SIZE;
  }

  get vertices() {
    return Object.freeze(this.#vertices);
  }

  addNeighbor([startRow, startCol], [endRow, endCol]) {
    if (startRow == null || startCol == null) return;
    if (endRow == null || endCol == null) return;

    if (startRow < 0 || startRow >= ChessGraph.#SIZE) return;
    if (startCol < 0 || startCol >= ChessGraph.#SIZE) return;
    if (endRow < 0 || endRow >= ChessGraph.#SIZE) return;
    if (endCol < 0 || endCol >= ChessGraph.#SIZE) return;

    const start = this.#vertices[startRow][startCol];
    const end = this.#vertices[endRow][endCol];

    start.addNeighbor(end);
  }

  #createVertices() {
    for (let i = 0; i < ChessGraph.#SIZE; i++) {
      const row = [];

      for (let j = 0; j < ChessGraph.#SIZE; j++) {
        const col = new Vertex(i, j);
        col.value = `(${j}, ${i})`;
        row.push(col);
      }

      this.#vertices.push(row);
    }
  }

  toString() {
    const rows = [];

    for (let i = 0; i < ChessGraph.#SIZE; i++) {
      const row = [];

      for (let j = 0; j < ChessGraph.#SIZE; j++) {
        const vertex = this.#vertices[i][j];
        const col = `    ${vertex.toString()}`;
        row.push(col);
      }

      rows.push(`  [\n${row.join(',\n')}\n  ]`);
    }

    return `[\n${rows.join(',\n')}\n]`;
  }
};
