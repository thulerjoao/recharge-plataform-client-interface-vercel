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
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);

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
      display: flex;
      flex-direction: column;
      align-items: center;

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

      .paymentPending {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        padding: 2px 5px;
        cursor: pointer;
        margin-top: 10px;
      }
    }

    .thirdSection {
      border-bottom: none;
    }
  }
  .paymentPendingContainer {
    padding-left: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    margin-top: 16px;

    p {
      width: auto;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0 72px;
  }
  @media (max-width: 767px) {
    padding: 0 16px;
    margin-top: 16px;

    .paymentPendingContainer {
      justify-content: center;
      padding-left: 0;
    }
  }
`;
