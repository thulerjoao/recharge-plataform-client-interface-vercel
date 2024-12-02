import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SettingsPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;

  .buttons {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 32px;
    margin-top: 24px;
  }

  .topContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
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

  .secondContainer {
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
    }
  }

  @media (min-width: 540px) and (max-width: 1024px) {
  }
  @media (max-width: 539px) {
  }
`;
