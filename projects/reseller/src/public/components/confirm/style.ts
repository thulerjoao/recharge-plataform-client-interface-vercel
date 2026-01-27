import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ConfirmModalBackground = styled.div`
  z-index: 9999;
  position: fixed;
  background-color: transparent;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
`;

export const ConfirmModalContainer = styled.div`
  background: ${Theme.colors.maindark};
  color: ${Theme.colors.mainlight};
  border: 1px solid ${Theme.colors.mainHighlight};
  border-radius: 12px;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 300px;
  max-width: 400px;
  font-family: "Montserrat", "Open Sans", sans-serif;
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  .message {
    margin: 0;
    white-space: pre-line;
    text-align: center;
    color: ${Theme.colors.mainlight};
  }

  .buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 8px;
  }
`;
