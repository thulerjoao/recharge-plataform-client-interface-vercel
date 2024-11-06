import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const AsideBarContainer = styled.aside`
  height: 100vh;
  width: 232px;
  /* background-color: ${Theme.colors.mainTransparent}; */
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .menuOption {
    display: flex;
    align-items: center;
    height: 48px;
    width: 100%;
    padding: 0 16px;
    margin-bottom: 16px;
    cursor: pointer;
  }

  .bottomOptions {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;
