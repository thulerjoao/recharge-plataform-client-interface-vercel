import styled from "styled-components";

export const CouponSalesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 64px;
  padding-top: 64px;

  .mobile {
    display: none;
  }

  .couponsMainContent {
    width: 100%;
    max-width: 900px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .headerSection {
      padding: 24px;
      background: ${({ theme }) => theme.background_01};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 24px;

      .headerSectionContent {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }

    .tableSection {
      background: ${({ theme }) => theme.background_01};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      overflow: hidden;

      .tableHeader {
        display: grid;
        grid-template-columns: 2fr 2fr 0.4fr;
        background: ${({ theme }) => theme.pending}10;
        border: 1px solid ${({ theme }) => theme.pending}30;
        border-radius: 12px 12px 0 0;
        padding: 16px 20px;
        gap: 16px;

        .tableCell {
          font-weight: 600;
          color: ${({ theme }) => theme.pending};
          font-size: 14px;
        }
      }

      .emptyState {
        padding: 40px;
        text-align: center;
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

    .couponsMainContent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        padding: 20px;
        margin-bottom: 20px;
        flex-direction: column;
        justify-content: center;

        .headerSectionContent {
          width: 100%;
          align-items: center;
          text-align: center;
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

    .couponsMainContent {
      padding: 0;
      gap: 20px;

      .headerSection {
        padding: 16px;
        margin-bottom: 16px;
      }
      .tableSection {
        .tableHeader {
          display: none; /* Oculta completamente o header em mobile */
        }
      }
    }
  }

  @media (max-width: 400px) {
    .couponsMainContent {
      padding: 0;
      gap: 16px;

      .headerSection {
        padding: 14px;
        margin-bottom: 14px;
      }
    }
  }
`;
