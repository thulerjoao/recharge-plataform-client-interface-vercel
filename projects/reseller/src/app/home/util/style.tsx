import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  padding-top: 32px;
  padding-bottom: 56px;

  .header {
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

  @media (min-width: 768px) and (max-width: 1025px) {
    .bottomContainer {
      flex-direction: column;
    }
  }

  @media (max-width: 767px) {
    padding-top: 80px;

    .header {
      .headerTop {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .bottomContainer {
      flex-direction: column;
    }
  }
`;

