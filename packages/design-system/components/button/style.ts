import styled, { keyframes } from "styled-components";
import { Theme } from "../../theme/theme";

interface ButtonInputProps {
  height: 28 | 32 | 40 | 48;
  width: number;
  rounded: boolean;
  loading: boolean;
  shadow: boolean;
  margin: string;
  isNotSelected: boolean;
}

export const ButtonInput = styled.button<ButtonInputProps>`
  color: ${({ isNotSelected }) =>
    isNotSelected ? Theme.colors.mainlight : Theme.colors.mainBbackgroundSolid};
  user-select: none;
  font-size: ${({ height }) => (height >= 40 ? "16px;" : "14px;")};
  font-weight: 600;
  width: 100%;
  width: ${({ width }) => width && `${width}px`};
  height: ${({ height }) => `${height}px`};
  align-items: center;
  background-color: ${({ isNotSelected }) =>
    isNotSelected ? Theme.colors.secondaryAction : Theme.colors.mainHighlight};
  border: none;
  box-shadow: ${({ shadow }) =>
    shadow && `0px 0px 12px 0px ${Theme.colors.mainHighlight}`};
  border-radius: ${({ height }) => (height >= 44 ? "16px;" : "8px;")};
  border-radius: ${(props) => props.rounded && `${props.height / 2}px`};
  display: flex;
  justify-content: center;
  text-align: center;
  ${(props) => !props.loading && !props.disabled && "cursor: pointer;"}
  ${({ margin }) => `margin: ${margin};`}
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 2px solid ${Theme.colors.mainBbackgroundSolid};
  border-top-color: transparent;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  margin-left: 0px;
  animation: ${spin} 0.8s linear infinite;
`;

export const LeftElement = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 8px;
`;
