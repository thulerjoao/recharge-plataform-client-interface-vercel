import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 48px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${Theme.colors.mainTransparent};
  z-index: 100;

  .centerComponent {
    width: 100%;
    height: 100%;
    max-width: 85.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mainLogo {
      cursor: pointer;
    }

    .loginContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 165px;

      .loginButton {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-left: 8px;
        padding-right: 8px;
        height: 28px;
        border-radius: 8px;

        &:hover {
          background-color: ${Theme.colors.maindark};
        }
      }
    }
  }
`;
