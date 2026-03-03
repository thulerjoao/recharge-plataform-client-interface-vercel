import styled from "styled-components";

export const ConfirmCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  width: 100%;
  align-items: center;
`;

interface SendCodeProps {
  sendCode: boolean;
}
export const SendCode = styled.div<SendCodeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 135px;
  height: 28px;
  margin-top: 12px;
  margin-bottom: -6px;
  cursor: ${({ sendCode }) => sendCode && "pointer"};

  h4 {
    min-width: 18px;
    max-width: 18px;
    margin-left: 4px;
  }
`;

export const ErrorMessage = styled.span`
  height: 0px;
  width: 100%;
`;
