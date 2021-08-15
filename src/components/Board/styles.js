import styled from "styled-components";

export const BoardStyles = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
  width: 38rem;
  height: 38rem;

  & .square {
    outline: 2px solid #707070;
  }
`;
