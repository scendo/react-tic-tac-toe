import React from "react";
import "semantic-ui-css/semantic.min.css";
import { AppGlobalStyles } from "./styles";
import Game from "./components/Game";

function App(props) {
  return (
    <div>
      <AppGlobalStyles />
      <Game />
    </div>
  );
}

export default App;
