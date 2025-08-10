import styled from "styled-components";

export const NewAccountContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  width: 100%;
  align-items: center;

  .politics {
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    p {
      width: 100%;
      background-color: pink;
    }
  }
`;

export const ErrorMessage = styled.span`
  height: 0px;
  width: 100%;
`;
