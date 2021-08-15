import isSamePlayer from "./isSamePlayer";

function createItems({ count, player }) {
  return new Array(count).fill({ player });
}

it("should return true if all objects in the array have the same player value", () => {
  const items1 = createItems({ count: 3, player: 1 });
  const result1 = isSamePlayer(items1);

  expect(result1).toEqual(true);

  const items2 = createItems({ count: 6, player: 1 });
  const result2 = isSamePlayer(items2);

  expect(result2).toEqual(true);

  const items3 = createItems({ count: 9, player: 1 });
  const result3 = isSamePlayer(items3);

  expect(result3).toEqual(true);
});

it("should return false if 1 or more objects in the array have a different player value", () => {
  const items1 = [
    ...createItems({ count: 1, player: 1 }),
    createItems({ count: 1, player: 2 }),
  ];
  const result1 = isSamePlayer(items1);

  expect(result1).toEqual(false);

  const items2 = [
    ...createItems({ count: 3, player: 1 }),
    createItems({ count: 1, player: 2 }),
  ];
  const result2 = isSamePlayer(items2);

  expect(result2).toEqual(false);

  const items3 = [
    ...createItems({ count: 6, player: 1 }),
    createItems({ count: 1, player: 2 }),
  ];
  const result3 = isSamePlayer(items3);

  expect(result3).toEqual(false);
});
