import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const InfluencerSalesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 64px;
  padding-top: 64px;

  .mobile {
    display: none;
  }

  .salesMainContent {
    width: 100%;
    max-width: 900px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .headerSection {
      padding: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }

    .infoSection {
      padding: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .salesContent {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;

        .currentMonthSales {
          padding: 20px;
          background: ${Theme.colors.approved}10;
          border: 1px solid ${Theme.colors.approved}30;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 12px;

          .salesAmount {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: center;
            text-align: center;
          }
        }

        .previousMonthsSales {
          display: flex;
          flex-direction: column;
          gap: 16px;

          .salesList {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .salesItem {
              padding: 16px;
              background: ${Theme.colors.maindark};
              border: 1px solid ${Theme.colors.secondaryTextAction}20;
              border-radius: 8px;
              transition: all 0.2s ease;

              &:hover {
                border-color: ${Theme.colors.secondaryTextAction}40;
              }

              .salesInfo {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
              }
            }
          }

          .noSales {
            padding: 20px;
            text-align: center;
            background: ${Theme.colors.maindark};
            border: 1px dashed ${Theme.colors.secondaryTextAction}30;
            border-radius: 8px;
          }
        }
      }
    }
  }

  .loadingContainer {
    width: 100%;
    max-width: 900px;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
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

    .salesMainContent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        padding: 20px;
        margin-bottom: 20px;
      }

      .infoSection {
        padding: 20px;
        margin-bottom: 20px;

        .salesContent {
          .currentMonthSales {
            padding: 16px;
          }

          .previousMonthsSales {
            .salesList {
              .salesItem {
                padding: 14px 16px;

                .salesInfo {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 8px;
                }
              }

              .noSales {
                padding: 30px 16px;
              }
            }
          }
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

    .salesMainContent {
      padding: 0;
      gap: 20px;

      .headerSection {
        padding: 16px;
        margin-bottom: 16px;
      }

      .infoSection {
        padding: 16px;
        margin-bottom: 16px;

        .salesContent {
          .currentMonthSales {
            padding: 14px;
          }

          .previousMonthsSales {
            .salesList {
              .salesItem {
                padding: 12px 14px;

                .salesInfo {
                  gap: 6px;
                }
              }

              .noSales {
                padding: 24px 12px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 400px) {
    .salesMainContent {
      padding: 0;
      gap: 16px;

      .headerSection {
        padding: 14px;
        margin-bottom: 14px;
      }

      .infoSection {
        padding: 14px;
        margin-bottom: 14px;

        .salesContent {
          .currentMonthSales {
            padding: 12px;
          }

          .previousMonthsSales {
            .salesList {
              .salesItem {
                padding: 10px 12px;

                .salesInfo {
                  gap: 4px;
                }
              }

              .noSales {
                padding: 20px 10px;
              }
            }
          }
        }
      }
    }
  }
`;
