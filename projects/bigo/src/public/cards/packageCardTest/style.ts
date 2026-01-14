import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface PackageCardProps {
  selected: boolean;
  isOffer: boolean;
}

export const PackageCardContainerTest = styled.article<PackageCardProps>`
  -webkit-box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
  -moz-box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
  box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
  width: 100%;
  max-width: 174px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  background: linear-gradient(
    ${Theme.colors.secondaryHighlight} 0%,
    ${Theme.colors.couponsBackground} 60%
  );
  border: 2px solid ${Theme.colors.secondaryHighlight};

  /* ${({ isOffer }) =>
    isOffer &&
    `border: 2px solid ${Theme.colors.refused};
  `}; */
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
  }

  .offerContainer {
    width: auto;
    position: absolute;
    bottom: -29px;
    right: -17px;
    z-index: 1;
    /* transform: rotate(-20deg); */
  }
`;
