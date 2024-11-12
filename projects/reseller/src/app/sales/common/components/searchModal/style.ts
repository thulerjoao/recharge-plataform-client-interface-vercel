import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SearchModalContainer = styled.div`
  z-index: 2;
  width: 390px;
  border-radius: 8px;
  border: 1px solid ${Theme.colors.mainHighlight};
  background-color: ${Theme.colors.maindark};
  position: absolute;
  right: 0;
  top: 68px;
  padding: 16px;
  padding-bottom: 0;
  p {
    user-select: none;
  }

  .option {
    display: flex;
    align-items: center;
    height: 24px;
    width: 100%;
    margin-bottom: 16px;
    cursor: pointer;
  }

  .innerList {
    width: 100%;
    padding: 0 32px;
    margin-top: -4px;
    padding-bottom: 8px;

    .innerOption {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      cursor: pointer;
    }
  }
`;

export const CloseModal = styled.div`
  background-color: transparent;
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;
