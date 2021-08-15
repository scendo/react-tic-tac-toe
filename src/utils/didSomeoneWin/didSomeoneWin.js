import { keyBy } from "lodash";
import isSamePlayer from "../isSamePlayer";

/**
 * Checks a board's squares for a winning pattern
 *
 * rule: a player owns any 3 squares in a row
 *  - horizontal
 *  - vertical
 *  - diagonal
 *
 * @param {number} player
 * @param {array} squares
 * @returns {boolean}
 */
export default function didSomeoneWin(squares) {
  if (
    testHorizontalSquares(squares) ||
    testVerticalSquares(squares) ||
    testDiagonalSquares(squares)
  ) {
    return true;
  }

  return false;
}

function testHorizontalSquares(squares) {
  const row1 = getSquaresInRow({ squares, row: 0 });
  const row2 = getSquaresInRow({ squares, row: 1 });
  const row3 = getSquaresInRow({ squares, row: 2 });

  if (isSamePlayer(row1) || isSamePlayer(row2) || isSamePlayer(row3)) {
    return true;
  }

  return false;
}

function testVerticalSquares(squares) {
  const column1 = getSquaresInColumn({ squares, column: 0 });
  const column2 = getSquaresInColumn({ squares, column: 1 });
  const column3 = getSquaresInColumn({ squares, column: 2 });

  if (isSamePlayer(column1) || isSamePlayer(column2) || isSamePlayer(column3)) {
    return true;
  }

  return false;
}

function testDiagonalSquares(squares) {
  const squareByCoordinates = keyBy(squares, ({ row, column }) => {
    return `${row}_${column}`;
  });

  //starting at 0,0 increment both row, column by 1
  const diag1SquareKeys = new Array(3)
    .fill()
    .map((value, i) => getSquareKey({ row: i, column: i }));

  //starting at 0, 2 increment row by 1, decrement column by 1
  let diag2SquareKeys = [];
  let row = 0;
  let column = 2;

  while (row <= 2 && column >= 0) {
    const key = getSquareKey({ row, column });
    diag2SquareKeys.push(key);
    row++;
    column--;
  }

  const diag1Squares = diag1SquareKeys.map((key) => squareByCoordinates[key]);
  const diag2Squares = diag2SquareKeys.map((key) => squareByCoordinates[key]);

  if (isSamePlayer(diag1Squares) || isSamePlayer(diag2Squares)) {
    return true;
  }

  return false;
}

//creates a key to id a square by it's row and column
function getSquareKey({ row, column }) {
  return `${row}_${column}`;
}

function getSquaresInRow({ squares, row }) {
  return squares.filter(({ row: currentRow }) => currentRow === row);
}

function getSquaresInColumn({ squares, column }) {
  return squares.filter(
    ({ column: currentColumn }) => currentColumn === column
  );
}
