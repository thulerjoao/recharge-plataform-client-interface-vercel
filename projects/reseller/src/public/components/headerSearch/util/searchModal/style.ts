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
`;

export const CloseModal = styled.div`
  display: flex;
  background-color: transparent;
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  @media (max-width: 767px) {
    display: none;
  }
`;
