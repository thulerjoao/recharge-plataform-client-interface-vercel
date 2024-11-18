import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const AsideTabletBarContainer = styled.div`
  width: 96px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 0;

  .mainContent {
    height: 100vh;
    max-height: 100vh;
    width: 48px;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: flex-start;
    position: relative;

    .menuOption {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      margin-bottom: 16px;
      cursor: pointer;
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
`;
