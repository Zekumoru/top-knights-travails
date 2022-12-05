# Knights Travails

The eighth project of the JavaScript course from The Odin Project.

Suppose a knight piece is placed somewhere on the chess board and it needs to move to another location on the board (or its current location!), find the shortest path from the knight's location to that location.

```js
graph.findPath([4, 3], [3, 3])
```

Result

```console
[
  ChessVertex { value: '(3, 4)' },
  ChessVertex { value: '(4, 6)' },
  ChessVertex { value: '(2, 5)' },
  ChessVertex { value: '(3, 3)' }
]
```

> The value is in cartesian coordinate starting from the top-right while the `findPath` method has parameters `([startRow, startCol], [endRow, endCol])` (also starting from the top-right) hence why the first value `(3, 4)` in the result is different (or swapped) from the input `[4, 3]`.

# Documentation

## Node

### Constructor

```js
Node(value)
```

Creates a `Node` instance with the given `value`.

### Members

#### value

Returns the node's value.

#### neighbors

Returns the array of the node's neighbors. The array is frozen so it cannot be modified. Check out [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) for more info.

### Methods

#### addNeighbor

```js
addNeighbor(node)
```

Adds the given `node` as a new neighbor, same goes to `node`. If the `node` is itself or it's already a neighbor, ignores it.

Returns `undefined`.

#### removeNeighbor

```js
removeNeighbor(node)
```

Removes the given `node` from the neighbors, same goes to `node`. If the `node` is itself or it does not have `node` as a neighbor, ignores it.

Returns `undefined`.

#### hasNeighbor

```js
hasNeighbor(node)
```

Returns `true` if a node has the given `node` as a neighbor, otherwise `false`.

#### toString

```js
toString()
```

Returns the string representation of a node.
Syntax: `( value ) => [ nVal1, nVal2, ..., null ]`.

## ChessVertex

### Constructor

```js
ChessVertex(row, col)
```

Creates a `ChessVertex` instance with the given `row` and `col` positions.

### Members

#### row

Returns the row position.

#### col

Returns the column position.

### Methods

```js
toString()
```

Returns the string representation.
Syntax: `[row][col] ( value ) => [ nVal1, nVal2, ..., null ]`.

## ChessGraph

### Constructor

```js
ChessGraph()
```

Creates a `ChessGraph` instance.

Initializes its member variable `vertices` to a 8x8 two-dimensional array each containing a `ChessVertex` which simulates a chess board.

### Members

#### vertices

Returns the two-dimensional array of the chess board.

### Methods

#### addNeighbor

```js
addNeighbor([startRow, startCol], [endRow, endCol])
```

Connects the two given cells with the positions `[startRow, startCol]` and `[endRow, endCol]` as neighbors.

If any of the four parameters is invalid, either a negative number or greater than the size of the board, the method does nothing.

Returns `undefined`.

#### findPath

```js
findPath([startRow, startCol], [endRow, endCol])
```

Returns an array of `ChessVertex` containing the shortest path from position `[startRow, startCol]` to position `[endRow, endCol]`.

If any of the four parameters is invalid, returns an empty array.

#### toString

```js
toString()
```

Returns a string representation of the graph.

Syntax
```console
[
  [
    ChessVertex,
    ...
  ],
  ...
]
```

## KnightGraph

### Constructor

```js
KnightGraph()
```

Creates a `KnightGraph` instance which connects all the vertices to their proper neighbors. 

Proper neighbors means the neighbors of each cell when making a knight's move.

### Members

Same as `ChessGraph`.

### Methods

Same as `ChessGraph`.
