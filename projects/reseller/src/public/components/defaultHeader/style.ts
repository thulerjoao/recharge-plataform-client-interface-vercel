import styled from "styled-components";

export const DefaultHeaderContainer = styled.header`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background_03};
  position: relative;
  z-index: 10;

  .backArrow {
    position: absolute;
    left: 24px;
    cursor: pointer;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    height: 48px;
    z-index: 0;

    .backArrow {
      left: 0;
    }
  }
`;
