import React from "react";
import { isFunction } from "lodash";
import PropTypes from "prop-types";
import Square from "../Square";
import { BoardStyles } from "./styles";

/**
 *
 * @param {*} props
 * @returns
 */
function Board({ onSquareClick, squares }) {
  function handleOnSquareClick(square) {
    return function (e) {
      if (isFunction(onSquareClick)) {
        onSquareClick({ square });
      }
    };
  }

  return (
    <BoardStyles>
      {squares.map((square) => {
        const { id, player } = square;
        return (
          <Square
            key={id}
            player={player}
            onClick={handleOnSquareClick(square)}
            color={"blue"}
          />
        );
      })}
    </BoardStyles>
  );
}

Board.propTypes = {
  /**
   * on square click callback
   */
  onSquareClick: PropTypes.func,

  /**
   * squares state on the board
   */
  squares: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      player: PropTypes.oneOf([1, 2]),
      row: PropTypes.number,
      column: PropTypes.number,
    })
  ),
};

export default Board;
