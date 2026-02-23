import styled from "styled-components";

interface CouponCardProps {
  selected?: boolean;
}

export const CouponCardContainer = styled.article<CouponCardProps>`
  width: 100%;
  min-height: 65px;
  background-color: ${({ theme }) => theme.background_01}20;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.border_01};
  /* border: 2px solid
    ${({ selected }) =>
    selected
      ? ({ theme }) => theme.mainColor
      : ({ theme }) => theme.border_01}; */
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
        background-color: ${({ theme }) => theme.mainColor};
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
