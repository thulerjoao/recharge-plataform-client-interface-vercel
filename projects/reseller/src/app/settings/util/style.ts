import styled from "styled-components";

export const SettingsPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .mainContentContainer {
    width: 100%;
    max-width: 900px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  @media (max-width: 768px) {
    padding-top: 48px;

    .desktop {
      display: none;
    }

    .mobile {
      display: flex;
      width: 100%;
    }

    .mainContentContainer {
      padding: 16px;
    }
  }
  @media (max-width: 539px) {
    padding-top: 62px;

    .mainContentContainer {
      padding: 0px;
    }
  }
`;
