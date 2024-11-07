import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface OrderCardProps {}

export const OrderCardContainer = styled.article<OrderCardProps>`
  height: 64px;
  background-color: ${Theme.colors.maindark};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;

  img {
    height: 48px;
    width: 48px;
    border-radius: 8px;
  }

  .allInfo {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: 0 16px;

    span {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .orderNumber {
      max-width: 112px;
    }

    .name {
      max-width: 220px;
    }

    .status {
      max-width: 140px;
    }
  }

  .forwardIcon {
  }
`;
