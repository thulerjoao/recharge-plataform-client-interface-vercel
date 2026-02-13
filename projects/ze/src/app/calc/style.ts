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
    background-color: ${({ theme }) => theme.background_01};
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    border: 1px solid ${({ theme }) => theme.border_01}80;
    box-sizing: border-box;
    margin-bottom: 32px;

    .inputSection {
      width: 100%;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid ${({ theme }) => theme.border_01};
    }

    .basePriceInfo {
      width: 100%;
      padding: 12px 16px;
      background-color: ${({ theme }) => theme.background_02};
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.background_03};
      margin-bottom: 24px;
    }

    .resultsSection {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .currentTier,
      .nextTier {
        padding: 12px;
        background-color: ${({ theme }) => theme.background_02};
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.background_03};
      }

      .calculationDetails {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        background-color: ${({ theme }) => theme.background_02};
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.background_03};

        .detailRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;

          &.highlight {
            padding-top: 12px;
            border-top: 1px solid ${({ theme }) => theme.background_03};
            margin-top: 4px;
          }
        }
      }

      .recommendation {
        padding: 16px;
        border-radius: 8px;
        border: 2px solid;

        &.worthIt {
          background-color: ${({ theme }) => theme.approved}20;
          border-color: ${({ theme }) => theme.approved};
        }

        &.notWorthIt {
          background-color: ${({ theme }) => theme.refused}20;
          border-color: ${({ theme }) => theme.refused};
        }
      }

      .alertBanner {
        width: 100%;
        padding: 16px 20px;
        background-color: ${({ theme }) => theme.pending}20;
        border: 2px solid ${({ theme }) => theme.pending};
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-sizing: border-box;

        .alertIcon {
          flex-shrink: 0;
          font-size: 20px;
          color: ${({ theme }) => theme.pending};
        }

        .alertText {
          flex: 1;
          line-height: 1.5;
        }
      }

      .maxTier {
        padding: 16px;
        background-color: ${({ theme }) => theme.background_02};
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.background_03};
      }
    }

    .errorMessage {
      padding: 16px;
      background-color: ${({ theme }) => theme.pending}20;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.pending};
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
      -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      border: 1px solid ${({ theme }) => theme.border_01}80;
      box-sizing: border-box;
      border-radius: 8px;

      table {
        width: 100%;
        border-collapse: collapse;
        background-color: ${({ theme }) => theme.background_01};
        border-radius: 8px;
        overflow: hidden;

        thead {
          background-color: ${({ theme }) => theme.background_02};

          th {
            padding: 12px 16px;
            text-align: left;
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.text_01};
            border-bottom: 2px solid ${({ theme }) => theme.border_01}80;
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid ${({ theme }) => theme.border_01}30;

            &:last-child {
              border-bottom: none;
            }

            &:hover {
              background-color: ${({ theme }) => theme.background_02};
            }

            td {
              padding: 12px 16px;
              font-size: 14px;
              color: ${({ theme }) => theme.text_03};
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

      .resultsSection {
        .alertBanner {
          padding: 12px 16px;

          .alertIcon {
            font-size: 18px;
          }
        }
      }
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
