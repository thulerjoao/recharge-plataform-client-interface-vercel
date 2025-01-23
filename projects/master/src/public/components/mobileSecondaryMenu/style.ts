import styled from "styled-components";

interface Props {}

export const MobileSecondaryMenuContainer = styled.div<Props>`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  .backWard {
    position: absolute;
    left: 0;
  }
`;
