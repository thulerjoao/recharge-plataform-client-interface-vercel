import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const OrderContainer = styled.div`
  width: 100%;
  max-width: 824px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .topMessage {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    height: 32px;

    span {
      position: absolute;
      left: 0;
      cursor: pointer;
    }
  }

  main {
    width: 100%;
    margin-top: 24px;
    background-color: ${Theme.colors.maindark};
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;

    .fisrtSection {
      border-bottom: 1px solid ${Theme.colors.secondaryAction};

      .fisrtRow {
        display: flex;
        justify-content: space-between;

        img {
          height: 72px;
          width: 72px;
          border-radius: 8px;
        }
      }
      .secondaryRow {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
      }
      .third {
        margin: 16px 0;
      }
    }

    .secondarySection,
    .thirdSection {
      margin-top: 24px;
      border-bottom: 1px solid ${Theme.colors.secondaryAction};
      padding-bottom: 16px;

      .outside {
        display: flex;
        width: 100%;
        margin-top: 16px;

        img {
          height: 40px;
          width: 40px;
          border-radius: 6px;
        }

        svg {
          border-radius: 8px;
        }

        .allInfos {
          margin-left: 16px;
          width: 100%;
          height: 42px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .innerContent {
            display: flex;
          }
        }
      }
    }

    .thirdSection {
      border-bottom: none;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0 72px;
  }
  @media (max-width: 767px) {
    padding: 0 16px;
    margin-top: 16px;
  }
`;
