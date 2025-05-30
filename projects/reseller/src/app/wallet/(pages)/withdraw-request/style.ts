import styled from "styled-components";

export const WithDrawRequestContainer = styled.div`
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .mobile {
    display: none;
  }

  .cards {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    padding-top: 64px;

    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }

    .cards {
      margin-top: 24px;
    }
  }
`;
