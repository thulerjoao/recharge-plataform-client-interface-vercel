import styled from "styled-components";

export const LoginModalBackground = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    color: ${({ theme }) => theme.text_01} !important;
  }

  @media (max-width: 767px) {
    padding: 0 16px;
  }
`;

export const LoginModalContainer = styled.div`
  padding-top: 28px;
  width: 100%;
  max-width: 560px;
  background-color: ${({ theme }) => theme.background_02};
  border: 1px solid ${({ theme }) => theme.border_02};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding-bottom: 48px;

  .close {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 8px;
    padding: 0 16px;
    min-height: 24px;

    span {
      cursor: pointer;
    }
  }

  .newAccountButton {
    cursor: pointer;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 456px;
  }
`;
