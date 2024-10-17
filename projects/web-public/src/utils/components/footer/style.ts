import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 238px;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${Theme.colors.mainBbackgroundSolid};
  z-index: 100;

  .centerComponent {
    width: 100%;
    height: 100%;
    max-width: 55.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .upperComponent {
      width: 100%;
      height: 82px;
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .paymentMethods {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        .paymentIcons {
          display: flex;
          justify-content: center;
          width: 170px;
          flex-wrap: wrap;
          gap: 8px;
        }
      }
    }

    .bottomComponent {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 48px;
      margin-top: 68px;

      .topPhrase {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .bottomPhrase {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    }
  }
`;
