import React, { useEffect } from "react";
import Board from "../Board";
import { GameContextProvider, useGameContext } from "./@context";
import { GameStyles } from "./styles";

function Game(props) {
  const {
    state: { prevPlayer, currentPlayer, hasWinner, squaresById },
    initGame,
    currentPlayerSelectsSquare,
  } = useGameContext();

  const squares = Object.values(squaresById);

  function handleOnSquareClick({ square }) {
    if (square.player) return;
    currentPlayerSelectsSquare(square);
  }

  useEffect(() => {
    if (hasWinner) {
      alert("WINNER", currentPlayer);
    }
  }, [hasWinner]);

  useEffect(() => {
    initGame();
  }, []);

  return (
    <GameStyles>
      <Board squares={squares} onSquareClick={handleOnSquareClick} />
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
