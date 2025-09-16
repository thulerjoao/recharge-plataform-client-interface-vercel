import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CouponDetailsContainer = styled.div`
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

      .couponInfo {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .couponTitle {
          display: flex;
          align-items: center;
          gap: 12px;

          .firstPurchaseBadge {
            background: ${Theme.colors.mainHighlight};
            color: ${Theme.colors.maindark};
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
          }
        }

        .couponDiscount {
          .firstPurchaseBadge {
            background: ${Theme.colors.mainHighlight};
            color: ${Theme.colors.maindark};
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
          }
        }
      }

      .statusSection {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 16px;

        .statusBadge {
          padding: 4px 12px;
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

        .onOff {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          width: 100%;
          margin-top: 8px;
        }
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

        &.unifiedInfoSection {
          .sectionDivider {
            height: 1px;
            background: ${Theme.colors.secondaryTextAction}20;
            margin: 24px 0;
          }

          .sectionTitle {
            margin-bottom: 16px;
          }
        }

        .infoGrid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;

          .infoItem {
            display: flex;
            flex-direction: column;
            gap: 8px;

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
      margin-top: 28px;
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
        flex-direction: column;
        text-align: center;
        gap: 16px;
        padding: 20px;
        margin-bottom: 20px;

        .couponInfo {
          align-items: center;
        }

        .statusSection {
          align-items: center;
          flex-direction: row;
          gap: 8px;
          justify-content: space-between;
          width: 100%;

          .onOff {
            margin-top: 0;
          }
        }
      }

      .infoSections {
        .infoSection {
          padding: 20px;
          margin-bottom: 20px;

          .infoGrid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          &.unifiedInfoSection {
            .sectionDivider {
              margin: 20px 0;
            }
          }
        }
      }

      .actionsSection {
        flex-direction: row;
        gap: 12px;
        justify-content: center;
        margin-top: 20px;

        button {
          flex: 1;
          max-width: 160px;
        }
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
      padding: 0px;
      gap: 20px;

      .headerSection {
        padding: 16px;
        margin-bottom: 16px;
        gap: 12px;
      }

      .infoSections {
        .infoSection {
          padding: 16px;
          margin-bottom: 16px;
          gap: 12px;

          &.unifiedInfoSection {
            .sectionDivider {
              margin: 16px 0;
            }
          }
        }
      }

      .actionsSection {
        gap: 10px;
        margin-top: 16px;

        button {
          max-width: 140px;
        }
      }
    }
  }

  @media (max-width: 400px) {
    .mainContent {
      padding: 0px;
      gap: 16px;

      .headerSection {
        padding: 14px;
        margin-bottom: 14px;
        gap: 10px;
      }

      .infoSections {
        .infoSection {
          padding: 14px;
          margin-bottom: 14px;
          gap: 10px;

          &.unifiedInfoSection {
            .sectionDivider {
              margin: 14px 0;
            }
          }
        }
      }

      .actionsSection {
        gap: 8px;
        margin-top: 14px;

        button {
          max-width: 120px;
          font-size: 14px;
        }
      }
    }
  }
`;
