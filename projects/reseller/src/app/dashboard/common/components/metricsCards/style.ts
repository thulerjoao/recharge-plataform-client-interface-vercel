import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const MetricsCardsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  width: 100%;
  margin-top: 24px;

  .metricCard {
    background-color: ${Theme.colors.maindark};
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    border: 1px solid ${Theme.colors.secondaryAction}80;
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
