import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SearchComponentContainer = styled.div`
  width: 100%;

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

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    z-index: 0;
    max-width: 100%;
    border-radius: 0;
    border: none;
    position: relative;
    top: 0;
    padding: 0 16px;
  }
`;
