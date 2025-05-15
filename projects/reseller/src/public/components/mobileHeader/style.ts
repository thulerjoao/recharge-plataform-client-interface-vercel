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
    z-index: 1;
    background-color: ${Theme.colors.modalBackground};
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

  .navBar {
    width: 100%;
    height: 48px;
    height: ${({ openMenu }) => openMenu && "0px"};
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${Theme.colors.modalBackground};
    border-bottom: 1px solid ${Theme.colors.secondaryTextAction};

    span {
      background-color: ${Theme.colors.mainHighlight};
      border-radius: 8px;
      padding: 4px;
    }
  }

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
