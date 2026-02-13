import styled, { keyframes } from "styled-components";

interface Props {
  openSearch: boolean;
  openMenu: boolean;
}

export const MobileMenuContainer = styled.div<Props>`
  width: 100%;
  max-width: 100%;
  height: 100vh;
  max-height: 100vh;
  animation: ${({ openMenu }) => openMenu && expand} 0.5s forwards;
  background-color: ${({ theme }) => theme.background_01};
  padding: 0 16px;
  padding-top: 48px;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .searchContainer {
    padding-top: 32px;
    border-bottom: 1px solid ${({ theme }) => theme.border_01};

    .filter {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      margin-top: 16px;
      cursor: pointer;

      span {
        display: flex;
        align-items: center;
      }

      p {
        user-select: none;
      }
    }

    .opened {
      border: 1px solid ${({ theme }) => theme.mainColor};
      border-radius: 16px;
    }

    .search {
      padding: 16px 0;
    }
  }

  .menuOption {
    display: flex;
    align-items: center;
    height: 48px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 16px;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .selected {
    background-color: ${({ theme }) => theme.mainColor};
    border-radius: 16px;
    cursor: pointer;
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
