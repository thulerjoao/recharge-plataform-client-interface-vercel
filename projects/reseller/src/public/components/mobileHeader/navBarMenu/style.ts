import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface Props {
  openMenu: boolean;
}

export const MobileNavBar = styled.div<Props>`
  width: 100%;
  height: 56px;
  height: ${({ openMenu }) => openMenu && "0px"};
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${Theme.colors.maindark};
  border-top: 1px solid ${Theme.colors.secondaryTextAction};
  position: fixed;
  bottom: -1px;
  z-index: 999;
  overflow: hidden;

  span {
    border-radius: 8px;
    padding: 4px;
  }

  .selected {
    background-color: ${Theme.colors.mainHighlight};
  }
`;
