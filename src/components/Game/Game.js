import React, { useEffect } from "react";
import { GameContextProvider, useGameContext } from "./@context";
import GameHeader from "./GameHeader";
import Board from "../Board";
import EndGameModal from "../EndGameModal";
import { GameStyles } from "./styles";

function Game(props) {
  const {
    state: { prevPlayer, squaresById, hasWinner, isDraw },
    initGame,
    currentPlayerSelectsSquare,
  } = useGameContext();

  const squares = Object.values(squaresById);

  function handleOnSquareClick({ square }) {
    if (square.player) return;
    currentPlayerSelectsSquare(square);
  }

  useEffect(() => {
    initGame();
  }, []);

  return (
    <GameStyles>
      <GameHeader />
      <div className="game-body">
        <Board squares={squares} onSquareClick={handleOnSquareClick} />
      </div>
      <EndGameModal
        open={hasWinner || isDraw}
        title={hasWinner ? `PLAYER ${prevPlayer} WINS!` : "DRAW"}
        onPlayAgain={initGame}
      />
    </GameStyles>
  );
}

function GameContainer(props) {
  return (
    <GameContextProvider>
      <Game {...props} />
    </GameContextProvider>
  );
}

export default GameContainer;
