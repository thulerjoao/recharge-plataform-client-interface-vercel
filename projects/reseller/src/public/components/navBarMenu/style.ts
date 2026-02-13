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
  background-color: ${({ theme }) => theme.background_01};
  border-top: 1px solid ${({ theme }) => theme.text_04};
  position: fixed;
  bottom: -1px;
  z-index: 99;
  overflow: visible;

  span {
    border-radius: 8px;
    padding: 4px;
    position: relative;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .selected {
    background-color: ${({ theme }) => theme.mainColor};
  }

  .more-button {
    position: relative;
  }
`;

export const MoreMenuPopover = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  background-color: ${({ theme }) => theme.background_01};
  border: 1px solid ${({ theme }) => theme.text_04};
  border-radius: 8px;
  padding: 8px 0;
  min-width: 140px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MoreMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.text_04}20;
  }

  &.selected {
    background-color: ${({ theme }) => theme.mainColor};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.text_01};
    padding: 0;
  }
`;
