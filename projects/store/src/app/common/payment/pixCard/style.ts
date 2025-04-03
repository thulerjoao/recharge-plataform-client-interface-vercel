import { Theme } from "@4miga/design-system/theme/theme";
import styled, { keyframes } from "styled-components";

type AnimationProps = {
  firstExpand: boolean;
  secondExpand: boolean;
  isRounded: boolean;
  initialized: boolean;
};

export const PixCardContainer = styled.div<AnimationProps>`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: row;
  background-color: ${Theme.colors.mainlight};
  box-sizing: border-box;
  height: 72px;
  width: 100%;
  border: 2px solid ${Theme.colors.secondaryAction};
  ${({ firstExpand }) =>
    firstExpand && `border: 4px solid ${Theme.colors.mainHighlight}`};
  border-radius: 8px;
  padding: 0px 16px;
  padding-top: 12px;
  cursor: pointer;
  margin-top: 24px;
  position: relative;
  box-shadow: ${({ firstExpand }) =>
    firstExpand && `0px 0px 12px 0px ${Theme.colors.mainHighlight}`};

  .pixText {
    position: absolute;
    left: ${({ firstExpand }) => (firstExpand ? "14px" : "16px")};
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }

  p {
    margin-left: 8px;
  }

  .value {
    position: absolute;
    right: ${({ firstExpand }) => (firstExpand ? "14px" : "16px")};
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BottomElement = styled.div<AnimationProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-top: 0;
  height: ${({ initialized }) => !initialized && "0px"};
  animation: ${({ firstExpand, secondExpand, initialized }) =>
      initialized
        ? firstExpand
          ? secondExpand
            ? expandSecondStep
            : expandFirstStep
          : secondExpand
            ? shrinkSecondStep
            : shrinkFirstStep
        : "none"}
    0.5s forwards;
  overflow: hidden;

  .valueToPay {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
    padding: 0 16px;

    div {
      width: 50%;
    }
  }

  .pixCode {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: ${({ secondExpand }) =>
      secondExpand ? `2px solid ${Theme.colors.secondaryAction};` : "none"};
    overflow: hidden;
    height: ${({ secondExpand }) => (secondExpand ? "56px" : "0")};
    animation: 0.5s easy-in-out;
    background-color: ${Theme.colors.mainlight};
    margin-top: 16px;
    padding: 0 16px;

    input {
      text-decoration: none;
      width: 100%;
      border: none;
      font-weight: 400;
      font-size: 16px;

      &:focus {
        outline: none;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .bottomButton {
    width: 100%;
    max-width: 400px;
    overflow: hidden;
    z-index: 10;
    margin-top: 16px;
  }
  .confirmButton {
    width: 100%;
    max-width: 400px;
    overflow: hidden;
    z-index: 10;
    margin-top: 24px;
  }

  .pixImage {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height: ${({ secondExpand }) => (secondExpand ? "396px" : "0")};
    animation: 0.5s easy-in-out;

    img {
      margin-top: 16px;
      width: 100%;
      max-width: 320px;
      height: auto;
      object-fit: contain;
    }
  }

  @media (max-width: 767px) {
    .bottomButton,
    .confirmButton {
      max-width: 100%;
    }
  }
`;

const expandFirstStep = keyframes`
  from {
    height: 0;
  }
  to {
    height: 80px;
  }
`;

const shrinkFirstStep = keyframes`
  from {
    height: 80px;
  }
  to {
    height: 0px;
  }
`;

const expandSecondStep = keyframes`
  from {
    height: 136px;
  }
  to {
    height: 645px;
  }
`;

const shrinkSecondStep = keyframes`
  from {
    height: 645px;
  }
  to {
    height: 0px;
  }
`;
