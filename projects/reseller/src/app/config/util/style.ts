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
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;

      .sectionHeader {
        width: 100%;
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

      .bannerImagePreview {
        width: 80%;
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
        max-width: 180px;
        width: 100%;
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
          width: 80%;
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
          width: 90%;
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
          width: 90%;
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
