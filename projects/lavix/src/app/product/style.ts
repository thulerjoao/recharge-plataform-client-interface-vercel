import styled from "styled-components";

export const ProductInnerPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .couponButton {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
    height: 32px;
  }

  .couponContainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    gap: 8px;
    margin-top: 16px;
    margin-bottom: 4px;
  }

  .cardEnviroment {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }

  .paymentMethods {
    width: 100%;
    max-width: 628px;
    min-height: 420px;
    margin-bottom: 80px;

    .errorMessage {
      background-color: pink;
      margin-top: 8px;
      margin-bottom: -8px;
      height: 0;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-top: 8px;
    padding: 0 72px;

    .paymentMethods {
      min-height: 0;
    }
  }
  @media (max-width: 767px) {
    margin-top: 29px;
    padding: 0 16px;

    .paymentMethods {
      min-height: 0;
    }
  }
`;
