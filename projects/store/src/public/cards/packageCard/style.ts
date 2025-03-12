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
  min-height: 232px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
  border: 4px solid transparent;
  ${({ selected }) =>
    selected && `border: 4px solid  ${Theme.colors.mainHighlight}`};
  box-shadow: ${({ selected }) =>
    selected && `0px 0px 10px 0px ${Theme.colors.mainHighlight}`};

  figure {
  }

  img {
    height: 80px;
    width: 80px;
    margin-top: 12px;
    border-radius: 8px;
    overflow: hidden;
    object-fit: fill;
  }

  .bestPrice {
    height: 24px;
    width: 100%;
    background-color: ${Theme.colors.mainHighlight};
    box-shadow: 0px 0px 10px 0px ${Theme.colors.mainHighlight};
    display: flex;
    align-items: center;
    border-radius: 12px;
    margin-top: 12px;
  }
`;
