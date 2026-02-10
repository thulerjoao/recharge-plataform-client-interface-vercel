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
    background-color: ${({ theme }) => theme.background_06};
    border-bottom: ${({ openMenu, theme }) =>
      openMenu && `1px solid ${theme.border_01}`};
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
    cursor: pointer;
  }
`;
