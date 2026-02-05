import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CustomerOrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 97px;

  .centerContainer {
    padding-top: 96px;
    width: 100%;
    max-width: 852px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mobile {
      display: none;
    }

    .customerCardSection {
      width: 100%;
      margin-bottom: 24px;
    }

    .cards {
      width: 100%;

      .orderCardContainer {
        width: 100%;
        cursor: pointer;
      }
    }

    .emptyState {
      width: 100%;
      padding: 48px 0;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    .centerContainer {
      padding-top: 64px;
      padding-bottom: 56px;

      .desktop {
        display: none;
      }
      .mobile {
        display: flex;
        width: 100%;
      }

      .mobileHeader {
        position: fixed;
        top: 0;
        z-index: 10;
        margin-top: 12px;
        width: auto;
        height: 0;
      }

      .customerCardSection {
        margin-bottom: 0;
      }

      .cards {
        margin-top: 24px;
      }
    }
  }
`;
