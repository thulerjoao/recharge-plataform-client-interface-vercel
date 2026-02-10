import styled from "styled-components";

export const InfluencerDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 64px;
  padding-top: 64px;

  .mobile {
    display: none;
  }

  .influencerMainContent {
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
      background: ${({ theme }) => theme.background_01};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .avatar {
        width: 64px;
        height: 64px;
        background: ${({ theme }) => theme.text_04};
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
            background: ${({ theme }) => theme.approved}20;
            border: 1px solid ${({ theme }) => theme.approved};
          }

          &.inactive {
            background: ${({ theme }) => theme.refused}20;
            border: 1px solid ${({ theme }) => theme.refused};
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
        background: ${({ theme }) => theme.background_01};
        border-radius: 12px;
        -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
        -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
        box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

        &.unifiedInfoSection {
          .sectionDivider {
            height: 1px;
            background: ${({ theme }) => theme.text_04}20;
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

            .error-message {
              color: ${({ theme }) => theme.refused};
              font-size: 12px;
              margin-top: 4px;
            }
          }
        }

        .salesContent {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;

          .currentMonthSales {
            padding: 20px;
            background: ${({ theme }) => theme.approved}10;
            border: 1px solid ${({ theme }) => theme.approved}30;
            cursor: pointer;
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

            .clickIndicator {
              margin-top: 8px;
              padding-top: 8px;
              border-top: 1px solid ${({ theme }) => theme.approved}30;
              opacity: 0.8;
              width: 100%;
              display: flex;
              justify-content: center;
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
                background: ${({ theme }) => theme.background_01};
                border: 1px solid ${({ theme }) => theme.text_04}20;
                border-radius: 8px;
                transition: all 0.2s ease;

                &:hover {
                  border-color: ${({ theme }) => theme.text_04}40;
                }

                .salesInfo {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 16px;
                }
              }
            }
          }

          .noSales {
            padding: 20px;
            text-align: center;
            background: ${({ theme }) => theme.background_01};
            border: 1px dashed ${({ theme }) => theme.text_04}30;
            border-radius: 8px;
          }
        }

        .couponsContent {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 20px;

          .couponsSummary {
            padding: 20px;
            background: ${({ theme }) => theme.pending}10;
            border: 1px solid ${({ theme }) => theme.pending}30;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
            text-align: center;
            cursor: pointer;

            .clickIndicator {
              margin-top: 8px;
              padding-top: 8px;
              border-top: 1px solid ${({ theme }) => theme.pending}30;
              opacity: 0.8;
              width: 100%;
              display: flex;
              justify-content: center;
            }
          }

          .couponsActions {
            display: flex;
            justify-content: center;
          }
        }

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
            border: 2px solid ${({ theme }) => theme.border_01};
            color: ${({ theme }) => theme.border_01};
            background: ${({ theme }) => theme.text_01};
            cursor: pointer;

            &:focus {
              outline: none;
              box-shadow: 0px 0px 7px 0px ${({ theme }) => theme.mainColor};
              border: 2px solid ${({ theme }) => theme.mainColor};
            }

            &.error {
              border-color: ${({ theme }) => theme.pending};
              box-shadow: 0 0 0 3px ${({ theme }) => theme.pending}40;
            }

            option {
              background: ${({ theme }) => theme.text_01};
              color: ${({ theme }) => theme.border_01};
              padding: 8px;
              border: none;
            }
          }

          input {
            &.error {
              border-color: ${({ theme }) => theme.pending};
              box-shadow: 0 0 0 3px ${({ theme }) => theme.pending}40;
            }
          }

          .error-message {
            color: ${({ theme }) => theme.pending};
            font-size: 12px;
            margin-top: 6px;
            display: block;
            animation: fadeIn 0.2s ease;
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

  .viewAllSales,
  .viewAllCoupons {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      width: 14rem;
      cursor: pointer;
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

    .influencerMainContent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        text-align: center;
        gap: 16px;
        padding: 20px;
        margin-bottom: 20px;

        .headerInfo {
          align-items: center;
        }

        .onOff {
          align-items: center;
          flex-direction: row;
          gap: 8px;
          justify-content: space-between;
          width: 100%;
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

          .couponsContent {
            .couponsSummary {
              padding: 16px;
            }
          }
        }
      }

      .actionsSection {
        flex-direction: row;
        gap: 12px;
        justify-content: center;
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

    .influencerMainContent {
      padding: 0;
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

          .couponsContent {
            .couponsSummary {
              padding: 14px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 400px) {
    .influencerMainContent {
      padding: 0;
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

          .couponsContent {
            .couponsSummary {
              padding: 12px;
            }
          }
        }
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
