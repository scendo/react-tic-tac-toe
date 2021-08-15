import styled from "styled-components";

export const EndGameModalHeaderStyles = styled.div`
  display: flex;
  justify-content: center;

  & i.icon {
    font-size: 1.9rem;
    margin-right: 1rem;
  }

  & > div:last-child {
    font-size: 2.2rem;
  }
`;

export const EndGameModalActionsStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  & .ui.button {
    width: 50%;
    padding: 1.3rem 0;
    font-size: 1.1rem;
  }
`;
