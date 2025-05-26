import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface Props {
  openMenu: boolean;
}

export const MobileNavBar = styled.div<Props>`
  width: 100%;
  padding: 12px 0px 28px 0px;
  display: flex;
  display: ${({ openMenu }) => openMenu && "none"};
  justify-content: space-around;
  align-items: center;
  background-color: ${Theme.colors.maindark};
  border-top: 1px solid ${Theme.colors.secondaryTextAction};
  position: fixed;
  bottom: -1px;
  z-index: 99;
  overflow: hidden;

  span {
    border-radius: 8px;
    padding: 4px;
  }

  .selected {
    background-color: ${Theme.colors.mainHighlight};
  }
`;
