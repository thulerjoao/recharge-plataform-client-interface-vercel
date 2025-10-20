import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SocialNetworksSectionContainer = styled.div`
  padding: 24px;
  background: ${Theme.colors.maindark};
  border-radius: 12px;
  box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  .sectionHeader {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: 2px solid ${Theme.colors.secondaryTextAction};
  }

  .socialGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 8px;
    width: 100%;

    .socialItem {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }

  .actionButtons {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    border-top: 2px solid ${Theme.colors.secondaryTextAction};
    margin-top: 8px;
    width: 100%;
  }

  /* Responsive - Tablets */
  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;

    .sectionHeader {
      padding-bottom: 12px;
    }

    .socialGrid {
      grid-template-columns: 1fr;
      gap: 20px;
      width: 80%;
    }
  }

  /* Responsive - Mobile Large */
  @media (max-width: 539px) {
    padding: 16px;
    gap: 16px;

    .sectionHeader {
      padding-bottom: 12px;
    }

    .socialGrid {
      gap: 16px;
      width: 90%;
    }
  }

  /* Responsive - Mobile Small */
  @media (max-width: 400px) {
    padding: 14px;
    gap: 14px;

    .sectionHeader {
      padding-bottom: 10px;
      gap: 6px;
    }

    .socialGrid {
      gap: 14px;
      width: 90%;
    }
  }
`;
