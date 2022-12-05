const LinkedList = require('@zekumoru-dev/linked-list');
const Queue = require('@zekumoru-dev/queue/queue/Queue');
const Vertex = require('./ChessVertex');

module.exports = class ChessGraph {
  static #SIZE = 8;

  #vertices;

  constructor() {
    this.#vertices = [];
    this.#createVertices();
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

  findPath([startRow, startCol], [endRow, endCol], fns) {
    startRow = this.#vertices[startRow];
    endRow = this.#vertices[endRow];
    if (startRow == null || endRow == null) return [];

    const start = startRow[startCol];
    const end = endRow[endCol];
    if (start == null || end == null) return [];

    return this.#findPath(start, end, fns).toArray();
  }

  #findPath(node, target, fns, queue = new Queue(), traversed = []) {
    if (node == null) return new LinkedList();

    traversed.push(node);
    if (typeof fns?.onTraversal === 'function') fns.onTraversal(node);
    if (node === target) return new LinkedList(node);

    node.neighbors.forEach((neighbor) => {
      if (traversed.includes(neighbor)) return;

      queue.enqueue(neighbor);
      if (typeof fns?.onQueued === 'function') fns.onQueued(neighbor, node);
    });

    const dequeued = queue.dequeue();
    if (typeof fns?.onDequeued === 'function') fns.onDequeued(dequeued, node);

    const list = this.#findPath(dequeued, target, fns, queue, traversed);
    if (list.size > 0 && node.hasNeighbor(list.head.value)) list.prepend(node);

    return list;
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
