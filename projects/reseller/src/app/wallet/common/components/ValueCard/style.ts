import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ValueCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 64px;
  background-color: ${Theme.colors.mainTransparent};
  border-radius: 8px;
  padding: 0 16px;
  margin-bottom: 16px;
`;
