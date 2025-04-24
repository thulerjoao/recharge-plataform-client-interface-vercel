import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const WalletContainer = styled.div`
  padding-top: 96px;

  .mobile {
    display: none;
  }

  main {
    display: flex;
    width: 100%;
    padding-bottom: 55px;
    flex-direction: column;

    .topContainer {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 32px;

      .topOption {
        width: 50%;
        display: flex;
        align-items: center;
        height: 64px;
        padding: 0 16px;
        cursor: pointer;
        background-color: ${Theme.colors.mainBbackgroundSolid};
        border-radius: 8px;
      }
    }

    .bottomContainer {
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 32px;

      .leftTopContainer {
        width: 50%;
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .inner {
          padding: 24px;
          padding-bottom: 8px;
          width: 100%;
          background-color: ${Theme.colors.mainBbackgroundSolid};
          border-radius: 8px;
        }

        .pixKey {
          margin-top: 40px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      .rightBottomContainer {
        padding: 24px;
        width: 50%;
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${Theme.colors.mainBbackgroundSolid};
        border-radius: 8px;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1025px) {
    main {
      .topContainer {
        flex-direction: column;
        gap: 24px;
        .topOption {
          width: 100%;
        }
      }

      .bottomContainer {
        flex-direction: column;

        .leftTopContainer {
          width: 100%;
        }

        .rightBottomContainer {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 767px) {
    padding-top: 64px;
    .desktop {
      display: none;
    }

    .mobile {
      display: flex;
    }

    main {
      margin-top: 24px;
      .topContainer {
        flex-direction: column;
        gap: 24px;
        .topOption {
          width: 100%;
        }
      }

      .bottomContainer {
        flex-direction: column;

        .leftTopContainer {
          width: 100%;

          .inner {
            padding: 16px;
            padding-bottom: 8px;
          }
        }

        .rightBottomContainer {
          width: 100%;
          padding: 24px 16px;
        }
      }
    }
  }
`;
