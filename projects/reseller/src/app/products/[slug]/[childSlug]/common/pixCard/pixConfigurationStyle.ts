import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const PixConfigurationContainer = styled.div`
  .pixConfiguration {
    padding: 16px;
    background: ${Theme.colors.mainBbackgroundSolid};
    border-radius: 8px;
    border: 1px solid ${Theme.colors.secondaryTextAction}20;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .pixHeader {
      display: flex;
      align-items: center;
      gap: 8px;

      .pixIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${Theme.colors.approved}20;
        border-radius: 6px;
        padding: 4px;

        svg {
          height: 32px;
          object-fit: contain;
        }
      }
    }

    .pixSummary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;

      .summaryItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        flex: 1;

        &.highlight {
          background: ${Theme.colors.mainHighlight}10;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid ${Theme.colors.mainHighlight}30;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .pixConfiguration {
      padding: 12px;

      .pixSummary {
        flex-direction: column;
        gap: 8px;
        align-items: stretch;

        .summaryItem {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background: ${Theme.colors.maindark};
          border-radius: 6px;

          &.highlight {
            background: ${Theme.colors.mainHighlight}10;
            border: 1px solid ${Theme.colors.mainHighlight}30;
          }
        }
      }
    }
  }

  @media (max-width: 539px) {
    .pixConfiguration {
      padding: 10px;

      .pixSummary {
        gap: 6px;

        .summaryItem {
          padding: 8px;
          flex-direction: column;
          text-align: center;
          gap: 2px;

          &.highlight {
            padding: 10px;
          }
        }
      }
    }
  }

  @media (max-width: 400px) {
    .pixConfiguration {
      padding: 8px;

      .pixHeader {
        gap: 6px;

        .pixIcon {
          padding: 2px;
        }
      }

      .pixSummary {
        gap: 4px;

        .summaryItem {
          padding: 6px;
          gap: 1px;

          &.highlight {
            padding: 8px;
          }
        }
      }
    }
  }
`;
