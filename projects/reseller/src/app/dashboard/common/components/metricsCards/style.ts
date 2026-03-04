import styled from "styled-components";

export const MetricsCardsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  width: 100%;
  margin-top: 24px;

  .metricCard {
    background-color: ${({ theme }) => theme.background_02};
    border: 1px solid ${({ theme }) => theme.border_02};
    border-radius: 8px;
    padding: 20px;
    min-height: 88px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;

    .metricCard {
      padding: 16px;
      min-height: 80px;
    }
  }
`;
