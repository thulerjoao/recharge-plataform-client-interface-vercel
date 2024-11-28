import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const WalletContainer = styled.div`
  padding-top: 96px;

  main {
    display: flex;
    width: 100%;
    padding-bottom: 55px;

    .leftTopContainer {
      width: 50%;
      padding-right: 16px;
    }
    .rightBottomContainer {
      width: 50%;
      padding-left: 16px;
    }

    .topOption {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 0 16px;
      cursor: pointer;
      background-color: ${Theme.colors.mainBbackgroundSolid};
      border-radius: 8px;
    }

    .bottomContainer {
      width: 100%;
      margin-top: 32px;
      background-color: ${Theme.colors.mainBbackgroundSolid};
      border-radius: 8px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
  }
`;
