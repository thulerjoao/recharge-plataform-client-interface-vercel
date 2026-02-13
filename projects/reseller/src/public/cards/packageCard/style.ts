import styled from "styled-components";

interface PackageCardProps {
  selected: boolean;
}

export const PackageCardContainer = styled.article<PackageCardProps>`
  background: ${({ theme }) => theme.background_01};
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
  ${({ selected, theme }) =>
    selected && `border: 3px solid ${theme.mainColor}`};
  box-shadow: ${({ selected, theme }) =>
    selected && `0px 0px 10px 0px ${theme.mainColor}`};
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
      background-color: ${({ theme }) => theme.mainColor};
      box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.mainColor};
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
        background-color: ${({ theme }) => theme.mainColor}90;
        position: absolute;
        z-index: 0;
        top: 5px;
        overflow: hidden;

        .bow-inner {
          width: 11px;
          height: 11px;
          background-color: ${({ theme }) => theme.background_01};
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
          background-color: ${({ theme }) => theme.mainColor}99;
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
          background-color: ${({ theme }) => theme.mainColor}99;
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
