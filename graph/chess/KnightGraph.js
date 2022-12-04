const ChessGraph = require('./ChessGraph');

const isOdd = (n) => (n % 2) !== 0;
const isEven = (n) => (n % 2) === 0;

module.exports = class KnightGraph extends ChessGraph {
  constructor() {
    super();
    this.#connectNeighbors();
  }

  #connectNeighbors() {
    this.vertices.forEach((row) => {
      row.forEach((vertex) => this.#connectVertexNeighbors(vertex.row, vertex.col));
    });
  }

  #connectVertexNeighbors(row, col) {
    const searchRow = row - 2;
    const searchCol = col - 2;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (i === 2 || j === 2) continue;

        const neighborRow = searchRow + i;
        const neighborCol = searchCol + j;
        if (neighborRow < 0 || neighborCol < 0) continue;

        const add = (isEven(i) && isOdd(j)) || (isOdd(i) && isEven(j));
        if (add) this.addNeighbor([row, col], [neighborRow, neighborCol]);
      }
    }
  }
};
