import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface Props {
  openMenu: boolean;
}

export const MobileHeaderContainer = styled.header<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  .topCompoennt {
    background-color: ${({ openMenu }) =>
      openMenu ? Theme.colors.maindark : Theme.colors.mainTransparent};
    border-bottom: ${({ openMenu }) =>
      openMenu && `1px solid ${Theme.colors.secondaryAction}`};
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    height: ${({ openMenu }) => openMenu && "49px"};
    padding: 0 16px;
  }

  span {
    display: flex;
    align-items: center;
  }
`;
