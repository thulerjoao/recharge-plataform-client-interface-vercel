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
  height: 48px;
  width: 100%;
  border: 2px solid ${Theme.colors.secondaryAction};
  border-radius: ${({ isRounded }) => (isRounded ? "8px" : "8px 8px 0 0")};
  animation: ${({ isRounded }) => (!isRounded ? halfRounded : fullRounded)} 0.2s
    forwards;
  padding: 0px 16px;
  padding-top: 12px;
  cursor: pointer;
  margin-top: 24px;
  position: relative;

  .headerText {
    display: flex;
    align-items: center;
  }

  p {
    margin-left: 8px;
  }

  .downArrow {
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BottomElement = styled.div<AnimationProps>`
  background-color: ${Theme.colors.mainlight};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  border-radius: 0 0 8px 8px;
  padding: 0px 24px;
  border: ${({ isRounded }) =>
    !isRounded ? `2px solid ${Theme.colors.secondaryAction};` : "0"};
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
    height: ${({ secondExpand }) => (secondExpand ? "40px" : "0")};
    animation: 0.5s easy-in-out;
  }

  .bottomButton {
    width: 100%;
    overflow: hidden;
    padding: 0 16px;
    z-index: 10;
  }

  .pixImage {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 271px;
    overflow: hidden;
    height: ${({ secondExpand }) => (secondExpand ? "271px" : "0")};
    animation: 0.5s easy-in-out;
  }
`;

const halfRounded = keyframes`
  from {
    border-radius: 8px;
  }
  to {
    border-radius: 8px 8px 0 0;
  }
`;

const fullRounded = keyframes`
  from {
    border-radius: 8px 8px 0 0;
  }
  to {
    border-radius: 8px ;
  }
`;

const expandFirstStep = keyframes`
  from {
    height: 0;
  }
  to {
    height: 136px;
  }
`;

const shrinkFirstStep = keyframes`
  from {
    height: 136px;
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
    height: 481px;
  }
`;

const shrinkSecondStep = keyframes`
  from {
    height: 481px;
  }
  to {
    height: 0px;
  }
`;
