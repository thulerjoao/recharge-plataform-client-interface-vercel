import styled from "styled-components";

export const PurchaseFiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.background_01};
  border-radius: 12px;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  border: 1px solid ${({ theme }) => theme.border_01}80;
  margin-bottom: 24px;

  .purchaseFilterInputs {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;

    .filterField {
      width: 31%;
      max-width: 250px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        display: block;
      }

      input {
        width: 100%;
        box-sizing: border-box;
      }
    }
  }

  .purchaseFilterButton {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    margin-bottom: 20px;

    .purchaseFilterInputs {
      align-items: stretch;
      flex-wrap: nowrap;
    }
  }
`;

export const CustomersFiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 20px;
  background: ${({ theme }) => theme.background_01};
  border-radius: 12px;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  border: 1px solid ${({ theme }) => theme.border_01}80;
  margin-bottom: 24px;

  .filtersSection {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.border_01}80;

    .searchSection {
      width: 300px;
      display: flex;
      align-items: center;
    }

    .filterControls {
      display: flex;
      gap: 16px;

      .filterSelect {
        padding: 0px 8px;
        height: 32px;
        width: 140px;
        border-radius: 8px;
        border: 2px solid ${({ theme }) => theme.border_01};
        background: ${({ theme }) => theme.text_01};
        color: ${({ theme }) => theme.border_01};
        font-size: 14px;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.mainColor};
        }
      }
    }
  }

  /* Purchase filters inside same card (no inner card style) */
  ${PurchaseFiltersWrapper} {
    background: transparent;
    box-shadow: none;
    border: none;
    border-radius: 0;
    margin-bottom: 0;
    padding: 0;
    border-top: none;
  }

  @media (max-width: 768px) {
    padding: 16px;

    .filtersSection {
      flex-direction: column;
      gap: 16px;
      padding: 0 0 16px 0;
      margin-bottom: 16px;

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
    padding: 14px;

    .filtersSection {
      padding: 0 0 14px 0;
      margin-bottom: 14px;
    }
  }
`;

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
    background: ${({ theme }) => theme.background_01};
    border-radius: 12px;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    border: 1px solid ${({ theme }) => theme.border_01}80;

    .titleSection {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
  }

  @media (max-width: 539px) {
    .centerContainer {
      padding: 0;
    }

    .headerSection {
      padding: 16px;
      margin-bottom: 16px;
    }
  }
`;
