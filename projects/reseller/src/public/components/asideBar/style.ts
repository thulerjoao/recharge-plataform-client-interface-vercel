import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const AsideBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 0;

  .tablet {
    display: none;
  }

  .inconEnviroment {
    display: flex;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .CenterContent {
    width: 100%;
    max-width: 85.5rem;
    padding: 0 40px;

    .mainContent {
      height: 100vh;
      width: 232px;
      padding: 16px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      justify-content: flex-start;

      .menuOption {
        display: flex;
        align-items: center;
        height: 48px;
        width: 100%;
        padding: 0 16px;
        margin-bottom: 16px;
        cursor: pointer;
      }

      .bottomOptions {
        position: absolute;
        bottom: 0;
        width: 100%;
      }

      .selected {
        background-color: ${Theme.colors.mainHighlight};
        border-radius: 16px;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 96px;

    .desktop {
      display: none;
    }

    .tablet {
      display: flex;
    }

    .CenterContent {
      padding: 0;

      .mainContent {
        width: 48px;
        width: 96px;

        .menuOption {
          padding: 0;
          height: 40px;
          width: 40px;
          justify-content: center;
        }

        .bottomOptions {
          position: fixed;
          bottom: 0px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 96px;
        }

        .selected {
          background-color: ${Theme.colors.mainHighlight};
          border-radius: 16px;
        }
      }
    }
  }
  @media (max-width: 767px) {
  }
`;
