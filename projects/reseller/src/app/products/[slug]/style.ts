import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ProductsInnerPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .mainContentComponent {
    width: 100%;
    max-width: 900px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .headerSection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      border: 1px solid ${Theme.colors.secondaryAction}80;

      .titleSection {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      h3 {
        cursor: pointer;
        color: ${Theme.colors.refused};
      }
    }

    .packagesSection {
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      border: 1px solid ${Theme.colors.secondaryAction}80;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;

      .cardsContainer {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 16px;
        box-sizing: border-box;
        padding: 0;

        .cardEnviroment {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease;

          .addPackageCard {
            width: 100%;
            max-width: 174px;
            border-radius: 8px;
            background-color: ${Theme.colors.secondaryAction}20;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 16px;
            padding: 26px 0px;
            border: 1px solid ${Theme.colors.secondaryAction};

            svg {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }

    .productEditor {
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      border: 1px solid ${Theme.colors.secondaryAction}80;
      padding: 24px;
      gap: 24px;
      display: flex;
      flex-direction: column;

      .bannerImages {
        display: flex;
        gap: 24px;
      }

      .leftContainer {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 100%;
          height: auto;
          aspect-ratio: 21/9;
          object-fit: fill;
          border-radius: 8px;
        }
      }

      .rightContainer {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .cardImageBox {
          width: 100%;
          max-width: 178px;
          aspect-ratio: 1 / 1;
          position: relative;
        }

        .cardImageBox img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          border-radius: 8px;
        }
      }
    }

    .descriptions {
      width: 100%;
      height: 320px;
      padding: 0 24px 0 24px;
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
        cursor: pointer;
      }

      textarea {
        font-family: "Montserrat", "Open Sans", sans-serif;
        resize: none;
        border: 2px solid ${Theme.colors.secondaryAction};
        background: ${Theme.colors.mainlight};
        color: ${Theme.colors.secondaryAction};
        width: 100%;
        height: 100%;
        border-radius: 8px;
        margin-top: 16px;
        padding: 16px;
        font-size: 16px;

        &:focus {
          outline: none;
          border-color: ${Theme.colors.mainHighlight};
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

    .saveButtonContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      gap: 16px;
    }
  }

  /* Tablet grande: 768px - 1400px */
  @media (min-width: 768px) and (max-width: 1400px) {
    .mainContentComponent {
      .packagesSection {
        .cardsContainer {
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 0;

          .cardEnviroment {
            min-width: 0;
            max-width: 100%;
          }
        }
      }
    }
  }

  /* Tablet pequeno e Mobile: até 767px */
  @media (max-width: 767px) {
    padding-top: 64px;
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
      width: 100%;
    }

    .mobileHeader {
      position: fixed;
      top: 0;
      z-index: 10;
      margin-top: 12px;
      width: auto;
      height: 0;
    }

    .mainContentComponent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        gap: 16px;
        text-align: center;
        padding: 20px;
        margin-bottom: 20px;
      }

      .packagesSection {
        padding: 20px;
        margin-bottom: 20px;

        .cardsContainer {
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 0;

          .cardEnviroment {
            min-width: 0;
            max-width: 100%;

            .addPackageCard {
              padding: 32px 0px;
              gap: 12px;

              svg {
                width: 40px;
                height: 40px;
              }

              p,
              span,
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                font-size: 12px !important;
              }
            }
          }
        }
      }
    }
  }

  /* Tablet pequeno: 540px - 767px */
  @media (min-width: 540px) and (max-width: 767px) {
    .mainContentComponent {
      .packagesSection {
        .cardsContainer {
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 0;

          .cardEnviroment {
            min-width: 0;
            max-width: 100%;
          }
        }
      }
    }
  }

  /* Mobile: até 539px */
  @media (max-width: 539px) {
    .mainContentComponent {
      padding: 0px;
      gap: 20px;

      .headerSection {
        padding: 16px;
        margin-bottom: 16px;
        gap: 12px;
      }

      .packagesSection {
        padding: 16px;
        margin-bottom: 16px;

        .cardsContainer {
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 0;

          .cardEnviroment {
            min-width: 0;
            max-width: 100%;

            .addPackageCard {
              padding: 22px 8px;
              gap: 10px;

              svg {
                width: 35px;
                height: 35px;
              }

              p,
              span,
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                font-size: 11px !important;
              }
            }
          }
        }
      }

      .productEditor {
        padding: 14px 0px;
        margin-bottom: 16px;
        gap: 32px;
      }

      .bannerImages {
        flex-direction: column;
        gap: 40px;
        padding: 0 20px;

        .leftContainer {
          width: 100%;
          height: auto;

          img {
            width: 100%;
            height: auto;
            aspect-ratio: 21/9;
            object-fit: fill;
          }
        }

        .rightContainer {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;

          .cardImageBox {
            width: 100%;
            max-width: 178px;
            aspect-ratio: 1 / 1;
            position: relative;
          }

          .cardImageBox img {
            width: 100%;
            height: 100%;
            object-fit: fill;
            border-radius: 8px;
          }
        }
      }

      .descriptions {
        padding: 0 16px;
        margin-bottom: 16px;
        height: 760px;
        gap: 32px;

        .leftContainer {
          min-height: 300px;
        }

        .rightContainer {
          min-height: 300px;
        }
      }
    }
  }

  /* Mobile pequeno: até 427px */
  @media (max-width: 427px) {
    .mainContentComponent {
      padding: 0;
      gap: 16px;

      .headerSection {
        padding: 14px;
        margin-bottom: 14px;
        gap: 10px;
      }

      .packagesSection {
        padding: 14px;
        margin-bottom: 14px;

        .cardsContainer {
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding: 0;

          .cardEnviroment {
            min-width: 0;
            max-width: 100%;

            .addPackageCard {
              padding: 26px 0px;
              gap: 8px;

              svg {
                width: 30px;
                height: 30px;
              }

              p,
              span,
              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                font-size: 10px !important;
              }
            }
          }
        }
      }

      .productEditor {
        padding: 14px 0px;
        margin-bottom: 14px;
        gap: 24px;
      }

      .descriptions {
        padding: 0 16px;
        margin-bottom: 14px;
        height: 800px;
        gap: 24px;

        .leftContainer {
          min-height: 320px;
        }

        .rightContainer {
          min-height: 320px;
        }
      }
    }
  }
`;
