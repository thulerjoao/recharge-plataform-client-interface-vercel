import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ConfigPackagePage = styled.div`
  padding-top: 96px;
  padding-bottom: 296px;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .topContainer {
      display: flex;
      width: 100%;

      h3 {
        cursor: pointer;
      }
    }

    .packageSettings {
      margin-top: 24px;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      background-color: ${Theme.colors.maindark};
      width: 100%;
      gap: 32px;

      .leftContainer {
        width: 50%;
        position: relative;

        .pen {
          position: absolute;
          right: 0;
          top: 0;
        }

        .bottomLeftContainer {
          display: flex;
          margin-top: 32px;
          align-items: center;
        }
      }

      .rightContainer {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .packageImage {
          border-radius: 8px;
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      }
    }

    .packageValues {
      margin-top: 24px;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: ${Theme.colors.maindark};
      width: 100%;

      .topText {
        display: flex;
        width: 100%;

        div {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      }

      .scales {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        span {
          width: 100%;
        }
        .tax {
          max-width: 234px;
        }
        .totalCost {
          max-width: 110px;
        }
        .profitMargin {
          max-width: 164px;
        }
        .profitValue {
          max-width: 147px;
        }
        .saleValue {
          max-width: 146px;
        }
      }

      .cardsList {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
  }
`;
