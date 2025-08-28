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
        gap: 24px;
        padding-left: 16px;

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

      .searchSection {
        width: 300px;
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

  /* Breakpoint para telas médias (1200px e menores) */
  @media (max-width: 1200px) {
    .mainContent {
      .tableSection {
        .tableHeader {
          grid-template-columns: 2fr 1.5fr 1.5fr 0.5fr;
          gap: 12px;
          padding: 14px 16px;

          .tableCell {
            font-size: 13px;
          }
        }
      }
    }
  }

  /* Breakpoint para tablets (768px e menores) */
  @media (max-width: 768px) {
    padding-top: 64px;
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
    }

    .mainContent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        gap: 20px;
        text-align: left;
        padding: 20px;
        margin-bottom: 20px;
        align-items: flex-start;

        .influencerInfo {
          flex-direction: row;
          gap: 16px;
          align-items: center;
          justify-content: flex-start;

          .info {
            text-align: left;
          }
        }

        .statsSection {
          flex-direction: column;
          gap: 16px;
          align-items: flex-start;
        }
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

      .tableSection {
        .tableHeader {
          grid-template-columns: 2fr 1fr 1fr;
          gap: 10px;
          padding: 12px 14px;

          /* Mantém a coluna de status em tablets */
          .tableCell:last-child {
            display: block;
          }

          .tableCell {
            font-size: 12px;
          }
        }
      }

      .paginationSection {
        padding: 16px;
      }
    }
  }

  /* Breakpoint para mobile grande (539px e menores) */
  @media (max-width: 539px) {
    .mainContent {
      padding: 12px;
      gap: 20px;

      .headerSection {
        padding: 16px;
        margin-bottom: 16px;
        gap: 12px;
      }

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

      .tableSection {
        .tableHeader {
          display: none; /* Oculta completamente o header em mobile */
        }
      }
    }
  }

  /* Breakpoint para mobile pequeno (400px e menores) */
  @media (max-width: 400px) {
    .mainContent {
      padding: 10px;
      gap: 16px;

      .headerSection {
        padding: 14px;
        margin-bottom: 14px;
        gap: 10px;
      }

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

      .tableSection {
        .tableHeader {
          padding: 10px 12px;
          gap: 6px;

          .tableCell {
            font-size: 11px;
            padding: 3px 0;
          }
        }
      }
    }
  }
`;
