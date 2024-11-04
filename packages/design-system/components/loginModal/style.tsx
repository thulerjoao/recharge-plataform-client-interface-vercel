import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const LoginModalBackground = styled.div`
  z-index: 9999;
  position: fixed;
  background-color: ${Theme.colors.mainTransparent};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    padding: 0 16px;
  }
`;

export const LoginModalContainer = styled.div`
  width: 100%;
  max-width: 560px;
  background-color: ${Theme.colors.maindark};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;

  .close {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 8px;
    padding: 0 16px;
    height: 28px;

    span {
      cursor: pointer;
    }
  }

  .newAccountButton {
    margin: 24px 0 48px 0;
    cursor: pointer;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 456px;
  }
`;
