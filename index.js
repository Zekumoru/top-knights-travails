const KnightGraph = require('./graph/chess/KnightGraph');

console.clear();

const graph = new KnightGraph();
console.log(graph.findPath([4, 3], [3, 3]));
