const Node = require('./graph/Node');

console.clear();

const node = new Node(1);
const neighbor = new Node(2);
node.addNeighbor(neighbor);
neighbor.removeNeighbor(node);

console.log(node.toString());
console.log(neighbor.toString());
