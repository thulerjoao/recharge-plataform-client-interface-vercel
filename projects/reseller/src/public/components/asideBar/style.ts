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
`;
