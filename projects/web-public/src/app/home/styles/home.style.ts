import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;

  .mainBanner {
    margin-top: 80px;
    width: 100%;
    max-width: 696px;
    object-fit: contain;
    height: auto;
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
