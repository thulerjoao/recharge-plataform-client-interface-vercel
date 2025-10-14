import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SettingsPageContainer = styled.div`
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

    .infoSection {
      padding: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      display: flex;
      flex-direction: column;
      gap: 24px;

      .sectionHeader {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-bottom: 16px;
        border-bottom: 2px solid ${Theme.colors.secondaryTextAction};
      }

      .socialGrid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-top: 8px;

        .socialItem {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
      }

      .actionButtons {
        display: flex;
        justify-content: center;
        padding-top: 8px;
      }

      .carouselPreviewSection {
        width: 100%;

        .carouselPreviewReduced {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;

          .emptyCarousel {
            padding: 60px 20px;
            text-align: center;
            background: ${Theme.colors.secondaryTextAction}20;
            border-radius: 8px;
            width: 100%;
          }
        }
      }

      .thumbnailsSection {
        width: 100%;
        margin-top: 24px;

        .thumbnailsHeader {
          margin-bottom: 12px;
        }

        .thumbnailsGrid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-start;

          .thumbnailItem {
            position: relative;
            width: 160px;
            height: 90px;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid ${Theme.colors.secondaryTextAction};
            transition: all 0.2s ease;

            &:hover {
              border-color: ${Theme.colors.mainHighlight};
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }

            .thumbnailImageWrapper {
              width: 100%;
              height: 100%;
              position: relative;
              aspect-ratio: 21/9;

              .thumbnailImage {
                object-fit: fill;
                object-position: center;
              }
            }

            .removeThumbButton {
              position: absolute;
              top: 4px;
              right: 4px;
              /* background: ${Theme.colors.refused}; */
              border: none;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
              /* opacity: 0.9; */

              &:hover {
                opacity: 1;
              }

              svg {
                width: 14px;
                height: 14px;
                path {
                  fill: white;
                }
              }
            }
          }

          .addThumbnailItem {
            width: 160px;
            height: 90px;
            border-radius: 8px;
            border: 2px dashed ${Theme.colors.secondaryTextAction};
            background: ${Theme.colors.secondaryTextAction}15;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              border-color: ${Theme.colors.mainHighlight};
              background: ${Theme.colors.mainHighlight}15;
            }

            svg {
              width: 24px;
              height: 24px;
              path {
                fill: ${Theme.colors.mainlight};
              }
            }
          }
        }
      }

      .saveChangesSection {
        display: flex;
        justify-content: center;
        padding-top: 8px;
        border-top: 2px solid ${Theme.colors.secondaryTextAction};
        margin-top: 8px;
      }

      .bannerImagePreview {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;

        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      }

      .logoImagePreview {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 16px;

        img {
          max-width: 400px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      }

      .imageActionButtons {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 16px;
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

    .mainContent {
      padding: 16px;
      gap: 24px;

      .infoSection {
        padding: 20px;
        gap: 20px;

        .socialGrid {
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .carouselPreviewSection {
          .carouselPreviewReduced {
            max-width: 100%;
          }
        }

        .thumbnailsSection {
          .thumbnailsGrid {
            justify-content: center;

            .thumbnailItem,
            .addThumbnailItem {
              width: 140px;
              height: 79px;
            }
          }
        }

        .imageActionButtons {
          flex-direction: row;
          gap: 12px;

          button {
            flex: 1;
          }
        }

        .logoImagePreview {
          img {
            max-width: 300px;
          }
        }
      }
    }
  }

  @media (max-width: 539px) {
    .mainContent {
      padding: 8px;
      gap: 20px;

      .infoSection {
        padding: 16px;
        gap: 16px;

        .sectionHeader {
          padding-bottom: 12px;
        }

        .socialGrid {
          gap: 16px;
        }

        .thumbnailsSection {
          .thumbnailsGrid {
            gap: 8px;

            .thumbnailItem,
            .addThumbnailItem {
              width: 120px;
              height: 68px;
            }

            .thumbnailItem {
              .removeThumbButton {
                width: 20px;
                height: 20px;

                svg {
                  width: 12px;
                  height: 12px;
                }
              }
            }

            .addThumbnailItem {
              svg {
                width: 20px;
                height: 20px;
              }
            }
          }
        }

        .imageActionButtons {
          flex-direction: column;
          gap: 12px;

          button {
            width: 100%;
          }
        }

        .logoImagePreview {
          img {
            max-width: 250px;
          }
        }
      }
    }
  }

  @media (max-width: 400px) {
    .mainContent {
      padding: 4px;
      gap: 16px;

      .infoSection {
        padding: 14px;
        gap: 14px;

        .sectionHeader {
          padding-bottom: 10px;
          gap: 6px;
        }

        .socialGrid {
          gap: 14px;
        }

        .thumbnailsSection {
          .thumbnailsGrid {
            gap: 6px;

            .thumbnailItem,
            .addThumbnailItem {
              width: 100px;
              height: 56px;
            }

            .thumbnailItem {
              .removeThumbButton {
                width: 18px;
                height: 18px;

                svg {
                  width: 10px;
                  height: 10px;
                }
              }
            }

            .addThumbnailItem {
              svg {
                width: 18px;
                height: 18px;
              }
            }
          }
        }

        .imageActionButtons {
          gap: 10px;
        }

        .logoImagePreview {
          img {
            max-width: 200px;
          }
        }
      }
    }
  }
`;
