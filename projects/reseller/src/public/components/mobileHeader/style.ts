import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const MobileHeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: ${Theme.colors.mainTransparent};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  span {
    display: flex;
    align-items: center;
  }
`;
