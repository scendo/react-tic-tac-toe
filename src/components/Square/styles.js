import styled from "styled-components";

export const SquareStyles = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  height: 100%;
  width: 100%;
`;
