import styled from "styled-components";
import { Theme } from "../../theme/theme";

interface InputProps {
  height: number;
  padding: string;
}

interface ExternalProps {
  margin: string;
}

export const InputElement = styled.input<InputProps>`
  box-sizing: border-box;
  padding: 0px 16px;
  padding: ${({ padding }) => padding};
  width: 100%;
  font-size: 16px;
  height: ${({ height }) => `${height - 4}px`};
  border-radius: 8px;
  border: 2px solid ${Theme.colors.secondaryAction};
  color: ${Theme.colors.secondaryAction};

  &::placeholder {
    color: ${Theme.colors.secondaryAction};
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 7px 0px ${Theme.colors.mainHighlight};
    border: 2px solid ${Theme.colors.mainHighlight};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const ExternalComponent = styled.div<ExternalProps>`
  position: relative;
  width: 100%;
  height: auto;
  ${({ margin }) => `margin: ${margin}`};

  .titleContainer {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    padding-left: 16px;

    svg {
      margin-right: 10px;
      height: 16px;
      width: 16px;
    }
  }
`;

export const LeftElement = styled.div`
  position: absolute;
  left: 8px;
  top: 0;
  width: auto;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightElement = styled.div`
  position: absolute;
  right: 8px;
  top: 0;
  width: auto;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
