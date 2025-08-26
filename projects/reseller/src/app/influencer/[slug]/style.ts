import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const InfluencerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .mainTitle {
    margin-top: 48px;
    margin-bottom: 24px;
  }

  .addButtonContainer {
    margin: 42px;
    width: 100%;
    max-width: 700px;
  }

  .influencersContainer {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 0 24px;
    margin-bottom: 32px;

    .influencerCardWrapper {
      width: 100%;
    }

    .emptyState {
      width: 100%;
      padding: 48px 0;
      text-align: center;
    }
  }

  .modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modalContent {
    background: ${Theme.colors.maindark};
    border-radius: 12px;
    padding: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  }

  @media (max-width: 539px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }

    .mainTitle {
      margin-top: 24px;
      margin-bottom: 16px;
    }

    .addButtonContainer {
      margin-bottom: 24px;
    }

    .influencersContainer {
      padding: 0 16px;
      gap: 12px;
    }
  }
`;
