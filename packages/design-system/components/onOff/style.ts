import styled from "styled-components";
import { Theme } from "../../theme/theme";

interface styleProps {
  onOff: boolean;
}

export const OnOffContainer = styled.div<styleProps>`
  width: 64px;
  min-width: 64px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
  ${({ onOff }) =>
    onOff && `box-shadow: 0px 0px 7px 0px ${Theme.colors.mainHighlight}`};
  border: 1px solid
    ${({ onOff }) =>
      onOff ? Theme.colors.mainHighlight : Theme.colors.secondaryAction};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition:
    border 0.5s ease-in-out,
    box-shadow 0.5s ease-in-out;

  .circle {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: ${({ onOff }) =>
      onOff ? Theme.colors.mainHighlight : Theme.colors.secondaryAction};
    transform: ${({ onOff }) =>
      onOff ? "translateX(calc(40px))" : "translateX(-1px)"};
    transition:
      transform 0.2s ease-in-out,
      background-color 0.5s ease-in-out;
  }
`;
