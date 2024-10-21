import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;

  .topBanner {
    margin-top: 80px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .cardsContainer {
      display: grid;
      gap: 32px;
      grid-template-columns: repeat(3, 1fr);
      margin-top: 24px;
      margin-bottom: 56px;
    }
  }
`;
