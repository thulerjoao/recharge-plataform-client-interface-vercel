import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ProductsInnerPage = styled.div`
  padding-top: 96px;

  .tablet,
  .mobile {
    display: none;
  }
  .desktop {
    display: flex;
  }

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
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 24px;
      padding: 0 14px;

      .cardEnviroment {
        height: auto;
        flex: 0 1 calc(20% - 16px);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 174px;
        margin: 0 8px;
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

        img {
          max-width: 100%;
          height: auto;
        }
      }

      .rightContainer {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          max-width: 178px;
          height: auto;
        }
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

        img {
          width: 100%;
          max-width: 178px;
          height: auto;
        }
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

  @media (min-width: 768px) and (max-width: 1025px) {
    .desktop,
    .mobile {
      display: none;
    }
    .tablet {
      display: flex;
    }

    main {
      .cardsContainer {
        padding: 0;
        align-items: center;
        justify-content: center;

        .cardEnviroment {
          flex: 0 1 calc(33.33% - 16px);
        }
      }

      .bannerImages {
        flex-direction: column;
        gap: 40px;

        .leftContainer {
          width: 100%;
          height: auto;
        }

        .rightContainer {
          width: 100%;
          height: auto;
        }
      }

      .descriptions {
        flex-direction: column;
        height: 680px;
        gap: 40px;

        .leftContainer {
          width: 100%;
          min-height: 260px;
        }

        .rightContainer {
          width: 100%;
          min-height: 260px;
        }
      }
    }
  }
  @media (max-width: 767px) {
    padding-top: 64px;

    .tablet,
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
    }

    main {
      .topContainer {
        margin-top: 24px;
      }
      .cardsContainer {
        padding: 0;
        justify-content: space-between;

        .cardEnviroment {
          flex: 0 1 calc(50% - 10px);
          margin: 0;
          margin-bottom: 24px;
          min-width: 150px;
        }
      }

      .bannerImages {
        flex-direction: column;
        padding: 24px 16px;
        gap: 40px;

        .leftContainer {
          width: 100%;
          height: auto;

          img {
            width: 100%;
            height: auto;
          }
        }

        .rightContainer {
          width: 100%;
          height: auto;
        }
      }

      .descriptions {
        flex-direction: column;
        height: 760px;
        gap: 40px;

        .leftContainer {
          width: 100%;
          min-height: 300px;
        }

        .rightContainer {
          width: 100%;
          min-height: 300px;
        }
      }
    }
  }
`;
