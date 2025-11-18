import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const OrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .centerContainer {
    padding-top: 96px;
    width: 100%;
    max-width: 852px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mobile {
      display: none;
    }
    .title {
      width: 100%;
    }

    .cards {
      width: 100%;

      .orderCardContainer {
        width: 100%;
      }
    }

    .filtersSection {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      margin-bottom: 24px;

      .searchSection {
        width: 300px;
        display: flex;
        align-items: center;
        position: relative;

        .searchButton {
          width: 28px;
          height: 28px;
          background-color: ${Theme.colors.mainlight};
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 8px;
          cursor: pointer;
          position: absolute;
          right: 2px;

          svg {
            width: 24px;
            height: 24px;
          }
        }
      }

      .filterControls {
        display: flex;
        gap: 16px;

        .filterSelect {
          padding: 0px 8px;
          height: 32px;
          width: 140px;
          border-radius: 8px;
          border: 2px solid ${Theme.colors.secondaryAction};
          background: ${Theme.colors.mainlight};
          color: ${Theme.colors.secondaryAction};
          font-size: 14px;
          cursor: pointer;

          &:focus {
            outline: none;
            border-color: ${Theme.colors.mainHighlight};
          }
        }
      }
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    .centerContainer {
      padding-top: 64px;
      padding-bottom: 56px;
      .desktop {
        display: none;
      }
      .mobile {
        display: flex;
        width: 100%;
      }

      .mobileHeader {
        position: fixed;
        top: 0;
        z-index: 10;
        margin-top: 12px;
        width: auto;
        height: 0;
      }

      .desktop {
        display: none;
      }
      .mobile {
        display: flex;
        width: 100%;
      }

      .filtersSection {
        flex-direction: column;
        gap: 16px;
        padding: 16px;
        margin-bottom: 20px;

        .searchSection {
          width: 100%;
        }

        .filterControls {
          width: 100%;
          justify-content: center;

          .filterSelect {
            width: 100%;
            max-width: none;
          }
        }
      }

      .cards {
        margin-top: 24px;
      }
    }
  }
  @media (max-width: 539px) {
    .filtersSection {
      padding: 14px;
      margin-bottom: 16px;
      gap: 12px;

      .filterControls {
        .filterSelect {
          width: 100%;
          max-width: none;
          height: 36px;
        }
      }
    }
  }

  @media (max-width: 400px) {
    .filtersSection {
      padding: 12px;
      margin-bottom: 14px;
      gap: 10px;

      .filterControls {
        .filterSelect {
          width: 100%;
          max-width: none;
          height: 34px;
          font-size: 13px;
        }
      }
    }
  }
`;
