const KnightGraph = require('./graph/chess/KnightGraph');

console.clear();

const graph = new KnightGraph();
graph.findPath([3, 3], [4, 3], {
  onTraversal: (node) => {
    console.log(node);
    console.log('Neighbors');
  },
  onQueued: (node) => {
    console.log('-', node);
  },
  onDequeued: () => {
    console.log();
  },
});
