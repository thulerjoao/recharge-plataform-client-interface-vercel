import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ConfirmModalContainer = styled.div`
  z-index: 100;
  background-color: ${Theme.colors.mainTransparent};
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  .mainContent {
    position: relative;
    width: 496px;
    max-width: 496px;
    background-color: ${Theme.colors.maindark};
    padding: 48px 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .close {
      position: absolute;
      top: 16px;
      right: 16px;
      height: 24px;
      width: 24px;
      cursor: pointer;
    }

    .buttonsContainer {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-top: 36px;
    }
  }
`;
