import styled, { keyframes } from "styled-components";

export const OrderCardContainer = styled.article`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background_01};
  -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  border: 1px solid ${({ theme }) => theme.border_01}80;
  box-sizing: border-box;
  cursor: pointer;

  .allInfo {
    height: 66px;
    width: calc(100% - 82px);
    display: flex;
    flex-direction: column;
    align-items: center;

    .rowInfos {
      display: flex;
      margin-bottom: 8px;
      width: 100%;
    }

    .seeDetails {
      width: 6rem;
    }
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

interface SkeletonProps {
  opacity?: number;
}

export const SkeletonContainer = styled.div<SkeletonProps>`
  height: 90px;
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background_01};
  box-shadow: 0px 0px 1.2px 0px rgba(2, 36, 46, 1);
  background-image: linear-gradient(
    80deg,
    ${({ theme }) => theme.background_01} 60%,
    rgba(255, 255, 255, 0.08) 85%,
    ${({ theme }) => theme.background_01} 100%
  );
  background-size: 250% 100%;
  animation: ${shimmer} 1.5s steps(60) infinite;
  opacity: ${({ opacity }) => opacity ?? 1};
  -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);

  div {
    background-color: #00000030;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    margin: 13px 10px;
  }
`;
