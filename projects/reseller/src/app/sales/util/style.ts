import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SalesContainer = styled.div`
  padding-top: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    height: 68px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    background-color: ${Theme.colors.mainTransparent};

    .headerTitle {
      width: 161px;
    }

    .searchInput {
      width: 100%;
      max-width: 440px;
    }

    .filter {
      width: 161px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;

      span {
        cursor: pointer;
      }
    }
  }

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

  .pagination {
    display: flex;
    width: 100%;
    max-width: 270px;
    flex-direction: row;
    justify-content: center;
    margin-top: 28px;
    margin-bottom: 56px;

    p {
      margin: 0 16px;
      cursor: pointer;
    }

    .dots {
      cursor: default;
    }
  }
`;
