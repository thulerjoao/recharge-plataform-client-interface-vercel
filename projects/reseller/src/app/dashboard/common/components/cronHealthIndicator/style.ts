import styled from "styled-components";

interface CronHealthIndicatorContainerProps {
  $isHealthy: boolean;
}

export const CronHealthIndicatorContainer = styled.div<CronHealthIndicatorContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  width: auto;
  flex-wrap: nowrap;

  .statusContent {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    flex-wrap: nowrap;
    flex-shrink: 0;

    .statusCircle {
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
      border-radius: 50%;
      background-color: ${({ $isHealthy, theme }) =>
        $isHealthy ? theme.approved : theme.refused};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      flex-grow: 0;
      transition: all 0.2s ease;
      border: 2px solid
        ${({ $isHealthy, theme }) =>
          $isHealthy ? `${theme.approved}40` : `${theme.refused}40`};

      .statusIcon {
        color: ${({ theme }) => theme.text_01};
        font-size: 18px;
        font-weight: bold;
        line-height: 1;
      }
    }

    .statusText {
      flex-shrink: 0;
      white-space: nowrap;

      p {
        white-space: nowrap;
      }
    }
  }

  button {
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.refused} !important;
  }

  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.background_01};
    border: 1px solid ${({ theme }) => theme.border_01};
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0px 4px 12px ${({ theme }) => theme.background_06};
    z-index: 100;
    min-width: 280px;
    max-width: 320px;
    animation: fadeIn 0.2s ease;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 20px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid ${({ theme }) => theme.background_01};
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .statusContent {
      gap: 8px;
    }

    .statusCircle {
      width: 28px;
      height: 28px;

      .statusIcon {
        font-size: 16px;
      }
    }

    button {
      width: 100%;
    }
  }
`;
