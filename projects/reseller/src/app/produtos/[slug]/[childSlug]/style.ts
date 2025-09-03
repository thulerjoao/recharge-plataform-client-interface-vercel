import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ConfigPackagePage = styled.div`
  padding-top: 96px;
  padding-bottom: 56px;

  .tablet,
  .mobile {
    display: none;
  }
  .desktop {
    display: flex;
  }

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
        width: 100%;

        .list {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tablet,
        .mobile {
          display: none;
        }
      }
    }

    .bottomContainer {
      margin-top: 40px;
      background-color: ${Theme.colors.maindark};
      width: 100%;
      border-radius: 16px;
      padding: 0 16px;

      .paymentMethods {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 16px 0px;
        gap: 24px;

        .pix {
          background-color: ${Theme.colors.mainBbackgroundSolid};
          border-radius: 8px;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;

          .paymentIcon {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1025px) {
    .mobile,
    .desktop {
      display: none;
    }
    .tablet {
      display: flex;
    }

    main {
      .packageSettings {
        flex-direction: column;

        .leftContainer {
          width: 100%;
          height: auto;
        }
        .rightContainer {
          width: 100%;
          height: auto;
        }
      }

      .packageValues {
        background-color: transparent;

        .scales {
          display: none;
        }

        .topText {
          padding: 24px 0;
          border-top: 1px solid ${Theme.colors.secondaryAction};
        }

        .cardsList {
          .list {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .desktop {
            display: none;
          }

          .tablet {
            display: flex;
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    padding-top: 64px;

    .desktop,
    .tablet {
      display: none;
    }
    .mobile {
      display: flex;
    }

    main {
      .topContainer {
        margin-top: 24px;
      }

      .packageSettings {
        flex-direction: column;

        .leftContainer {
          width: 100%;
          height: auto;
        }
        .rightContainer {
          width: 100%;
          height: auto;
        }
      }

      .packageValues {
        background-color: transparent;
        padding: 0;

        .scales {
          display: none;
        }

        .topText {
          padding: 24px 0;
          border-top: 1px solid ${Theme.colors.secondaryAction};
        }

        .cardsList {
          .desktop {
            display: none;
          }

          .mobile {
            display: flex;
          }
        }
      }
    }
  }
`;
