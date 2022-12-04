const Node = require('./Node');

module.exports = class ChessVertex extends Node {
  #row;
  #col;

  constructor(row, col) {
    super();
    this.#row = row;
    this.#col = col;
  }
};
