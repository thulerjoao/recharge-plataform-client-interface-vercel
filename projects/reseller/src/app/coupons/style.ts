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

  .mainContentComponent {
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
      background: ${({ theme }) => theme.background_01};
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

    .tabsSection {
      display: flex;
      gap: 8px;
      background: ${({ theme }) => theme.background_01};
      border-radius: 12px;
      padding: 8px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .tabButton {
        flex: 1;
        padding: 12px 24px;
        border: none;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;

        &.active {
          background: ${({ theme }) => theme.mainColor};
        }
      }
    }

    .filtersSection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: ${({ theme }) => theme.background_01};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .searchSection {
        width: 300px;
        display: flex;
        align-items: center;
        position: relative;

        .searchButton {
          width: 28px;
          height: 28px;
          background-color: ${({ theme }) => theme.text_01};
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
          border: 2px solid ${({ theme }) => theme.border_01};
          background: ${({ theme }) => theme.text_01};
          color: ${({ theme }) => theme.border_01};
          font-size: 14px;
          cursor: pointer;

          &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.mainColor};
          }
        }
      }
    }

    .tableSection {
      background: ${({ theme }) => theme.background_01};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      overflow: hidden;

      .tableHeader {
        display: grid;
        grid-template-columns: 2fr 2fr 1.2fr 1fr;
        background: ${({ theme }) => theme.text_04};
        padding: 16px 20px;
        gap: 16px;

        .tableCell {
          font-weight: 600;
          color: ${({ theme }) => theme.text_01};
          font-size: 14px;

          &.actionHeader {
            text-align: center;
          }
        }

        .desktopOnly {
          @media (max-width: 539px) {
            display: none;
          }
        }
      }
    }

    .emptyState {
      width: 100%;
      padding: 48px 0;
      text-align: center;
    }
  }

  /* Breakpoint para telas médias (1200px e menores) */
  @media (max-width: 1200px) {
    .mainContentComponent {
      .tableSection {
        .tableHeader {
          grid-template-columns: 2fr 2fr 1fr 1.2fr;
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
      height: 0;
    }

    .mainContentComponent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        gap: 16px;
        text-align: center;
        padding: 20px;
        margin-bottom: 20px;
      }

      .tabsSection {
        .tabButton {
          padding: 10px 16px;
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
          grid-template-columns: 2fr 2fr 1fr 1.2fr;
          gap: 10px;
          padding: 12px 20px;

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
    .mainContentComponent {
      padding: 0px;
      gap: 20px;

      .headerSection {
        padding: 16px;
        margin-bottom: 16px;
        gap: 12px;
      }

      .tabsSection {
        padding: 8px;

        .tabButton {
          padding: 8px 12px;
        }
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
    .mainContentComponent {
      padding: 0;
      gap: 16px;

      .headerSection {
        padding: 14px;
        margin-bottom: 14px;
        gap: 10px;
      }

      .tabsSection {
        padding: 6px;

        .tabButton {
          padding: 8px 12px;
        }
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
