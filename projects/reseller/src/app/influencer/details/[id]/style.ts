import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const InfluencerDetailsContainer = styled.div`
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
      align-items: center;
      gap: 24px;
      padding: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

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

      .headerInfo {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .statusBadge {
          padding: 2px;
          width: 100px;
          border-radius: 16px;
          display: inline-block;
          text-align: center;

          &.active {
            background: ${Theme.colors.approved}20;
            border: 1px solid ${Theme.colors.approved};
          }

          &.inactive {
            background: ${Theme.colors.refused}20;
            border: 1px solid ${Theme.colors.refused};
          }
        }
      }

      .onOff {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
      }
    }

    .infoSections {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .infoSection {
        padding: 24px;
        background: ${Theme.colors.maindark};
        border-radius: 12px;
        -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
        -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
        box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

        .infoGrid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;

          .infoItem {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .pixTypeSelect {
              box-sizing: border-box;
              padding: 0px 16px;
              width: 100%;
              font-size: 16px;
              height: 28px;
              border-radius: 8px;
              border: 2px solid ${Theme.colors.secondaryAction};
              color: ${Theme.colors.secondaryAction};
              background: ${Theme.colors.mainlight};
              cursor: pointer;

              &:focus {
                outline: none;
                box-shadow: 0px 0px 7px 0px ${Theme.colors.mainHighlight};
                border: 2px solid ${Theme.colors.mainHighlight};
              }

              &.error {
                border-color: ${Theme.colors.pending};
                box-shadow: 0 0 0 3px ${Theme.colors.pending}40;
              }

              option {
                background: ${Theme.colors.mainlight};
                color: ${Theme.colors.secondaryAction};
                padding: 8px;
                border: none;
              }
            }

            input {
              &.error {
                border-color: ${Theme.colors.pending};
                box-shadow: 0 0 0 3px ${Theme.colors.pending}40;
              }
            }

            .error-message {
              color: ${Theme.colors.pending};
              font-size: 12px;
              margin-top: 6px;
              display: block;
              animation: fadeIn 0.2s ease;
            }
          }
        }
      }
    }

    .actionsSection {
      display: flex;
      justify-content: center;
      gap: 16px;
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
        text-align: center;
        gap: 16px;

        .headerInfo {
          align-items: center;
        }
      }

      .infoSections {
        .infoSection {
          .infoGrid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      }

      .actionsSection {
        flex-direction: column;
        gap: 12px;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
