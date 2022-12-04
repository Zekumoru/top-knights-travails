const Node = require('./Node');

module.exports = class ChessVertex extends Node {
  #row;
  #col;

  constructor(row, col) {
    super();
    this.#row = row;
    this.#col = col;
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  toString() {
    return `[${this.#row}, ${this.#col}] ${super.toString()}`;
  }
};
