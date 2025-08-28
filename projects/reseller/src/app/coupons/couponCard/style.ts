import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const CouponCardContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 0.5fr;
  padding: 16px 20px;
  gap: 16px;
  border-bottom: 1px solid ${Theme.colors.secondaryTextAction}20;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${Theme.colors.secondaryTextAction}10;
  }

  &:last-child {
    border-bottom: none;
  }

  .tableCell {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .couponTitle {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;

      p {
        width: auto;
      }

      .firstPurchaseBadge {
        background: ${Theme.colors.mainHighlight};
        color: ${Theme.colors.maindark};
        width: 20px;
        height: 20px;
        border-radius: 5px;
        font-size: 13px;
        padding-left: 3px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .statusBadge {
      padding: 2px 0px;
      min-width: 90px;
      border-radius: 12px;
      display: inline-block;
      text-align: center;
      width: fit-content;

      &.active {
        background: ${Theme.colors.approved}20;
        border: 1px solid ${Theme.colors.approved};
      }

      &.inactive {
        background: ${Theme.colors.refused}20;
        border: 1px solid ${Theme.colors.refused};
      }
    }
  }

  @media (max-width: 539px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;

    .tableCell {
      text-align: center;
    }
  }
`;
