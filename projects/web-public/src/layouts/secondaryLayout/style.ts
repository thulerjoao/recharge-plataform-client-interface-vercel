import styled from "styled-components";
import { DeviceType } from "types/device.types";

interface LayoutProps {
  device: DeviceType;
}

export const LayoutStyle = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .mainContent {
    display: flex;
    width: 100%;
    max-width: 85.5rem;
    flex-direction: ${({ device }) =>
      device !== "desktop" ? "column" : "row"};
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 80px;
    padding: 0 40px;
    gap: 32px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .mainContent {
      margin-top: 48px;
      padding: 0;
    }
  }
  @media (max-width: 767px) {
    .mainContent {
      margin-top: 48px;
      padding: 0;
    }
  }
`;
