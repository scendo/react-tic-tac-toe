import React from "react";
import Board from "./Board";
import createSquares from "../../utils/createSquares/createSquares";

export default {
  title: "Game/Board",
  component: Board,
  argTypes: {},
};

const squares = createSquares();

const Template = (args) => {
  return <Board {...args} />;
};

export const Default = Template.bind({});

function handleOnSquareClick({ square }) {
  alert(`square clicked\n ${JSON.stringify(square)}`);
}

Default.args = {
  squares,

  onSquareClick: handleOnSquareClick,
};
