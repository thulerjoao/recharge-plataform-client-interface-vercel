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

  .receiptModal {
    position: absolute;
    background-color: pink;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;

    .mainContent {
      background-color: green;
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 0;

      image {
        display: flex;
        justify-content: center;
        align-items: center;
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
