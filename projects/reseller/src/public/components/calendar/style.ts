import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  button {
    all: unset;
    cursor: pointer;
  }
`;

export const CalendarContainer = styled.div`
  background-color: ${Theme.colors.mainlight};
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  color: ${Theme.colors.mainlight};
  background-color: ${Theme.colors.mainTransparent};
  border: 1px solid ${Theme.colors.secondaryText};

  .rdp-months {
    width: 100%;

    .rdp-nav {
      display: flex;
      height: 0;
      align-items: end;
      justify-content: flex-end;

      button {
        margin-bottom: -22px;

        svg {
          fill: ${Theme.colors.mainlight} !important;
        }
      }
    }
    .rdp-month {
      width: 100%;

      table {
        width: 100%;
        margin-top: 12px;

        thead {
          th {
            height: 32px;
          }
        }

        tbody {
          td {
            text-align: center;
            height: 32px;

            button {
              height: 24px;
              width: 24px;
              border-radius: 12px;
            }
          }
          .rdp-today {
            color: ${Theme.colors.pending};
          }

          .rdp-range_end,
          .rdp-range_start,
          .rdp-selected {
            background-color: transparent;

            button {
              height: 24px;
              width: 24px;
              border-radius: 12px;
              background-color: ${Theme.colors.mainHighlight};
              color: ${Theme.colors.maindark};
            }
          }
        }
      }
    }
  }
`;
