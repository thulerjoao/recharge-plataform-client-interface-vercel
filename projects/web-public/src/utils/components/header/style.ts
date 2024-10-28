import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 48px;
  position: fixed;
  top: 0;
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
    padding: 0 40px;

    .mainLogo {
      cursor: pointer;
    }

    .loginContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;

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

      .name {
        cursor: default;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .centerComponent {
      padding: 0 24px;
    }
  }
  @media (max-width: 767px) {
    .centerComponent {
      padding: 0 16px;
    }
  }
`;
