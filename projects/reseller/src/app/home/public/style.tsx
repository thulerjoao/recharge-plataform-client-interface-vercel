import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  padding-top: 32px;

  .mainGames {
    display: flex;
    gap: 24px;
    margin-top: 24px;
  }

  .bottomContainer {
    display: flex;
    width: 100%;
    margin-top: 40px;
    gap: 32px;

    .dailySales {
      width: 50%;

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
    }

    .monthSales {
      width: 50%;
      background-color: pink;
    }
  }
`;

interface BarProps {
  heightInPercent: number;
}

export const VerticalBar = styled.span<BarProps>`
  height: ${({ heightInPercent }) => `calc(${heightInPercent}% - 31px)`};
  width: 24px;
  background-color: ${Theme.colors.mainHighlight};
`;
