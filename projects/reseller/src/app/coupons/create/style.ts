import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CreateCouponContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;

  .mobile {
    display: none;
  }

  .mainContent {
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
      -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

      .titleSection {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .statusSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
    }

    .infoSections {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .infoSection {
        padding: 24px;
        background: ${Theme.colors.maindark};
        border-radius: 12px;
        -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
        -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
        box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

        .infoGrid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;

          .infoItem {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .influencerSelect,
            .discountTypeSelect {
              box-sizing: border-box;
              padding: 0px 16px;
              width: 100%;
              font-size: 16px;
              height: 28px;
              border-radius: 8px;
              border: 2px solid ${Theme.colors.secondaryAction};
              color: ${Theme.colors.secondaryAction};
              background: ${Theme.colors.mainlight};
              cursor: pointer;

              &:focus {
                outline: none;
                box-shadow: 0px 0px 7px 0px ${Theme.colors.mainHighlight};
                border: 2px solid ${Theme.colors.mainHighlight};
              }

              option {
                background: ${Theme.colors.mainlight};
                color: ${Theme.colors.secondaryAction};
                padding: 8px;
                border: none;
              }
            }

            .checkboxSection {
              display: flex;
              align-items: center;
              gap: 12px;

              .checkbox {
                width: 18px;
                height: 18px;
                accent-color: ${Theme.colors.mainHighlight};
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .actionsSection {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  }

  @media (max-width: 539px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }

    .mainContent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        gap: 16px;
        text-align: center;

        .statusSection {
          align-items: center;
        }
      }

      .infoSections {
        .infoSection {
          .infoGrid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      }

      .actionsSection {
        flex-direction: column;
        gap: 12px;
      }
    }
  }
`;
