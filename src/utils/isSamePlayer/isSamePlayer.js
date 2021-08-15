import { get, uniqBy } from "lodash";

/**
 * The squares provided are owned by the same player
 *
 * @param {array} squares
 * @returns {boolean}
 */
function isSamePlayer(squares) {
  const uniquePlayerSquares = uniqBy(squares, "player");
  return (
    uniquePlayerSquares.length === 1 &&
    get(uniquePlayerSquares[0], "player") !== null
  );
}

export default isSamePlayer;
