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
    padding-top: 36px;

    .centerContainer {
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
