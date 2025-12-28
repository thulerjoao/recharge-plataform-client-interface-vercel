import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface CouponCardProps {
  selected?: boolean;
}

export const CouponCardContainer = styled.article<CouponCardProps>`
  width: 100%;
  min-height: 65px;
  background-color: ${Theme.colors.maindark}20;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 2px solid ${Theme.colors.secondaryAction};
  /* border: 2px solid 
    ${({ selected }) =>
    selected ? Theme.colors.mainHighlight : Theme.colors.secondaryAction}; */
  cursor: pointer;
  transition: all 0.2s ease;

  .couponInfo {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;

    .couponHeader {
      display: flex;
      align-items: center;
      gap: 8px;

      .firstPurchaseBadge {
        background-color: ${Theme.colors.mainHighlight};
        padding: 2px 8px;
        border-radius: 4px;
      }
    }

    .discountInfo {
      display: flex;
      align-items: center;
    }
  }

  .couponValues {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    margin-left: 16px;
  }
`;
