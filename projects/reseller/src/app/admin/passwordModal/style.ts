import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.background_06};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.background_02};
  border-radius: 16px;
  padding: 28px;
  max-width: 420px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.border_02};
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .closeButton {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.text_04};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.background_04};
      color: ${({ theme }) => theme.text_01};
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .userEmail {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.border_01};
  }

  .modalBody {
    display: flex;
    flex-direction: column;
    gap: 12px;

    form {
      margin-top: 4px;
    }

    input {
      background: ${({ theme }) => theme.background_04};
      border: 1px solid ${({ theme }) => theme.border_02};
      color: ${({ theme }) => theme.text_01};

      &::placeholder {
        color: ${({ theme }) => theme.text_04} !important;
      }
    }
  }

  .modalFooter {
    display: flex;
    justify-content: center;
    padding-top: 8px;

    button {
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
    gap: 18px;

    .closeButton {
      top: 12px;
      right: 12px;
      width: 30px;
      height: 30px;

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .modalFooter {
      button {
        width: 100% !important;
      }
    }
  }

  @media (max-width: 539px) {
    padding: 20px;
    gap: 16px;

    .closeButton {
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .userEmail {
      padding-bottom: 10px;
      gap: 2px;
    }

    .modalBody {
      gap: 10px;
    }

    .modalFooter {
      padding-top: 6px;
    }
  }

  @media (max-width: 400px) {
    padding: 16px;
    gap: 14px;

    .closeButton {
      top: 8px;
      right: 8px;
      width: 26px;
      height: 26px;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;
