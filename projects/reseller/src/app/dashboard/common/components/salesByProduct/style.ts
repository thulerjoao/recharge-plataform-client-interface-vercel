import styled from "styled-components";

export const SalesByProductContainer = styled.section`
  width: 100%;

  .productCard {
    display: flex;
    width: 100%;
    min-height: 88px;
    background-color: ${({ theme }) => theme.background_01};
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    margin-bottom: 16px;
    gap: 24px;

    .productImage {
      height: 64px;
      width: 64px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .productInfo {
      flex: 1;
      min-width: 0;
    }

    .productMetrics {
      display: flex;
      gap: 32px;
      align-items: center;

      .metric {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        min-width: 100px;
      }
    }
  }

  @media (max-width: 767px) {
    .productCard {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      .productMetrics {
        width: 100%;
        justify-content: space-between;
        gap: 16px;

        .metric {
          align-items: flex-start;
          min-width: auto;
        }
      }
    }
  }
`;
