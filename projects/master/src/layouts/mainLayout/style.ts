import styled from "styled-components";

interface LayoutProps {}

export const LayoutStyle = styled.div<LayoutProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0;

  .mainContent {
    width: 100%;
    max-width: 85.5rem;
    padding-right: 40px;
    padding-left: 304px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .mainContent {
      max-width: 100%;
      padding-right: 24px;
      padding-left: 96px;
      box-sizing: border-box;
    }
  }
  @media (max-width: 767px) {
    .mainContent {
      max-width: 100%;
      padding: 0px 16px;
      box-sizing: border-box;
    }
  }
`;
