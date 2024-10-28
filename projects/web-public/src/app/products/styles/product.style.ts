import styled from "styled-components";

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .cardsContainer {
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;
    max-width: 628px;
    justify-content: space-between;
    padding: 0 14px;
    margin-top: 24px;
    margin-bottom: -24px;

    .cardEnviroment {
      height: auto;
      flex: 0 1 calc(33.33% - 16px);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 24px;
    }
  }

  .paymentMethodsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: 32px;
    padding: 0 72px;

    .cardsContainer {
      padding: 0;
    }
  }
  @media (max-width: 767px) {
    margin-top: 32px;
    padding: 0 16px;

    .cardsContainer {
      padding: 0;
      .cardEnviroment {
        flex: 0 1 calc(50% - 10px);
      }
    }
  }
`;
