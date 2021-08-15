import createSquares from "../createSquares";
import didSomeoneWin from "./didSomeoneWin";

function fillPlayerInRow({ player, row }) {
  return function (square) {
    const { row: squareRow } = square;

    if (row !== squareRow) return square;
    return {
      ...square,
      player,
    };
  };
}

function fillPlayerInColumn({ player, column }) {
  return function (square) {
    const { column: squareColumn } = square;

    if (column !== squareColumn) return square;
    return {
      ...square,
      player,
    };
  };
}

it("inital squares on a board should not have a winner", () => {
  const squares = createSquares();
  expect(didSomeoneWin(squares)).toEqual(false);
});

it("should be a winner if a player owns all of the squares", () => {
  const squares = createSquares().map((square) => ({ ...square, player: 1 }));
  expect(didSomeoneWin(squares)).toEqual(true);
});

it("should be a winner if a player owns an entire row", () => {
  const squares = createSquares().map(fillPlayerInRow({ player: 1, row: 0 }));
  expect(didSomeoneWin(squares)).toEqual(true);

  const squares1 = createSquares().map(fillPlayerInRow({ player: 1, row: 1 }));
  expect(didSomeoneWin(squares1)).toEqual(true);

  const squares2 = createSquares().map(fillPlayerInRow({ player: 1, row: 2 }));
  expect(didSomeoneWin(squares2)).toEqual(true);
});

it("should be a winner if a player owns an entire column", () => {
  const squares = createSquares().map(
    fillPlayerInColumn({ player: 1, column: 0 })
  );
  expect(didSomeoneWin(squares)).toEqual(true);

  const squares1 = createSquares().map(
    fillPlayerInColumn({ player: 1, column: 1 })
  );
  expect(didSomeoneWin(squares1)).toEqual(true);

  const squares2 = createSquares().map(
    fillPlayerInColumn({ player: 1, column: 2 })
  );
  expect(didSomeoneWin(squares2)).toEqual(true);
});
