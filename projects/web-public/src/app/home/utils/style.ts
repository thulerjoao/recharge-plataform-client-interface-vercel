import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;

  nav {
    margin-top: 48px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .cardsContainer {
      display: grid;
      gap: 32px;
      grid-template-columns: repeat(3, 1fr);
      margin-top: 24px;
    }

    .securityAdvertising {
      display: flex;
      margin-top: 56px;

      article {
        height: 160px;
        width: 160px;
        border-radius: 16px;
        background-color: ${Theme.colors.mainBbackgroundSolid};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 17px 0;
        box-sizing: border-box;
        margin: 0 28px;
      }
    }
  }

  .contact {
    display: flex;
    margin-top: 56px;

    div {
      width: 280px;
      height: 101px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      span {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }
  }
`;

export const LayoutComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`;
