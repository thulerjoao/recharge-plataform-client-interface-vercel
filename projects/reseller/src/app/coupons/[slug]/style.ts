import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CouponsContainer = styled.div`
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

      .titleSection {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
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

        /* Classes para controle de visibilidade responsiva */
        .desktopOnly {
          @media (max-width: 539px) {
            display: none;
          }
        }
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
        gap: 16px;
        text-align: center;
        padding: 20px;
        margin-bottom: 20px;
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
