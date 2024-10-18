import styled from "styled-components";

export const ProductContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .cardsContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 488px;
    max-width: 628px;
    justify-content: space-between;
    padding: 0 14px;
    margin-top: 24px;
  }
`;
