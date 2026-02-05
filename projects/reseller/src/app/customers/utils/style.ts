import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CustomersPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .centerContainer {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
  }

  .headerSection {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    margin-bottom: 24px;
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
  }

  .filtersSection {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: ${Theme.colors.maindark};
    border-radius: 12px;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    border: 1px solid ${Theme.colors.secondaryAction}80;
    margin-bottom: 24px;

    .searchSection {
      width: 300px;
      display: flex;
      align-items: center;
      position: relative;

      .searchButton {
        width: 28px;
        height: 28px;
        background-color: ${Theme.colors.mainlight};
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 8px;
        cursor: pointer;
        position: absolute;
        right: 2px;

        svg {
          width: 24px;
          height: 24px;
        }
      }
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

  .cardsSection {
    width: 100%;
    margin-bottom: 24px;
  }

  .cardsList {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .customerCardWrapper {
    width: 100%;
    cursor: pointer;
  }

  .emptyState {
    width: 100%;
    padding: 48px 0;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding-top: 64px;

    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
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

    .centerContainer {
      padding: 0 16px;
    }

    .headerSection {
      flex-direction: column;
      gap: 16px;
      text-align: center;
      padding: 20px;
      margin-bottom: 20px;
    }

    .filtersSection {
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      margin-bottom: 20px;

      .searchSection {
        width: 100%;
      }

      .filterControls {
        width: 100%;
        justify-content: center;

        .filterSelect {
          width: 100%;
          max-width: none;
        }
      }
    }
  }

  @media (max-width: 539px) {
    .centerContainer {
      padding: 0;
    }

    .headerSection {
      padding: 16px;
      margin-bottom: 16px;
    }

    .filtersSection {
      padding: 14px;
      margin-bottom: 16px;
    }
  }
`;
