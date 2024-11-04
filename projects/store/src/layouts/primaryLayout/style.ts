import styled from "styled-components";
import { DeviceType } from "types/device.types";

interface LayoutProps {
  device: DeviceType;
}

export const LayoutStyle = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
  min-height: calc(100vh - 238px);
  padding-bottom: 238px;
  position: relative;

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
  }
`;
