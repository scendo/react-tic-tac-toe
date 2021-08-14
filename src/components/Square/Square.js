import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import { SquareStyles } from "./styles";

/**
 * Renders a square in the Tic Tac Toe board
 */
function Square({ player, color, onClick }) {
  const iconName = player === 1 ? "x" : "circle outline";

  return (
    <SquareStyles className="square" onClick={onClick} color={color}>
      {player && <Icon size="massive" name={iconName} />}
    </SquareStyles>
  );
}

Square.defaultProps = {
  player: null,

  color: "#000",
};

Square.propTypes = {
  /**
   * null = no player
   * 1 = X
   * 2 = O
   */
  player: PropTypes.oneOf([null, 1, 2]),

  /**
   * the hex color value of the square
   */
  color: PropTypes.string,

  /**
   * callback on click
   */
  onClick: PropTypes.func,
};

export default Square;
