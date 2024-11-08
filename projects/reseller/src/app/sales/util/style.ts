import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SalesContainer = styled.div`
  padding-top: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32;
    width: 100%;
    padding: 0 48px 0 80px;
    margin-bottom: 24px;

    span {
      width: 100%;
    }

    .orderNumber {
      max-width: 112px;
    }

    .names {
      max-width: 220px;
    }

    .status {
      max-width: 140px;
    }
  }

  .cards {
    width: 100%;
  }
`;
