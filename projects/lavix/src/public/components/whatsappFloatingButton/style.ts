import styled from "styled-components";

export const WhatsAppGlobalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: 1000;

  .mainContainer {
    width: 100%;
    height: 0;
    max-width: 95rem;
    position: relative;
  }
`;

export const WhatsAppButton = styled.a`
  top: 70vh;
  right: 8px;
  min-width: 42px;
  min-height: 42px;
  max-width: 42px;
  max-height: 42px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.whatsappBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px ${({ theme }) => theme.whatsappBackground};
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.border_01};
  border-bottom: none;
  position: absolute;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1.35px solid ${({ theme }) => theme.whatsappBackground};
    opacity: 0.45;
    animation: pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1.25px solid ${({ theme }) => theme.whatsappBackground};
    opacity: 0.35;
    animation: pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.75s;
  }

  @keyframes pulse-ring {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.45;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
      opacity: 0.25;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.45);
      opacity: 0;
    }
  }

  svg {
    min-width: 42px;
    min-height: 42px;
    max-width: 42px;
    max-height: 42px;
    margin-top: 12px;
    margin-left: 42%;
    z-index: 1000;
    position: relative;
  }

  &:active {
    transform: scale(0.95);
  }

  .bottomText {
    width: 42px;
    height: 28px;
    background-color: ${({ theme }) => theme.whatsappBackground};
    position: absolute;
    bottom: -8px;
    border: 1px solid ${({ theme }) => theme.border_01};
    border-top: none;
    border-radius: 0 0 4px 4px;
    z-index: 999;

    p {
      text-shadow: 0 0px 5px ${({ theme }) => theme.background_01};
      color: ${({ theme }) => theme.text_01} !important;
      font-size: 10px !important;
      font-weight: 600 !important;
      top: 13px;
      position: absolute;
      z-index: 1000;
    }
  }

  @media (min-width: 768px) {
    top: 7vh;
    min-width: 50px;
    min-height: 50px;
    max-width: 50px;
    max-height: 50px;
    right: 16px;
    box-shadow: 0 6px 16px ${({ theme }) => theme.whatsappBackground};

    &::before {
      width: 50px;
      height: 56px;
      border: 2px solid ${({ theme }) => theme.whatsappBackground};
    }

    &::after {
      width: 50px;
      height: 56px;
      border: 1.75px solid ${({ theme }) => theme.whatsappBackground};
    }

    svg {
      min-width: 50px;
      min-height: 50px;
      max-width: 50px;
      max-height: 50px;
      margin-top: 16px;
      margin-left: 50%;
    }

    .bottomText {
      width: 50px;
      height: 36px;
      bottom: -10px;

      p {
        font-size: 12px !important;
        top: 16px;
      }
    }
  }
`;
