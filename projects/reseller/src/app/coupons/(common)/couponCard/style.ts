import styled from "styled-components";

export const CouponCardContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.2fr 1fr;
  padding: 16px 20px;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.text_04}50;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 65px;

  .actionCell {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;

    button {
      cursor: pointer;
    }
  }

  &:hover {
    background: ${({ theme }) => theme.text_04}10;
  }

  &:last-child {
    border-bottom: none;
  }

  .tableCell {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .firstPurchaseBadge {
      background: ${({ theme }) => theme.mainColor};
      color: ${({ theme }) => theme.background_01};
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      align-self: flex-start;
      margin-bottom: 4px;
    }

    .couponTitle {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;

      p {
        width: auto;
      }
    }

    .mobileInfo {
      display: none;
    }

    .statusBadge {
      padding: 1px 6px;
      min-width: 70px;
      border-radius: 8px;
      display: inline-block;
      text-align: center;
      width: fit-content;
      height: 20px;
      line-height: 18px;

      &.active {
        background: ${({ theme }) => theme.approved}20;
        border: 1px solid ${({ theme }) => theme.approved};
      }

      &.inactive {
        background: ${({ theme }) => theme.refused}20;
        border: 1px solid ${({ theme }) => theme.refused};
      }
    }
  }

  /* Breakpoint para telas médias (1200px e menores) */
  @media (max-width: 1200px) {
    grid-template-columns: 2fr 2fr 1fr 1.2fr;
    gap: 12px;
    padding: 14px 16px;

    .tableCell {
      .firstPurchaseBadge {
        font-size: 9px;
        padding: 2px 6px;
      }

      .statusBadge {
        min-width: 65px;
        font-size: 12px;
        height: 18px;
        line-height: 16px;
        padding: 1px 5px;
      }
    }
  }

  /* Breakpoint para tablets (768px e menores) */
  @media (max-width: 768px) {
    grid-template-columns: 2fr 2fr 1fr 1.2fr;
    gap: 10px;
    padding: 12px 16px;

    /* Mantém a coluna de status em tablets */
    .tableCell:last-child {
      display: flex;
    }

    .tableCell {
      .firstPurchaseBadge {
        font-size: 9px;
        padding: 2px 6px;
      }

      .statusBadge {
        min-width: 60px;
        font-size: 11px;
        height: 16px;
        line-height: 14px;
        padding: 1px 4px;
      }
    }
  }

  /* Breakpoint para mobile grande (539px e menores) */
  @media (max-width: 539px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px 16px;
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: column;

    .actionCell {
      order: 999;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
    }

    .tableCell {
      text-align: left;
      gap: 6px;
      width: 100%;

      &:nth-child(3) {
        position: static !important;
        order: 3;
      }

      .firstPurchaseBadge {
        font-size: 9px;
        padding: 2px 6px;
        margin-bottom: 2px;
      }

      .couponTitle {
        justify-content: flex-start;
        gap: 6px;
      }

      .mobileInfo {
        display: block;
        margin-top: 2px;
      }

      .statusBadge {
        min-width: 55px;
        font-size: 10px;
        height: 16px;
        line-height: 14px;
        padding: 1px 4px;
      }
    }
  }

  /* Breakpoint para mobile pequeno (400px e menores) */
  @media (max-width: 400px) {
    padding: 10px 16px;
    gap: 6px;

    .tableCell {
      gap: 4px;

      .firstPurchaseBadge {
        font-size: 8px;
        padding: 2px 5px;
        margin-bottom: 2px;
      }

      .couponTitle {
        gap: 4px;
      }

      .statusBadge {
        min-width: 50px;
        font-size: 9px;
        height: 14px;
        line-height: 12px;
        padding: 1px 3px;
      }
    }
  }

  /* Classes utilitárias para controle de visibilidade */
  .desktopOnly {
    @media (max-width: 539px) {
      display: none;
    }
  }
`;
