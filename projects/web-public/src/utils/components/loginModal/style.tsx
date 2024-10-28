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
  padding: 0 16px;
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
    justify-content: flex-end;
    margin-top: 16px;
    margin-bottom: 8px;
    padding-right: 16px;

    span {
      cursor: pointer;
    }
  }
`;
