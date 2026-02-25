import styled from "styled-components";

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .cardsContainer {
    width: 100%;
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 32px;
    margin-bottom: 56px;
    padding: 0;
    box-sizing: border-box;

    .cardEnviroment {
      width: 100%;
      min-width: 0;
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      cursor: pointer;
    }
  }

  .paymentMethodsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 628px;

    .paymentEnviroment {
      width: 100%;
      height: auto;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0 32px;

    .cardsContainer {
      grid-template-columns: repeat(4, 1fr);
      max-width: 820px;
      gap: 12px;
      padding: 0 16px;
    }
  }

  @media (min-width: 540px) and (max-width: 767px) {
    padding: 0 16px;

    .cardsContainer {
      grid-template-columns: repeat(3, 1fr);
      max-width: 620px;
      gap: 12px;
      padding: 0 16px;
      margin-top: 24px;
    }
  }

  @media (max-width: 539px) {
    padding: 0 16px;

    .cardsContainer {
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 0;
      margin-top: 24px;
    }
  }
`;
