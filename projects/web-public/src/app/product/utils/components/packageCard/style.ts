import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const PackageCardContainer = styled.article`
  background: ${Theme.colors.maindark};
  -webkit-box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  height: 232px;
  width: 174px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;

  figure {
    height: 80px;
    width: 80px;
    margin-top: 12px;
    border-radius: 8px;
    overflow: hidden;
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
