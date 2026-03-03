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
  background-color: ${({ theme }) => theme.text_01};
  box-sizing: border-box;
  height: 48px;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.border_01};
  /* ${({ firstExpand, theme }) =>
    firstExpand && `border: 2px solid ${theme.mainColor}`}; */
  border-radius: 8px;
  padding: 0px 16px;
  padding-top: 12px;
  cursor: pointer;
  position: relative;
  /* box-shadow: ${({ firstExpand, theme }) =>
    firstExpand && `0px 0px 6px 0px ${theme.mainColor}`}; */

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
    0.4s forwards;
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
    border: ${({ secondExpand, theme }) =>
      secondExpand ? `2px solid ${theme.border_01};` : "none"};
    overflow: hidden;
    height: ${({ secondExpand }) => (secondExpand ? "48px" : "0")};
    animation: 0.4s easy-in-out;
    background-color: ${({ theme }) => theme.text_01};
    margin-top: 18px;
    margin-bottom: 18px;
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
    height: ${({ secondExpand }) => (secondExpand ? "346px" : "0")};
    animation: 0.4s easy-in-out;

    img {
      margin-top: 16px;
      width: 100%;
      max-width: 320px;
      max-width: 280px;
      height: auto;
      object-fit: contain;
    }
  }

  .countDown {
    margin-top: 16px;
    max-width: 230px;
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
