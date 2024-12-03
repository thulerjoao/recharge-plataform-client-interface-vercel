import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SettingsPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 56px;

  .buttons {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 32px;
    margin-top: 24px;

    .buttonEnviroment {
      width: 183px;
    }
  }

  .topContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    margin-top: 32px;
    background-color: ${Theme.colors.maindark};
    width: 100%;
    border-radius: 8px;

    .socialList {
      margin-top: 24px;
      margin-bottom: 32px;
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      justify-content: center;

      .cardsEnviroment {
        width: 100%;
        max-width: 304px;
      }
    }
  }

  .secondContainer,
  .thirdContainer,
  .bottomContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    background-color: ${Theme.colors.maindark};
    width: 100%;
    border-radius: 8px;
    margin-top: 32px;

    .mainBannerImage {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 16px;

      img {
        max-width: 100%;
        height: auto;
      }
    }
  }

  .bottomContainer {
    .mainBannerImage {
      margin-top: 40px;
      margin-bottom: 24px;
    }
  }

  @media (min-width: 540px) and (max-width: 1024px) {
    .topContainer {
      .socialList {
        flex-direction: column;
        width: 100%;
        .cardsEnviroment {
          max-width: 100%;
        }
      }
    }
  }
  @media (max-width: 539px) {
    .buttons {
      flex-direction: column;
      gap: 16px;

      .buttonEnviroment {
        width: 100%;
      }
    }

    .topContainer {
      margin-top: 24px;
      padding: 24px 16px;
      .socialList {
        flex-direction: column;
        width: 100%;

        .cardsEnviroment {
          max-width: 100%;
        }
      }
    }

    .secondContainer,
    .thirdContainer,
    .bottomContainer {
      padding: 24px 16px;
    }
  }
`;
