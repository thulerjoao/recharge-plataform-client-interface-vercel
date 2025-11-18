import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const DailyTrendContainer = styled.section`
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
      flex: 1;
    }

    .metrics {
      justify-content: space-between;
      padding-bottom: 32px;
      flex: 0 0 auto;
      min-width: 60px;
    }
  }

  @media (max-width: 767px) {
    width: 100%;

    .graphics {
      height: 300px;
    }
  }
`;

interface BarProps {
  heightinpercent: number;
}

export const VerticalBar = styled.span<BarProps>`
  height: ${({ heightinpercent }) => `calc(${heightinpercent}% - 31px)`};
  min-height: 4px;
  width: 24px;
  background-color: ${Theme.colors.mainHighlight};
  border-radius: 4px 4px 0 0;
`;
