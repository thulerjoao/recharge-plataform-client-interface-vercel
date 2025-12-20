import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface CouponContainerProps {
  isOpen: boolean;
}

export const CouponContainer = styled.div<CouponContainerProps>`
  width: 100%;
  max-width: 628px;
  height: auto;
  margin-bottom: 16px;
  background-color: ${Theme.colors.mainlight};
  border-radius: 8px;
  border: 2px solid ${Theme.colors.secondaryAction};

  .couponClosedContent {
    width: 100%;
    border-radius: ${({ isOpen }) => (isOpen ? "8px 8px 0 0" : "8px")};
    height: ${({ isOpen }) => (isOpen ? "48px" : "46px")};
    border-bottom: ${({ isOpen }) =>
      !isOpen ? "none" : `2px solid ${Theme.colors.secondaryAction}`};
    background-color: ${Theme.colors.mainlight};
    display: flex;
    align-items: center;
    cursor: pointer;

    .iconContainer {
      display: flex;
      align-items: center;
      height: 100%;
      width: 35%;
      min-width: 140px;
      gap: 8px;
      padding: 0 8px;
      border-right: 2px dotted ${Theme.colors.secondaryAction};
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
    height: auto;
    max-height: 300px;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    background-color: ${Theme.colors.mainlight};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    transition:
      max-height 0.4s ease,
      opacity 0.4s ease,
      padding 0.4s ease;
    opacity: 0;
    padding: 0;

    &.open {
      max-height: 300px;
      opacity: 1;
    }

    .applyCoupon {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      gap: 8px;
      border-bottom: 1px dotted ${Theme.colors.secondaryAction};
    }

    .couponList {
      overflow-y: scroll;
      height: 252px;
      padding: 8px;
    }
  }

  &.isOpen {
    .couponClosedContent {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
    }
  }
`;
