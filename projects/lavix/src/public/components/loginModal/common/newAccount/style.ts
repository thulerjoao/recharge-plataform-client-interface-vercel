import styled from "styled-components";

export const NewAccountContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  width: 100%;
  align-items: center;

  .termsAndConditions {
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    margin-top: 16px;
    gap: 4px;

    p {
      width: auto;
    }
  }
`;

export const ErrorMessage = styled.span`
  height: 0px;
  width: 100%;
`;
