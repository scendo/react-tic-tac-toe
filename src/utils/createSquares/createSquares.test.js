import { validate as uuidValidate } from "uuid";
import createSquares from "./createSquares";

it("created squares should have exactly 3 squares in each column", () => {
  const squares = createSquares();
  const row1 = squares.filter(({ row }) => row === 0);
  const row2 = squares.filter(({ row }) => row === 1);
  const row3 = squares.filter(({ row }) => row === 2);

  expect(row1.length).toEqual(3);
  expect(row2.length).toEqual(3);
  expect(row3.length).toEqual(3);
});

it("created squares should have exactly 3 squares in each column", () => {
  const squares = createSquares();

  const column1 = squares.filter(({ column }) => column === 0);
  const column2 = squares.filter(({ column }) => column === 1);
  const column3 = squares.filter(({ column }) => column === 2);

  expect(column1.length).toEqual(3);
  expect(column2.length).toEqual(3);
  expect(column3.length).toEqual(3);
});

it("created squares should not be assigned to a player by default", () => {
  const squares = createSquares();

  const squaresWithoutAplayer = squares.filter(({ player }) => !player);

  expect(squaresWithoutAplayer.length).toEqual(9);
});

it("created squares should have a unique id generated by npm package uuid v4", () => {
  const squares = createSquares();

  squares.forEach(({ id }) => {
    expect(uuidValidate(id)).toEqual(true);
  });
});