import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ConfigPackagePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .mainContentPackage {
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

      .packageInfo {
        display: flex;
        flex-direction: column;
        gap: 12px;
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

            .toggleContainer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 8px 0;
            }
          }
        }

        .paymentMethodsSection {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .imageSection {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;

          .checkboxContainer {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;

            input[type="checkbox"] {
              margin: 0;
              cursor: pointer;
            }

            label {
              cursor: pointer;
              display: flex;
              align-items: center;
            }
          }

          .cardNavigation {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-evenly;

            .navArrow {
              background: ${Theme.colors.maindark};
              border: 4px solid ${Theme.colors.secondaryAction};
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${Theme.colors.mainlight};
              font-size: 18px;
              font-weight: bold;
              transition: all 0.2s ease;
              outline: none;

              &:hover {
                cursor: pointer;
                border-color: ${Theme.colors.mainHighlight};
              }
            }

            .disabled {
              width: 40px;
            }

            .cardEnviroment {
              border-radius: 8px;
              min-width: 175px;
              background-color: pink;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              border: 1px solid ${Theme.colors.secondaryAction};
              -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
              -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
              box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
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

    .mainContentPackage {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        text-align: center;
        gap: 16px;
        padding: 20px;
        margin-bottom: 20px;

        .packageInfo {
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

          .imageSection {
            .cardNavigation {
              .navArrow {
                width: 36px;
                height: 36px;
                font-size: 16px;
              }

              .disabled {
                width: 36px;
              }
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

    .mainContentPackage {
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

          .imageSection {
            .cardNavigation {
              .navArrow {
                width: 32px;
                height: 32px;
                font-size: 14px;
              }

              .disabled {
                width: 32px;
              }
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
    .mainContentPackage {
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

          .imageSection {
            .cardNavigation {
              .navArrow {
                width: 28px;
                height: 28px;
                font-size: 12px;
              }

              .disabled {
                width: 28px;
              }
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
