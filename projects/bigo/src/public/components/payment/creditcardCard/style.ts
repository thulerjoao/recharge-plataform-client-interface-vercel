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
  background-color: ${({ theme }) => theme.text_01};
  box-sizing: border-box;
  height: 72px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.border_01};
  ${({ expand, theme }) =>
    expand && `border: 4px solid ${theme.mainColor}`};
  border-radius: 8px;
  padding: 0px 16px;
  padding-top: 12px;
  cursor: pointer;
  margin-top: 24px;
  position: relative;
  box-shadow: ${({ expand, theme }) =>
    expand && `0px 0px 12px 0px ${theme.mainColor}`};

  .headerText {
    position: absolute;
    left: ${({ expand }) => (expand ? "14px" : "16px")};
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
    right: ${({ expand }) => (expand ? "14px" : "16px")};
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
  justify-content: space-evenly;
  width: 100%;
  border-top: 0;
  height: ${({ initialized }) => !initialized && "0px"};
  animation: ${({ expand, initialized }) =>
      initialized ? (expand ? expandFirstStep : shrinkFirstStep) : "none"}
    0.5s forwards;
  overflow: hidden;

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

  @media (max-width: 767px) {
    .bottomButtons {
      margin: 0;
    }
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
