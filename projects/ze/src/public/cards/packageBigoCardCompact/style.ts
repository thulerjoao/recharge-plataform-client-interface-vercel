import styled from "styled-components";

interface PackageCardProps {
  selected: boolean;
  isOffer: boolean;
  paymentPage?: boolean;
}

export const PackageBigoCardCompact = styled.article<PackageCardProps>`
  width: 100%;
  max-width: 174px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  .mobile {
    display: none;
  }
  border: 3px solid ${({ theme }) => theme.border_02};
  background-color: ${({ theme }) => theme.background_04};
  position: relative;

  @media (hover: hover) {
    &:hover {
      border: 2px solid ${({ theme }) => theme.mainColor};
      box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.mainColor};
    }
  }

  ${({ selected }) =>
    selected &&
    `
    border: 2px solid ${({ theme }) => theme.mainColor};
    box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.mainColor};
    cursor: default;
  `}

  @media (hover: none) {
    &:hover {
      border: 2px solid ${({ theme }) => theme.border_02};
      box-shadow: none;
    }
  }

  .diamondContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 40px;
    padding-left: -10px;
    padding-right: 10px;

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
      margin-right: 4px;
    }
  }

  .diamondText {
    border-bottom: 2px solid ${({ theme }) => theme.text_04};
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
    padding-right: 16px;
    position: relative;

    .basePriceDiscount {
      position: absolute;
      top: -16px;
      left: 0;
      z-index: 1;
    }
  }

  .offerTextContainer {
    position: absolute;
    bottom: -9px;
    z-index: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.mainColor};
    box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.mainColor};
    border-radius: 12px;
    height: 20px;
    width: 90px;

    h2 {
      font-size: 13px !important;
    }
  }

  @media (max-width: 539px) {
    .offerTextContainer {
      height: 15px;
      width: 80px;

      h2 {
        font-size: 10px !important;
      }
    }
  }

  @media (max-width: 400px) {
    .offerTextContainer {
      width: 70px;

      h2 {
        font-size: 10px !important;
      }
    }
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
          height: 28px !important;
          width: 23px !important;
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
    }
  `}
`;
