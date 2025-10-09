import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface PackageCardProps {
  selected: boolean;
}

export const PackageCardContainer = styled.article<PackageCardProps>`
  background: ${Theme.colors.maindark};
  ${({ selected }) =>
    selected &&
    `background: linear-gradient(
    176deg,
    rgb(36, 98, 113) 5%,
    rgba(1, 11, 14, 1) 55%
  );`};
  -webkit-box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  height: 232px;
  width: 100%;
  max-width: 174px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
  border: 3px solid transparent;
  ${({ selected }) =>
    selected && `border: 3px solid  ${Theme.colors.mainHighlight}`};
  box-shadow: ${({ selected }) =>
    selected && `0px 0px 10px 0px ${Theme.colors.mainHighlight}`};
  position: relative;

  h2 {
    font-size: 14px;
  }

  figure {
    height: 80px;
    width: 80px;
    margin-top: 12px;
    border-radius: 8px;
    overflow: hidden;
  }

  .bestPriceContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    bottom: 18px;

    .bestPrice {
      height: 16px;
      width: 88%;
      background-color: ${Theme.colors.mainHighlight};
      box-shadow: 0px 0px 10px 0px ${Theme.colors.mainHighlight};
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;

      p {
        z-index: 1;
      }

      .bow {
        width: 30px;
        height: 15px;
        background-color: ${Theme.colors.mainHighlight}90;
        position: absolute;
        z-index: 0;
        top: 5px;
        overflow: hidden;

        .bow-inner {
          width: 11px;
          height: 11px;
          background-color: ${Theme.colors.maindark};
          position: absolute;
          z-index: 0;
          transform: rotate(45deg);
          position: absolute;
          top: 2px;
        }
      }

      .leftBow {
        left: -10px;

        .bow-inner {
          left: -5px;
        }

        .bow-inner-2 {
          width: 20px;
          height: 10px;
          background-color: ${Theme.colors.mainHighlight}99;
          position: absolute;
          transform: rotate(11deg);
          position: absolute;
          right: -1px;
          bottom: 2px;
        }
      }

      .rightBow {
        right: -10px;

        .bow-inner {
          right: -5px;
        }

        .bow-inner-2 {
          width: 20px;
          height: 10px;
          background-color: ${Theme.colors.mainHighlight}99;
          position: absolute;
          transform: rotate(-11deg);
          position: absolute;
          left: -1px;
          bottom: 2px;
        }
      }
    }
  }
`;
