const ChessVertex = require('./ChessVertex');

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

    if (startRow < 0 || endRow < 0) throw new RangeError('Vertex out of bounds');
    if (startCol > ChessGraph.#SIZE || endCol > ChessGraph.#SIZE) throw new RangeError('Vertex out of bounds');

    const start = this.#vertices[startRow][startCol];
    const end = this.#vertices[endRow][endCol];

    start.addNeighbor(end);
  }

  #createVertices() {
    for (let i = 0; i < ChessGraph.#SIZE; i++) {
      const row = [];

      for (let j = 0; j < ChessGraph.#SIZE; j++) {
        const col = new ChessVertex(i, j);
        col.value = `(${i}, ${j})`;
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
