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
        background: ${Theme.colors.approved}20;
        border: 1px solid ${Theme.colors.approved};
      }

      &.inactive {
        background: ${Theme.colors.refused}20;
        border: 1px solid ${Theme.colors.refused};
      }
    }
  }

  /* Breakpoint para telas médias (1200px e menores) */
  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1.5fr 1.5fr 0.5fr;
    gap: 12px;
    padding: 14px 16px;

    .tableCell {
      .couponTitle {
        .firstPurchaseBadge {
          width: 18px;
          height: 18px;
          font-size: 12px;
        }
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
    grid-template-columns: 2fr 1fr 1fr;
    gap: 10px;
    padding: 12px 14px;

    /* Mantém a coluna de status em tablets */
    .tableCell:last-child {
      display: flex;
    }

    .tableCell {
      .couponTitle {
        .firstPurchaseBadge {
          width: 16px;
          height: 16px;
          font-size: 11px;
        }
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
    padding: 12px;
    text-align: left;
    position: relative; /* Para posicionar o status badge */

    .tableCell {
      text-align: left;
      gap: 6px;

      .couponTitle {
        justify-content: flex-start;
        gap: 6px;

        .firstPurchaseBadge {
          width: 18px;
          height: 18px;
          font-size: 12px;
        }
      }

      .mobileInfo {
        display: block;
        margin-top: 2px;
      }

      /* Status badge posicionado no canto superior direito */
      &:last-child {
        position: absolute;
        top: 6px;
        right: 6px;
        z-index: 2;

        .statusBadge {
          min-width: 55px;
          font-size: 10px;
          height: 16px;
          line-height: 14px;
          padding: 1px 4px;
        }
      }
    }
  }

  /* Breakpoint para mobile pequeno (400px e menores) */
  @media (max-width: 400px) {
    padding: 10px 12px;
    gap: 6px;

    .tableCell {
      gap: 4px;

      .couponTitle {
        gap: 4px;

        .firstPurchaseBadge {
          width: 16px;
          height: 16px;
          font-size: 10px;
        }
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
