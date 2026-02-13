import styled from "styled-components";

interface CouponContainerProps {
  openCoupon: boolean;
}

export const CouponContainer = styled.div<CouponContainerProps>`
  width: 100%;
  max-width: 628px;
  height: auto;
  margin-bottom: 18px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.border_01};
  background-color: ${({ theme }) => theme.text_01};
  position: relative;

  .couponClosedContent {
    width: 100%;
    border-radius: ${({ openCoupon }) => (openCoupon ? "8px 8px 0 0" : "8px")};
    border-bottom: ${({ openCoupon, theme }) =>
      openCoupon && `2px solid ${theme.border_01}`};
    height: 44px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    .iconContainer {
      display: flex;
      align-items: center;
      height: 100%;
      width: 35%;
      min-width: 140px;
      gap: 8px;
      padding: 0 8px;
      border-right: 2px dotted ${({ theme }) => theme.border_01};
    }

    .couponText {
      padding: 0 8px;
      width: 65%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .couponOpenContent {
    width: 100%;
    max-height: 0;
    overflow: hidden;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: ${({ theme }) => theme.border_01}30;
    transition:
      max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s ease-out,
      padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    padding: 0;
    will-change: max-height, opacity, padding;

    &.open {
      max-height: 120px;
      opacity: 1;
      padding: 8px;
    }

    .applyCoupon {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
  }

  .couponErrorMessage {
    width: 100%;
    position: absolute;
    bottom: -1px;
  }

  .couponSuccessMessage {
    width: 100%;
    position: absolute;
    top: -60px;
  }
`;
