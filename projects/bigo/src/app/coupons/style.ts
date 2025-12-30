import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CouponsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .header {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .emptyState {
    padding: 120px 16px;
  }

  .couponsList {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .emptyState {
      width: 100%;
      padding: 60px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${Theme.colors.maindark}40;
      border-radius: 12px;
      border: 2px dashed ${Theme.colors.secondaryAction};
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .header {
      max-width: 800px;
      margin-top: 16px;
      margin-bottom: 24px;
    }

    .couponsList {
      max-width: 800px;
    }
  }

  @media (max-width: 767px) {
    padding: 0px 16px;
    min-height: calc(100vh - 48px - 300px);

    .header {
      max-width: 100%;
      margin-top: 16px;
      margin-bottom: 0px;

      h1 {
        font-size: 24px;
      }
    }

    .couponsList {
      max-width: 100%;
      gap: 8px;
    }
  }
`;
