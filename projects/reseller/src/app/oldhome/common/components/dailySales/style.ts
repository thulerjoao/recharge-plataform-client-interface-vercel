import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const DailySalesContainer = styled.section`
  width: 100%;

  .graphics {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 384px;
    margin-top: 24px;

    .vertical {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
    }

    .metrics {
      justify-content: space-between;
      padding-bottom: 32px;
    }
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

interface BarProps {
  heightinpercent: number;
}

export const VerticalBar = styled.span<BarProps>`
  height: ${({ heightinpercent }) => `calc(${heightinpercent}% - 31px)`};
  width: 24px;
  background-color: ${Theme.colors.mainHighlight};
`;
