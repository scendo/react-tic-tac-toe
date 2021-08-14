import { v4 as uuid } from "uuid";

function createSquares() {
  let squares = [];
  const rows = new Array(3).fill();
  const columns = new Array(3).fill();

  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < columns.length; column++) {
      const square = createSquare(row, column);
      squares.push(square);
    }
  }

  return squares;
}

function createSquare(row, column) {
  return {
    id: uuid(),
    player: null,
    row,
    column,
  };
}

export default createSquares;
