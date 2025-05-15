import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  padding-top: 32px;
  padding-bottom: 56px;

  .bottomContainer {
    display: flex;
    width: 100%;
    margin-top: 40px;
    gap: 32px;

    .monthSales {
      width: 100%;
    }
  }

  @media (min-width: 768px) and (max-width: 1025px) {
    .bottomContainer {
      flex-direction: column;
    }
  }
  @media (max-width: 767px) {
    /* padding-top: 80px; */
    padding-top: 120px;

    .bottomContainer {
      flex-direction: column;
    }
  }
`;
