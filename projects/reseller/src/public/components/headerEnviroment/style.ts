import styled from "styled-components";

export const HeaderEnviromentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 0;
  z-index: 99;

  .mainContainer {
    width: 100%;
    max-width: 85.5rem;
    padding-right: 40px;
    padding-left: 304px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .mainContainer {
      max-width: 100%;
      padding-right: 24px;
      padding-left: 96px;
    }
  }
  @media (max-width: 767px) {
    .mainContainer {
      max-width: 100%;
      padding: 0;
    }
  }
`;
