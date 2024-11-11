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
  position: relative;

  .headerTitle {
    width: 161px;
  }

  .searchInput {
    width: 100%;
    max-width: 440px;
  }

  .filter {
    width: 161px;
    height: 40px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    cursor: pointer;
    border: 1px solid ${Theme.colors.maindark};

    span {
      display: flex;
      align-items: center;
    }

    p {
      user-select: none;
    }
  }

  .opened {
    border: 1px solid ${Theme.colors.mainHighlight};
  }
`;
