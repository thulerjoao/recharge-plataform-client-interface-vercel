import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SalesHeaderContainer = styled.header`
  height: 68px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background-color: ${Theme.colors.mainTransparent};

  .headerTitle {
    width: 161px;
  }

  .searchInput {
    width: 100%;
    max-width: 440px;
  }

  .filter {
    width: 161px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;

    span {
      cursor: pointer;
    }
  }
`;
