import styled from "styled-components";

export const PriceCardContainer = styled.div`
  width: 100%;
  height: 32px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;

  span {
    width: 100%;

    .image {
      margin-right: 4px;
    }

    .title {
      margin-right: 8px;
    }
  }
  .tax {
    max-width: 234px;
    display: flex;
    align-items: center;
  }
  .totalCost {
    max-width: 110px;
  }
  .profitMargin {
    max-width: 164px;
  }
  .profitValue {
    max-width: 147px;
  }
  .saleValue {
    max-width: 146px;
  }
`;
