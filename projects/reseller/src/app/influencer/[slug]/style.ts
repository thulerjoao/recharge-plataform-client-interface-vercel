import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const InfluencerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .influencersContainer {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px;

    .headerSection {
      background-color: pink;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      margin-bottom: 24px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .titleSection {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }

    .filtersSection {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: ${Theme.colors.maindark};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      margin-bottom: 24px;

      .searchSection {
        width: 300px;
      }

      .filterControls {
        display: flex;
        gap: 16px;

        .filterSelect {
          padding: 0px 8px;
          height: 32px;
          width: 140px;
          border-radius: 8px;
          border: 2px solid ${Theme.colors.secondaryAction};
          background: ${Theme.colors.mainlight};
          color: ${Theme.colors.secondaryAction};
          font-size: 14px;
          cursor: pointer;

          &:focus {
            outline: none;
            border-color: ${Theme.colors.mainHighlight};
          }
        }
      }
    }

    .influencerCardWrapper {
      width: 100%;
    }

    .emptyState {
      width: 100%;
      padding: 48px 0;
      text-align: center;
    }
  }

  .modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modalContent {
    background: ${Theme.colors.maindark};
    border-radius: 12px;
    padding: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  }

  @media (max-width: 539px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }

    .mainTitle {
      margin-top: 24px;
      margin-bottom: 16px;
    }

    .addButtonContainer {
      margin-bottom: 24px;
    }

    .influencersContainer {
      padding: 0 16px;
      gap: 12px;

      .headerSection {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .filtersSection {
        flex-direction: column;
        gap: 16px;

        .filterControls {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
`;
