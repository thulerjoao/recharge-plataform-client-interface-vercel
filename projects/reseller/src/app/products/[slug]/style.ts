import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ProductsInnerPage = styled.div`
  padding-top: 96px;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .topContainer {
      display: flex;
      width: 100%;

      h3 {
        cursor: pointer;
      }
    }

    .cardsContainer {
      display: flex;
      flex-wrap: wrap;
      min-width: 100%;
      max-width: 628px;
      justify-content: space-between;
      padding: 0 14px;
      margin-top: 24px;

      .cardEnviroment {
        height: auto;
        flex: 0 1 calc(20% - 16px);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 24px;
      }
    }

    .bannerImages {
      margin-top: 16px;
      width: 100%;
      border-radius: 8px;
      background-color: ${Theme.colors.maindark};
      padding: 24px;
      gap: 24px;
      display: flex;

      .leftContainer {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .rightContainer {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .descriptions {
      width: 100%;
      height: 320px;
      margin-top: 32px;
      padding: 24px;
      gap: 24px;
      display: flex;

      .leftContainer {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }

      .rightContainer {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }

      .pen {
        position: absolute;
        right: 0;
        top: 0;
      }

      textarea {
        font-family: "Montserrat", "Open Sans", sans-serif;
        resize: none;
        border: none;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        margin-top: 16px;
        padding: 16px;
        font-size: 16px;

        &:focus {
          outline: none;
        }

        &::-webkit-scrollbar {
          width: 0px;
          height: 0px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        scrollbar-width: thin;
        scrollbar-color: transparent transparent;

        -ms-overflow-style: none;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .cardsContainer {
      padding: 0;
    }
  }
  @media (max-width: 767px) {
    .cardsContainer {
      padding: 0;
      .cardEnviroment {
        flex: 0 1 calc(50% - 10px);
      }
    }
  }
`;
