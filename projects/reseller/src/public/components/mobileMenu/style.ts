import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const MobileMenuContainer = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  background-color: ${Theme.colors.maindark};
  padding: 0 16px;

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
    margin-bottom: 16px;
  }

  .selected {
    background-color: ${Theme.colors.mainHighlight};
    border-radius: 16px;
  }
`;
