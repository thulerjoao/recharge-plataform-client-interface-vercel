import styled from "styled-components";

export const ConfirmCodeContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  width: 100%;
  align-items: center;

  .codeInput {
    width: 100%;
    text-align: "center";
  }
`;

export const ErrorMessage = styled.span`
  height: 0px;
  width: 100%;
`;
