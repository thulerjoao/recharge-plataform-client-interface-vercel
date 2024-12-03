import { Theme } from "@4miga/design-system/theme/theme";
import styled, { keyframes } from "styled-components";

interface Props {
  openSearch: boolean;
  openMenu: boolean;
}

export const MobileMenuContainer = styled.div<Props>`
  width: 100%;
  max-width: 100%;
  height: 100vh;
  animation: ${({ openMenu }) => openMenu && expand} 0.5s forwards;
  background-color: ${Theme.colors.maindark};
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
    border-bottom: 1px solid ${Theme.colors.secondaryAction};

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
      border: 1px solid ${Theme.colors.mainHighlight};
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
  }
  .bottomOptions {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: 16px;
    padding: 0 16px;
    height: 128px;
    ${({ openSearch }) => !openSearch && "position: absolute"};
    ${({ openSearch }) => !openSearch && "bottom: 0"};
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
