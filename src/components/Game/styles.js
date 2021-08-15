import styled from "styled-components";

export const GameStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 0rem);
  background-image: radial-gradient(
    at 50% 100%,
    rgb(22 202 255 / 75%),
    rgb(15, 1, 94)
  );

  i.board-icon.icon {
    color: white;
    border: none;
    font-size: 30px;
    width: 25px;
    height: 25px;
  }

  & .game-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const GameHeaderStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3.5rem;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 38rem;
    padding: 1.5rem;
    background-color: #fff;

    & > .player {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.3rem;
      & i.icon {
        font-size: 4rem;
        margin-top: 0.5rem;
      }
    }

    & .score-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & .ui.header {
        font-size: 2.5rem;
        letter-spacing: 3px;
      }

      & .count-container {
        display: flex;
        justify-content: space-evenly;
        font-size: 1.5rem;
        font-weight: bold;
        width: 100%;
        margin-top: 0.5rem;

        & .count {
          font-size: 3rem;
        }

        & .divider {
          border-left: 2px solid #d1d1d1;
          height: 2rem;
        }
      }
    }
  }
`;
