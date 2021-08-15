import React from "react";
import { Header, Icon } from "semantic-ui-react";
import { GameHeaderStyles } from "./styles";

function GameHeader(props) {
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
            <div className="count">1</div>
            <div className="divider" />
            <div className="count">2</div>
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
