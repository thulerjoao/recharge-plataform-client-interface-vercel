import styled from "styled-components";

interface LayoutProps {}

export const LayoutStyle = styled.div<LayoutProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0;
  background-color: pink;

  .mainContent {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 85.5rem;
    padding: 0 40px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
  }
`;
