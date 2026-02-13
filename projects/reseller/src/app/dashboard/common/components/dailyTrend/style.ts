import styled from "styled-components";

export const DailyTrendContainer = styled.section`
  width: 100%;
  max-width: 500px;
  margin-bottom: 24px;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  .graphics {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 384px;
    margin-top: 24px;
    gap: 4px;

    .vertical {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      flex: 1;

      p {
        max-height: 16px;
        /* background-color: red; */
      }
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
  width: 22px;
  background-color: ${({ theme }) => theme.mainColor};
  transition: opacity 0.2s ease;
`;

export const Tooltip = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.background_01};
  border: 1px solid ${({ theme }) => theme.text_04}40;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
  transform: translateX(-50%);
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    transform: translateX(-50%) translateY(-100%);
    margin-top: 75px;
  }
`;
