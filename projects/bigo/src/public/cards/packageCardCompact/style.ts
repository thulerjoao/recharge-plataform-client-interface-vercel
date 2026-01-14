import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface PackageCardCompactProps {
  selected: boolean;
}

export const PackageCardCompactContainer = styled.article<PackageCardCompactProps>`
  background: ${Theme.colors.maindark};
  ${({ selected }) =>
    selected &&
    `background: linear-gradient(
    176deg,
    rgb(36, 98, 113) 5%,
    rgba(1, 11, 14, 1) 55%
  );`};
  -webkit-box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
  -moz-box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
  box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
  min-height: 140px;
  height: auto;
  width: 100%;
  border-radius: 8px;
  overflow: visible;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 8px;
  border: 2px solid transparent;
  ${({ selected }) =>
    selected && `border: 2px solid  ${Theme.colors.mainHighlight}`};
  box-shadow: ${({ selected }) =>
    selected && `0px 0px 8px 0px ${Theme.colors.mainHighlight}`};
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0px 4px 8px 0px rgba(0, 200, 255, 0.3);
  }

  .hotBadge {
    position: absolute;
    top: 6px;
    right: 6px;
    background-color: ${Theme.colors.refused};
    padding: 2px 6px;
    border-radius: 4px;
    z-index: 1;
    transform: rotate(12deg);
  }

  figure {
    height: auto;
    width: 100%;
    margin: 0;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  h3 {
    font-size: 12px;
    line-height: 1.3;
    text-align: center;
    word-break: break-word;
    width: 100%;
  }

  .priceContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2px;
    margin-top: auto;
    padding-top: 8px;

    h4 {
      font-size: 14px;
      line-height: 1.2;
      white-space: nowrap;
    }

    span {
      font-size: 11px;
      line-height: 1.2;
      white-space: nowrap;
    }
  }
`;
