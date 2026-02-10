import styled from "styled-components";

interface OrderManualCardProps {}

export const OrderManualCardContainer = styled.article<OrderManualCardProps>`
  height: 64px;
  background-color: ${({ theme }) => theme.background_01};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
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

  @media (min-width: 768px) and (max-width: 1024px) {
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
    left: 0;
    width: 100%;
    bottom: 12px;
  }
`;
