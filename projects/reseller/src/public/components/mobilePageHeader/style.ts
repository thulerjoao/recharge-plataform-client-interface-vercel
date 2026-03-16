import styled from "styled-components";

export const MobilePageHeaderContainer = styled.div`
  display: none;

  .storeName {
    position: absolute;
    top: 20px;
  }

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
    margin-top: 12px;
    height: 0;
  }
`;
