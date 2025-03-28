import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const NewRequestPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 96px;
  padding-bottom: 56px;
  margin-bottom: 60px;

  .mobile {
    display: none;
  }

  main {
    background-color: ${Theme.colors.mainBbackgroundSolid};
    width: 100%;
    max-width: 628px;
    border-radius: 8px;
    padding: 24px;

    .availableValue {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      border-radius: 8px;
      padding: 0 16px;
      background-color: ${Theme.colors.mainTransparent};
      margin-bottom: 16px;
    }

    .withdrawValue {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 66px;
      padding-top: 16px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    main {
      max-width: 100%;
    }
  }
  @media (max-width: 767px) {
    padding-top: 64px;

    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }
    main {
      padding: 24px 16px;
      margin-top: 24px;
      .availableValue {
        height: 88px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 11px;
      }

      .withdrawValue {
        padding: 0;
        padding-top: 16px;
      }
    }
  }
`;
