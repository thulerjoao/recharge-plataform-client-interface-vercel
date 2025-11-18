import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const PeriodSelectorContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  .periodSelect {
    padding: 0px 12px;
    height: 36px;
    min-width: 140px;
    border-radius: 8px;
    border: 2px solid ${Theme.colors.secondaryAction};
    background: ${Theme.colors.mainlight};
    color: ${Theme.colors.secondaryAction};
    font-size: 14px;
    cursor: pointer;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${Theme.colors.mainHighlight};
      box-shadow: 0px 0px 7px 0px ${Theme.colors.mainHighlight};
    }

    option {
      background: ${Theme.colors.mainlight};
      color: ${Theme.colors.secondaryAction};
      padding: 8px;
      border: none;
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;

    .periodSelect {
      width: 100%;
      min-width: auto;
    }
  }
`;

