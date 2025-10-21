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

    .searchSection {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .searchInputWrapper {
        position: relative;
        width: 100%;

        .searchResults {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: ${Theme.colors.maindark};
          border-radius: 8px;
          border: 2px solid ${Theme.colors.secondaryAction};
          max-height: 240px;
          overflow-y: auto;
          z-index: 100;
          list-style: none;
          padding: 0;
          margin: 0;
          -webkit-box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.3);
          -moz-box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.3);
          box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.3);

          &::-webkit-scrollbar {
            width: 8px;
          }

          &::-webkit-scrollbar-track {
            background: ${Theme.colors.mainlight};
            border-radius: 4px;
          }

          &::-webkit-scrollbar-thumb {
            background: ${Theme.colors.secondaryAction};
            border-radius: 4px;

            &:hover {
              background: ${Theme.colors.mainHighlight};
            }
          }

          .searchResultItem {
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid ${Theme.colors.secondaryTextAction};
            overflow: hidden;

            &:last-child {
              border-bottom: none;
            }

            &:hover {
              background: ${Theme.colors.mainlight}15;
            }

            &:active {
              background: ${Theme.colors.mainlight}25;
            }

            .resultEmail {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: block;
            }
          }
        }

        .noResults {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          background: ${Theme.colors.maindark};
          border-radius: 8px;
          border: 2px solid ${Theme.colors.secondaryAction};
          padding: 16px;
          text-align: center;
          z-index: 100;
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
        }
      }
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
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          background: ${Theme.colors.mainlight}15;
          border-radius: 8px;
          border: 2px solid ${Theme.colors.secondaryTextAction};
          transition: all 0.2s ease;

          .adminInfo {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
            overflow: hidden;

            .adminIcon {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: ${Theme.colors.mainHighlight}20;
              color: ${Theme.colors.mainHighlight};
              flex-shrink: 0;

              svg {
                width: 20px;
                height: 20px;
              }
            }

            .adminEmail {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              min-width: 0;
            }
          }

          .removeButton {
            display: flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.2s ease;
            color: ${Theme.colors.refused};
            font-family: inherit;
            flex-shrink: 0;

            &:hover {
              background: ${Theme.colors.refused}15;
            }

            &:active {
              transform: scale(0.95);
            }

            .removeText {
              font-size: 15px;
              font-weight: 500;
            }

            .removeIcon {
              display: none;
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

      .searchSection {
        gap: 10px;
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

            .adminInfo {
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

            .removeButton {
              padding: 4px 8px;

              .removeText {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 539px) {
    .permissionsContainer {
      padding: 0px;
      gap: 20px;

      .sectionCard {
        padding: 16px;
        gap: 16px;
      }

      .headerSection {
        padding-bottom: 10px;
        gap: 10px;
      }

      .searchSection {
        gap: 8px;
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

            .adminInfo {
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

            .removeButton {
              padding: 6px;
              min-width: 32px;
              justify-content: center;

              .removeText {
                display: none;
              }

              .removeIcon {
                display: block;
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

      .searchSection {
        gap: 6px;
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

            .adminInfo {
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

            .removeButton {
              padding: 5px;
              min-width: 28px;

              .removeText {
                display: none;
              }

              .removeIcon {
                display: block;
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
