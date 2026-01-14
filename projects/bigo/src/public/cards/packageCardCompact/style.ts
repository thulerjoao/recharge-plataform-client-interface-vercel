import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface PackageCardProps {
  selected: boolean;
  isOffer: boolean;
  paymentPage?: boolean;
}

export const PackageCardCompactContainer = styled.article<PackageCardProps>`
  width: 100%;
  max-width: 174px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  .mobile {
    display: none;
  }
  border: 2px solid ${Theme.colors.secondaryHighlight};
  background-color: ${Theme.colors.couponsBackground};
  ${({ selected }) =>
    selected && `border: 2px solid  ${Theme.colors.mainHighlight}`};
  box-shadow: ${({ selected }) =>
    selected && `0px 0px 10px 0px ${Theme.colors.mainHighlight}`};
  position: relative;

  .diamondContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 40px;
    padding-left: 10px;
    padding-right: -10px;

    h2 {
      width: auto;
      height: 100%;
      margin-top: 16px;
    }

    figure {
      height: 100%;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .diamondText {
    border-bottom: 1px solid ${Theme.colors.secondaryTextAction};
    padding-bottom: 8px;
  }

  .priceContainer {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding: 0;
    margin-top: 16px;
    margin-bottom: 8px;
    /* background-color: red; */
    padding-right: 16px;
    position: relative;

    .basePriceDiscount {
      position: absolute;
      top: -16px;
      left: 0;
      z-index: 1;
    }
  }

  .offerContainer {
    position: absolute;
    bottom: -28.5px;
    right: -17px;
    z-index: 1;
    /* transform: rotate(-20deg); */
  }

  ${({ paymentPage }) =>
    !paymentPage &&
    `
    @media (max-width: 539px) {
      padding: 0 4px !important;
      
      .desktop {
        display: none;
      }

      .mobile {
        display: block;
      }

      .diamondContainer {
        align-items: flex-start;

        h2 {
          font-size: 16px !important;
          margin-top: 10px;
        }

        img {
          height: 35px !important;
          width: 28px !important;
        }
      }

      .diamondText {
        font-size: 12px !important;
        padding-bottom: 4px !important;
      }

      .priceContainer {
        margin-top: 8px;
        margin-bottom: 16px;
        h3 {
          font-size: 14px !important;
        }
      }

      .offerContainer {
        bottom: -23px;
        right: -13px;
        img {
          height: 75px !important;
          width: 75px !important;
        }
      }
    }
  `}
`;
