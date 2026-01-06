import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CalculatorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px;
  min-height: calc(100vh - 48px - 300px);

  .header {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
  }

  .calculatorCard {
    width: 100%;
    max-width: 900px;
    background-color: ${Theme.colors.maindark};
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    margin-bottom: 32px;

    .inputSection {
      width: 100%;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid ${Theme.colors.secondaryAction};
    }

    .resultsSection {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .currentTier,
      .nextTier {
        padding: 12px;
        background-color: ${Theme.colors.mainBbackgroundSolid};
        border-radius: 8px;
        border: 1px solid ${Theme.colors.mainTransparent};
      }

      .calculationDetails {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        background-color: ${Theme.colors.mainBbackgroundSolid};
        border-radius: 8px;
        border: 1px solid ${Theme.colors.mainTransparent};

        .detailRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;

          &.highlight {
            padding-top: 12px;
            border-top: 1px solid ${Theme.colors.mainTransparent};
            margin-top: 4px;
          }
        }
      }

      .recommendation {
        padding: 16px;
        border-radius: 8px;
        border: 2px solid;

        &.worthIt {
          background-color: ${Theme.colors.approved}20;
          border-color: ${Theme.colors.approved};
        }

        &.notWorthIt {
          background-color: ${Theme.colors.pending}20;
          border-color: ${Theme.colors.pending};
        }
      }

      .maxTier {
        padding: 16px;
        background-color: ${Theme.colors.mainBbackgroundSolid};
        border-radius: 8px;
        border: 1px solid ${Theme.colors.mainTransparent};
      }
    }

    .errorMessage {
      padding: 16px;
      background-color: ${Theme.colors.pending}20;
      border-radius: 8px;
      border: 1px solid ${Theme.colors.pending};
    }
  }

  .infoSection {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tableContainer {
      width: 100%;
      overflow-x: auto;
      margin-top: 16px;

      table {
        width: 100%;
        border-collapse: collapse;
        background-color: ${Theme.colors.maindark};
        border-radius: 8px;
        overflow: hidden;
        -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
        -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
        box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);

        thead {
          background-color: ${Theme.colors.mainBbackgroundSolid};

          th {
            padding: 12px 16px;
            text-align: left;
            font-size: 14px;
            font-weight: 600;
            color: ${Theme.colors.mainlight};
            border-bottom: 2px solid ${Theme.colors.mainTransparent};
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid ${Theme.colors.mainTransparent};

            &:last-child {
              border-bottom: none;
            }

            &:hover {
              background-color: ${Theme.colors.mainBbackgroundSolid};
            }

            td {
              padding: 12px 16px;
              font-size: 14px;
              color: ${Theme.colors.secondaryText};
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 24px 72px;

    .header {
      max-width: 800px;
    }

    .calculatorCard {
      max-width: 800px;
    }

    .infoSection {
      max-width: 800px;
    }
  }

  @media (max-width: 767px) {
    padding: 16px;

    .header {
      margin-bottom: 24px;

      h1 {
        font-size: 24px;
      }
    }

    .calculatorCard {
      padding: 16px;
    }

    .infoSection {
      .tableContainer {
        table {
          font-size: 12px;

          thead th,
          tbody td {
            padding: 8px 12px;
          }
        }
      }
    }
  }
`;
