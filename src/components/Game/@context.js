import React from "react";
import { keyBy } from "lodash";
import createSquares from "../../utils/createSquares";
import didSomeoneWin from "../../utils/didSomeoneWin";

const GameContext = React.createContext();

const initialState = {
  started: false,

  prevPlayer: null,

  currentPlayer: 1, //players 1 or 2

  player1Wins: 0,

  player2Wins: 0,

  squaresById: {},

  hasWinner: false,

  /**
   * All squares are taken, but there is no winner
   */
  isDraw: false,
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_STATE": {
      const { key, value } = payload;

      return {
        ...state,
        [key]: value,
      };
    }

    case "INIT_GAME": {
      const { player1Wins, player2Wins } = state;

      const squares = createSquares();
      const squaresById = keyBy(squares, "id");

      return {
        ...initialState,
        started: true,
        player1Wins,
        player2Wins,
        squaresById,
      };
    }

    case "CURRENT_PLAYER_SELECTS_SQUARE": {
      const { currentPlayer, squaresById, player1Wins, player2Wins } = state;
      const { square } = payload;

      const prevPlayer = currentPlayer;
      const nextPlayer = currentPlayer === 1 ? 2 : 1;

      const updatedSquare = {
        ...square,
        player: currentPlayer,
      };

      const updatedSquaresById = {
        ...squaresById,
        [square.id]: updatedSquare,
      };

      const squares = Object.values(updatedSquaresById);

      const hasWinner = didSomeoneWin(squares);

      //are all squares taken by a player?
      const allSquaresTaken =
        squares.filter(({ player }) => !player).length === 0;

      return {
        ...state,
        currentPlayer: nextPlayer,
        prevPlayer,
        squaresById: updatedSquaresById,
        hasWinner,
        ...(hasWinner &&
          currentPlayer === 1 && {
            player1Wins: player1Wins + 1,
          }),
        ...(hasWinner &&
          currentPlayer === 2 && {
            player2Wins: player2Wins + 1,
          }),
        isDraw: allSquaresTaken && !hasWinner,
      };
    }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function GameContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <GameContext.Provider value={value} {...props} />;
}

function useGameContext() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error(`useGameContext must be used within a GameContextProvider`);
  }
  const [state, dispatch] = context;

  function setState({ key, value }) {
    dispatch({
      type: "SET_STATE",
      payload: {
        key,
        value,
      },
    });
  }

  function initGame() {
    dispatch({
      type: "INIT_GAME",
    });
  }

  function currentPlayerSelectsSquare(square) {
    dispatch({
      type: "CURRENT_PLAYER_SELECTS_SQUARE",
      payload: {
        square,
      },
    });
  }

  return {
    state,
    dispatch,
    setState,
    initGame,
    currentPlayerSelectsSquare,
  };
}

export { GameContextProvider, useGameContext };
