import styled from "styled-components";

interface LayoutProps {}

export const LayoutStyle = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 238px);
  padding-bottom: 238px;
  position: relative;

  .mainContent {
    display: flex;
    width: 100%;
    max-width: 85.5rem;
    flex-direction: row;
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
      flex-direction: column;
    }
  }
  @media (max-width: 767px) {
    .mainContent {
      margin-top: 48px;
      padding: 0;
      flex-direction: column;
    }
  }
`;
