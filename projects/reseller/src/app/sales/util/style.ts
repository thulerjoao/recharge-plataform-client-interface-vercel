import styled from "styled-components";

export const SalesContainer = styled.div`
  padding-top: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .cards {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    padding-top: 72px;

    .cards {
      margin-top: 24px;
    }
  }
`;
