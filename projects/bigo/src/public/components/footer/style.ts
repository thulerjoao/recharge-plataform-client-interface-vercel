import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${Theme.colors.mainBbackgroundSolid};
  position: absolute;
  bottom: 0;

  .centerComponent {
    width: 100%;
    height: 220px;
    max-width: 55.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 80px;

    .upperComponent {
      width: 100%;
      min-height: 82px;
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
      min-height: 48px;
      margin-bottom: 8px;

      .topPhrase {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 4px;
      }

      .bottomPhrase {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .centerComponent {
      margin: 0 80px;

      .bottomComponent {
        margin-bottom: 16px;
      }
    }
  }
  @media (max-width: 767px) {
    .centerComponent {
      margin: 0 16px;

      .bottomComponent {
        margin-bottom: 20px;
      }
    }
  }
`;
