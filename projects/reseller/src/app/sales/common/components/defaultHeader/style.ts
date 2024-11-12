import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const DefaultHeaderContainer = styled.header`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${Theme.colors.mainTransparent};
  position: relative;

  .backArrow {
    position: absolute;
    left: 24px;
  }
`;
