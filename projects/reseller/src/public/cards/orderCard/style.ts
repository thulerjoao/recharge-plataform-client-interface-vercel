import styled from "styled-components";

interface OrderCardProps {}

export const OrderCardContainer = styled.article<OrderCardProps>`
  min-height: 72px;
  background-color: ${({ theme }) => theme.background_01};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  border: 1px solid ${({ theme }) => theme.border_01}80;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  .mobile {
    display: none;
  }

  img {
    height: 58px;
    width: 58px;
    border-radius: 8px;
  }

  .allInfoSection {
    display: grid;
    grid-template-columns: 1.2fr 1.5fr 0.5fr auto;
    grid-template-rows: auto auto;
    align-items: center;
    gap: 16px 16px;
    width: 100%;
    margin: 0 0 0 16px;

    .orderNumber {
      grid-column: 1;
      grid-row: 1;
      min-width: 0;
    }

    .name {
      grid-column: 2;
      grid-row: 1;
      min-width: 0;
    }

    .status {
      text-align: right;
      min-width: 0;
    }

    .status:first-of-type {
      grid-column: 4;
      grid-row: 1;
    }

    .status:last-of-type {
      grid-column: 4;
      grid-row: 1;
      justify-self: end;
    }

    .diamonds.desktop {
      grid-column: 1;
      grid-row: 2;
      min-width: 0;
    }

    .price.desktop {
      grid-column: 2;
      grid-row: 2;
      min-width: 0;
    }

    .paymentStatus {
      display: none;
    }

    .infoValue {
      width: 100%;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .allInfoSection {
      gap: 12px;
    }
  }
  @media (max-width: 767px) {
    height: auto;
    min-height: 148px;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 12px 10px;
    padding-bottom: 4px;

    .desktop {
      display: none;
    }

    .mobile {
      display: flex;
    }

    .allInfoSection {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 100%;
      gap: 4px;
      margin: 0 16px 0 16px;

      span {
        width: 100%;
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

      .paymentStatus {
        display: flex;
      }

      .diamonds.mobile,
      .price.mobile {
        display: flex;
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
