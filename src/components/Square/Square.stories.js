import React from "react";
import styled from "styled-components";
import Square from "./Square";

export default {
  title: "Game/Square",
  component: Square,
  argTypes: {},
};

const SquareContainer = styled.div`
  width: 150px;
  height: 150px;
`;

const Template = (args) => {
  return (
    <SquareContainer>
      <Square {...args} />
    </SquareContainer>
  );
};

export const Default = Template.bind({});

function handleOnClick() {
  alert("Square clicked!");
}

Default.args = {
  player: null,

  color: "blue",

  onClick: handleOnClick,
};
