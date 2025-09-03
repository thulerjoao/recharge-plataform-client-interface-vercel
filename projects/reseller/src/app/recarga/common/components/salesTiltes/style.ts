import styled from "styled-components";

export const SalesTitlesContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32;
  width: 100%;
  padding: 0 48px 0 80px;
  margin-bottom: 24px;

  span {
    width: 100%;
  }

  .orderNumber {
    max-width: 112px;
  }

  .names {
    max-width: 220px;
  }

  .status {
    max-width: 140px;
  }

  @media (max-width: 767px) {
    .desktop {
      display: none;
    }
  }
`;
