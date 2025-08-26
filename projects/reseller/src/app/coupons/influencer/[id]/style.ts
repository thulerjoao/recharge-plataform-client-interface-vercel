import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const InfluencerCouponsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .mainContent {
    width: 100%;
    max-width: 900px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .headerSection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .influencerInfo {
        display: flex;
        align-items: center;
        gap: 20px;

        .avatar {
          width: 64px;
          height: 64px;
          background: ${Theme.colors.secondaryTextAction};
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            width: 42px;
            height: 42px;
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
      }

      .statsSection {
        display: flex;
        gap: 32px;

        .statItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }
      }
    }

    .actionsSection {
      display: flex;
      /* justify-content: center; */
    }

    .filtersSection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .filterControls {
        display: flex;
        gap: 16px;

        .filterSelect {
          padding: 0px 8px;
          height: 32px;
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

    .tableSection {
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      overflow: hidden;

      .tableHeader {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr 0.5fr;
        background: ${Theme.colors.secondaryTextAction};
        padding: 16px 20px;
        gap: 16px;

        .tableCell {
          font-weight: 600;
          color: ${Theme.colors.mainlight};
          font-size: 14px;
        }
      }

      .emptyState {
        padding: 40px;
        text-align: center;
      }
    }
  }

  @media (max-width: 539px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }

    .mainContent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        gap: 20px;
        text-align: center;

        .influencerInfo {
          flex-direction: column;
          gap: 16px;
        }

        .statsSection {
          flex-direction: column;
          gap: 16px;
        }
      }

      .filtersSection {
        flex-direction: column;
        gap: 16px;

        .filterControls {
          width: 100%;
          justify-content: center;
        }
      }

      .tableSection {
        .tableHeader {
          grid-template-columns: 1fr;
          gap: 8px;
          padding: 12px;

          .tableCell {
            text-align: center;
          }
        }
      }
    }
  }
`;
