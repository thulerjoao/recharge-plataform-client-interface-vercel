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

  p {
    white-space: nowrap;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 16px;
    height: auto;
    justify-content: space-between;
    gap: 10px;

    p {
      white-space: wrap;
    }
  }
`;
