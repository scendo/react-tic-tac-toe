import React from "react";
import { useGameContext } from "./@context";
import { Header, Icon } from "semantic-ui-react";
import { GameHeaderStyles } from "./styles";

function GameHeader(props) {
  const {
    state: { player1Wins, player2Wins },
  } = useGameContext();

  return (
    <GameHeaderStyles>
      <div>
        <div className="player">
          PLAYER 1
          <Icon size="large" name="x" />
        </div>
        <div className="score-container">
          <Header>SCORE</Header>
          <div className="count-container">
            <div className="count">{player1Wins}</div>
            <div className="divider" />
            <div className="count">{player2Wins}</div>
          </div>
        </div>
        <div className="player">
          PLAYER 2
          <Icon size="large" name="circle outline" />
        </div>
      </div>
    </GameHeaderStyles>
  );
}

export default GameHeader;
