import React from "react";
import { keyBy } from "lodash";
import createSquares from "../../utils/createSquares";
import didSomeoneWin from "../../utils/didSomeoneWin";

const GameContext = React.createContext();

const initialState = {
  started: false,

  prevPlayer: null,

  currentPlayer: 1, //players 1 or 2

  squaresById: {},

  hasWinner: false,
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
      const squares = createSquares();
      const squaresById = keyBy(squares, "id");

      return {
        ...state,
        started: true,
        squaresById,
      };
    }

    case "CURRENT_PLAYER_SELECTS_SQUARE": {
      const { currentPlayer, squaresById } = state;
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

      return {
        ...state,
        currentPlayer: nextPlayer,
        prevPlayer,
        squaresById: updatedSquaresById,
        hasWinner,
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
