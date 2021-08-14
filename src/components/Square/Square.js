import React from "react";
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

export default Square;
