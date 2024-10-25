import styled from "styled-components";

export const ProductInnerPage = styled.div`
  width: 100%;

  .cardEnviroment {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }

  .paymentMethods {
    width: 100%;
    min-height: 420px;
    margin-bottom: 80px;
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
