import React from "react";
import styled from "styled-components";
import EndGameModal from "./EndGameModal";

export default {
  title: "Game/EndGameModal",
  component: EndGameModal,
  argTypes: {},
};

const Template = (args) => {
  return <EndGameModal {...args} />;
};

export const Default = Template.bind({});

function handleOnClose() {
  alert("EndGameModal Closed!");
}

function handleOnPlayAgain() {
  alert("EndGameModal Play Again!");
}

Default.args = {
  title: "PLAYER 1 WINS!",

  open: true,

  onPlayAgain: handleOnPlayAgain,
};
