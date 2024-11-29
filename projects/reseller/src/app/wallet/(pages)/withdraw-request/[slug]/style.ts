import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SalesInnerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 96px;
  margin-bottom: 60px;

  main {
    background-color: ${Theme.colors.maindark};
    width: 100%;
    max-width: 628px;
    border-radius: 8px;
    padding: 16px;

    .topContainer {
      width: 100%;
      border-bottom: 1px solid ${Theme.colors.secondaryAction};

      .topValue {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        height: 48px;
        margin-bottom: 24px;

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
        }
      }

      .orderParams {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 16px;
      }
    }

    .mediumContainer {
      width: 100%;
      border-bottom: 1px solid ${Theme.colors.secondaryAction};
      padding-top: 24px;

      .paymentSpecs {
        display: flex;
        align-items: center;
        height: 40px;
        margin: 16px 0;

        span {
          margin-right: 16px;
        }

        .paymentSpecsText {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
        }
      }
    }

    .bottomContainer {
      margin-top: 24px;

      .imageContainer {
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: start;
        overflow: hidden;
        margin-top: 16px;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    main {
      max-width: 100%;
    }
  }
  @media (max-width: 767px) {
    padding-top: 48px;

    main {
    }
  }
`;

export const ReceiptModal = styled.div`
  background-color: ${Theme.colors.mainTransparent};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;

  div {
    height: 80%;
    width: 100%;
    max-width: 628px;
    display: flex;
    justify-content: center;
    position: relative;

    img {
      height: 100%;
      width: auto;
    }

    .close {
      position: absolute;
      right: 0;
      top: -39px;
      cursor: pointer;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    div {
      height: 90%;

      .close {
        position: absolute;
        right: 0;
        top: -39px;
        cursor: pointer;
        padding: 24px;
      }
    }
  }
`;
