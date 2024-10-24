import { Theme } from "@4miga/design-system/theme/theme";
import styled, { keyframes } from "styled-components";

type AnimationProps = {
  expand: boolean;
  isRounded: boolean;
  initialized: boolean;
};

export const CreditCardContainer = styled.div<AnimationProps>`
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
  animation: ${({ isRounded, initialized }) =>
      initialized ? (!isRounded ? halfRounded : fullRounded) : "none"}
    0.2s forwards;
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  border-radius: 0 0 8px 8px;
  padding: 0px 16px;
  background-color: ${Theme.colors.mainlight};
  border: ${({ isRounded }) =>
    !isRounded ? `2px solid ${Theme.colors.secondaryAction};` : "0"};
  border-top: 0;
  height: ${({ initialized }) => !initialized && "0px"};
  animation: ${({ expand, initialized }) =>
      initialized ? (expand ? expandFirstStep : shrinkFirstStep) : "none"}
    0.5s forwards;
  overflow: hidden;

  .valueToPay {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
    margin: 8px 0;

    div {
      width: 50%;
    }
  }

  .bottomInputs {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bottomButtons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    margin: 16px;
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
    height: 461px;
  }
`;

const shrinkFirstStep = keyframes`
  from {
    height: 461px;
  }
  to {
    height: 0px;
  }
`;
