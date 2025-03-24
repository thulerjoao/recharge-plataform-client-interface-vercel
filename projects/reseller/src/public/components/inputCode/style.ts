import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ValidationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  max-width: 320px;
  margin-top: 24px;
  position: relative;

  .codeBox {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: ${Theme.colors.mainlight};
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    span {
      font-size: 16px;
      color: ${Theme.colors.secondaryAction};
      width: 100%;
      text-align: center;
      animation: blink-animation 1s infinite;
      margin: 0;
    }
    @keyframes blink-animation {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  .hiddenInput {
    position: absolute;
    width: 100%;
    z-index: -99;
    font-size: 18px;
    background-color: transparent;
    color: transparent;
    caret-color: transparent;
    border: none;

    &:focus {
      outline: none;
    }
  }
`;
