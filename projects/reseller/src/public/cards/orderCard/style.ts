import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface OrderCardProps {}

export const OrderCardContainer = styled.article<OrderCardProps>`
  height: 64px;
  background-color: ${Theme.colors.maindark};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;

  .mobile {
    display: none;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 8px;
  }

  .allInfoSection {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 0.5fr auto;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin: 0 16px;

    .orderNumber {
      grid-column: 1;
      min-width: 0;
    }

    .name {
      grid-column: 2;
      min-width: 0;
    }

    .desktop.name {
      grid-column: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 0;
    }

    .status {
      text-align: right;
      min-width: 0;
    }

    .status:first-of-type {
      grid-column: 4;
    }

    .status:last-of-type {
      grid-column: 5;
    }

    .infoValue {
      width: 100%;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .forwardIcon {
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .allInfoSection {
      grid-template-columns: 1.2fr 1fr 1fr 0.5fr auto;
      gap: 12px;
    }
  }
  @media (max-width: 767px) {
    height: 148px;
    align-items: flex-start;
    padding-top: 12px;
    position: relative;

    .desktop {
      display: none;
    }

    .mobile {
      display: flex;
    }

    .allInfo {
      flex-direction: column;

      span {
        min-width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 18px;
        margin-bottom: 8px;
      }

      p {
        text-align: end;
      }

      .orderNumber {
      }

      .orderNumber {
      }

      .name {
      }

      .status {
      }
    }
  }

  .seeMore {
    position: absolute;
    width: 100%;
    bottom: 12px;
    left: 0;
  }
`;
