import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const AdmPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .permissionsContainer {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 24px;

    .promoteSection,
    .adminsListSection {
      width: 100%;
    }

    .sectionCard {
      display: flex;
      flex-direction: column;
      gap: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      padding: 24px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
    }

    .headerSection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 2px solid ${Theme.colors.secondaryTextAction};

      .titleSection {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }

    .selectSection {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .emailSelect {
        width: 100%;
        padding: 12px 16px;
        font-size: 15px;
        border-radius: 8px;
        border: 2px solid ${Theme.colors.secondaryAction};
        background: ${Theme.colors.mainlight};
        color: ${Theme.colors.secondaryTextAction};
        cursor: pointer;
        transition: all 0.2s ease;

        &:focus {
          outline: none;
          border-color: ${Theme.colors.mainHighlight};
          -webkit-box-shadow: 0px 0px 0px 3px ${Theme.colors.mainHighlight}20;
          -moz-box-shadow: 0px 0px 0px 3px ${Theme.colors.mainHighlight}20;
          box-shadow: 0px 0px 0px 3px ${Theme.colors.mainHighlight}20;
        }

        &:hover {
          border-color: ${Theme.colors.mainHighlight};
        }

        option {
          padding: 8px;
          background: ${Theme.colors.mainlight};
          color: ${Theme.colors.secondaryTextAction};

          &:disabled {
            color: ${Theme.colors.secondaryText};
          }
        }
      }
    }

    .actionSection {
      display: flex;
      justify-content: center;
      padding-top: 16px;
      border-top: 2px solid ${Theme.colors.secondaryTextAction};

      button {
        &:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      }

      /* Estilos para botão de rebaixar (desabilitado temporariamente) */
      /* &.demote {
        button {
          background-color: ${Theme.colors.refused} !important;
          border-color: ${Theme.colors.refused} !important;

          &:hover:not(:disabled) {
            opacity: 0.8;
          }
        }
      } */
    }

    /* Lista de Administradores Atuais */
    .adminsListContent {
      .emptyState {
        padding: 32px 0;
        text-align: center;
      }

      .adminsList {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .adminItem {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: ${Theme.colors.mainlight}15;
          border-radius: 8px;
          border: 2px solid ${Theme.colors.secondaryTextAction};
          transition: all 0.2s ease;

          &:hover {
            border-color: ${Theme.colors.mainHighlight};
            background: ${Theme.colors.mainlight}25;
          }

          .adminIcon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: ${Theme.colors.mainHighlight}20;
            color: ${Theme.colors.mainHighlight};

            svg {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }

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

    .permissionsContainer {
      padding: 16px;
      gap: 24px;

      .sectionCard {
        padding: 20px;
        gap: 20px;
      }

      .headerSection {
        flex-direction: column;
        gap: 12px;
        text-align: center;
        padding-bottom: 12px;
      }

      .selectSection {
        gap: 10px;

        .emailSelect {
          padding: 10px 14px;
          font-size: 14px;
        }
      }

      .actionSection {
        padding-top: 12px;

        button {
          width: 100% !important;
        }
      }

      .adminsListContent {
        .adminsList {
          gap: 10px;

          .adminItem {
            padding: 10px 14px;
            gap: 10px;

            .adminIcon {
              width: 28px;
              height: 28px;

              svg {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 539px) {
    .permissionsContainer {
      padding: 8px;
      gap: 20px;

      .sectionCard {
        padding: 16px;
        gap: 16px;
      }

      .headerSection {
        padding-bottom: 10px;
        gap: 10px;
      }

      .selectSection {
        gap: 8px;

        .emailSelect {
          padding: 9px 12px;
          font-size: 13px;
        }
      }

      .actionSection {
        padding-top: 10px;
      }

      .adminsListContent {
        .adminsList {
          gap: 8px;

          .adminItem {
            padding: 9px 12px;
            gap: 8px;

            .adminIcon {
              width: 26px;
              height: 26px;

              svg {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 400px) {
    .permissionsContainer {
      padding: 4px;
      gap: 16px;

      .sectionCard {
        padding: 14px;
        gap: 14px;
      }

      .headerSection {
        padding-bottom: 8px;
        gap: 8px;
      }

      .selectSection {
        gap: 6px;

        .emailSelect {
          padding: 8px 10px;
          font-size: 12px;
        }
      }

      .actionSection {
        padding-top: 8px;
      }

      .adminsListContent {
        .adminsList {
          gap: 6px;

          .adminItem {
            padding: 8px 10px;
            gap: 6px;

            .adminIcon {
              width: 24px;
              height: 24px;

              svg {
                width: 14px;
                height: 14px;
              }
            }
          }
        }
      }
    }
  }
`;
