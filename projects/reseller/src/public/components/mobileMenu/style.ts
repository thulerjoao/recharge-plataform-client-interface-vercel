import { Theme } from "@4miga/design-system/theme/theme";
import styled, { keyframes } from "styled-components";

interface Props {
  openMenu: boolean;
}

export const MobileMenuContainer = styled.div<Props>`
  width: 100%;
  height: ${({ openMenu }) => openMenu && "100vh"};
  animation: ${({ openMenu }) => openMenu && expand} 0.4s forwards;
  overflow: hidden;
  background-color: ${Theme.colors.maindark};
  padding: 0 16px;
  padding-top: 48px;
  position: fixed;
  top: 0;
  left: 0;

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

const expand = keyframes`
  from {
    top: -100vh;
  }

  to {
    top: 0;
  }
`;
