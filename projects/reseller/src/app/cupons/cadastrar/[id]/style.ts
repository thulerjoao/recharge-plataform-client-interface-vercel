import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CreateCouponContainer = styled.div`
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

      .statusSection {
        display: flex;
        flex-direction: column;
        align-items: center;
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

            .currencyInput {
              display: flex;
              align-items: center;
              gap: 8px;
              background: ${Theme.colors.mainlight};
              border: 2px solid ${Theme.colors.secondaryAction};
              border-radius: 8px;
              padding: 0 12px;
              height: 32px;

              &.error {
                border-color: ${Theme.colors.pending};
                box-shadow: 0 0 0 3px ${Theme.colors.pending}40;
              }

              .currencySuffix {
                color: ${Theme.colors.secondaryAction};
                font-size: 14px;
                font-weight: 500;
                user-select: none;
              }

              input {
                border: none;
                background: transparent;
                flex: 1;
                height: 100%;
                font-size: 14px;
                color: ${Theme.colors.secondaryAction};
                outline: none;

                &::placeholder {
                  color: ${Theme.colors.secondaryText};
                }
              }
            }

            .influencerSelect,
            .discountTypeSelect {
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

            .checkboxSection {
              display: flex;
              align-items: center;
              gap: 12px;

              .checkbox {
                width: 18px;
                height: 18px;
                accent-color: ${Theme.colors.mainHighlight};
                cursor: pointer;
              }
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

      .headerSection {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
        text-align: left;

        .titleSection {
          flex: 1;
          min-width: 0;
        }

        .statusSection {
          flex-shrink: 0;
          align-items: center;
          min-width: 80px;
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
        flex-direction: row;
        justify-content: center;
        gap: 16px;
        flex-wrap: nowrap;

        button {
          flex: 1;
          max-width: 160px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .mainContent {
      padding: 12px;
      gap: 20px;

      .headerSection {
        padding: 20px;
        gap: 12px;

        .titleSection {
          gap: 6px;
        }

        .statusSection {
          min-width: 70px;
        }
      }

      .infoSections {
        gap: 20px;

        .infoSection {
          padding: 20px;

          .infoGrid {
            gap: 16px;
          }
        }
      }

      .actionsSection {
        gap: 12px;

        button {
          max-width: 140px;
        }
      }
    }
  }
`;
