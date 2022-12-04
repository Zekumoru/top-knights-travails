module.exports = class Node {
  value;
  #neighbors;

  constructor(value) {
    this.value = value;
    this.#neighbors = [];
  }

  get neighbors() {
    return Object.freeze(this.#neighbors);
  }

  addNeighbor(node) {
    if (node === this) return;
    if (this.#neighbors.includes(node)) return;

    this.#neighbors.push(node);
    node.addNeighbor(this);
  }

  removeNeighbor(node) {
    if (node === this) return;
    if (!this.#neighbors.includes(node)) return;

    this.#neighbors.splice(this.#neighbors.findIndex((neighbor) => neighbor === node), 1);
    node.removeNeighbor(this);
  }

  hasNeighbor(node) {
    return this.#neighbors.includes(node);
  }

  toString() {
    // Syntax: ( value ) => [ nVal1, nVal2, ..., null ]
    if (!this.#neighbors.length) return `( ${this.value} ) => []`;

    const neighbors = [];
    this.#neighbors.forEach((neighbor) => neighbors.push(neighbor.value));
    return `( ${this.value} ) => [ ${neighbors.join(', ')} ]`;
  }
};
