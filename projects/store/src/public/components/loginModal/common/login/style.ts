import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const LoginComponentContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  width: 100%;
  align-items: center;

  .keepConnected {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    user-select: none;

    .check {
      display: flex;
      cursor: pointer;

      .checkIcon {
        min-width: 16px;
        min-height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${Theme.colors.mainlight};
        border-radius: 2px;

        .fill {
          width: 100%;
          height: 100%;
          border-radius: 2px;
          background-color: ${Theme.colors.mainlight};
          border: 3px solid ${Theme.colors.maindark};
        }
      }
    }

    .forgotPassword {
      width: auto;
      cursor: pointer;
    }
  }
`;

export const ErrorMessage = styled.span`
  height: 0px;
  width: 100%;
`;
