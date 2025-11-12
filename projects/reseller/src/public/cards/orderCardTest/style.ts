import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface OrderCardTestProps {}

export const OrderCardTestContainer = styled.article<OrderCardTestProps>`
  width: 100%;
  height: 64px;
  background-color: ${Theme.colors.maindark};
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  .imageWrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 48px;
      width: 48px;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .contentWrapper {
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .infoRow {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 0.5fr auto;
    align-items: center;
    gap: 16px;
    width: 100%;

    .infoItem {
      min-width: 0;
      overflow: hidden;

      &.orderNumber {
        grid-column: 1;
        min-width: 100px;
      }

      &.clientName {
        grid-column: 2;
      }

      &.packageName {
        grid-column: 3;
        text-align: center;
      }

      &.paymentStatus {
        grid-column: 4;
        text-align: right;
        min-width: 100px;
      }

      &.rechargeStatus {
        grid-column: 5;
        text-align: right;
        min-width: 100px;
      }

      .infoValue {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
    }
  }

  .forwardIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .mobile {
    display: none;
  }

  .seeMore {
    display: none;
  }

  /* Tablet breakpoint */
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0 12px;
    gap: 12px;

    .infoRow {
      grid-template-columns: auto 1fr 1.2fr auto auto;
      gap: 12px;

      .infoItem {
        &.orderNumber {
          min-width: 90px;
        }

        &.paymentStatus,
        &.rechargeStatus {
          min-width: 90px;
        }
      }
    }

    .imageWrapper img {
      height: 44px;
      width: 44px;
    }
  }

  /* Mobile breakpoint */
  @media (max-width: 767px) {
    height: 148px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    padding: 12px 16px 48px 16px;
    gap: 0;

    .imageWrapper {
      display: none;
    }

    .contentWrapper {
      width: 100%;
    }

    .infoRow {
      display: none;
    }

    .infoList {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;

      .infoRowMobile {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-height: 18px;

        .label {
          font-weight: 600;
          flex-shrink: 0;
        }

        .value {
          flex: 1;
          text-align: right;
          margin-left: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .forwardIcon {
      display: none;
    }

    .mobile {
      display: block;
    }

    .seeMore {
      display: block;
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: auto;
    }
  }
`;
