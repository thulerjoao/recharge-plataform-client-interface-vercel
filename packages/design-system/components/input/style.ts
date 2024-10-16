import styled from "styled-components";
import { Theme } from "../../theme/theme";

interface InputProps {
  height: 40 | 48;
  isfocused: boolean;
  padding: string;
}

export const InputElement = styled.input<InputProps>`
  box-sizing: border-box;
  padding: 0px 16px;
  padding: ${({ padding }) => padding};
  width: 100%;
  font-size: 16px;
  height: ${({ height }) => `${height - 4}px`};
  border-radius: 8px;
  border: 2px solid
    ${({ isfocused }) =>
      isfocused ? Theme.colors.mainHighlight : Theme.colors.secondaryAction};
  box-shadow: ${({ isfocused }) =>
    isfocused && `0px 0px 10px 0px ${Theme.colors.mainHighlight}`};
  color: ${Theme.colors.secondaryAction};
  &::placeholder {
    color: ${Theme.colors.secondaryAction};
  }
  &:focus {
    outline: none;
  }
`;

export const ExternalComponent = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

export const LeftElement = styled.div`
  position: absolute;
  left: 8px;
  top: 0;
  width: 16px;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
