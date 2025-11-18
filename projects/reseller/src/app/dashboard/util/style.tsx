import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .centerContainer {
    width: 100%;
    max-width: 900px;
    padding-top: 32px;
    padding-bottom: 56px;

    .mobile {
      display: none;
    }

    .header {
      margin-top: 48px;
      margin-bottom: 32px;

      .headerTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
      }
    }

    .bottomContainer {
      display: flex;
      width: 100%;
      margin-top: 40px;
      gap: 32px;
    }
  }

  @media (min-width: 768px) and (max-width: 1025px) {
    .centerContainer {
      .bottomContainer {
        flex-direction: column;
      }
    }
  }

  @media (max-width: 767px) {
    .centerContainer {
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
        width: 100%;
      }

      .header {
        margin-top: 0px;
        .headerTop {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      .bottomContainer {
        flex-direction: column;
      }
    }
  }
`;
