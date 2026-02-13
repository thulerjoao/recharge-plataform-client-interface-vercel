import styled from "styled-components";

export const CardContainer = styled.article`
  /* background: linear-gradient(
    180deg,
    ${({ theme }) => theme.background_02} 30%,
    ${({ theme }) => theme.background_02} 100%
  ); */
  background: ${({ theme }) => theme.background_02};
  box-shadow: 0px 0px 2px ${({ theme }) => theme.border_03};
  /* border: 1px solid ${({ theme }) => theme.border_01}80; */
  border-radius: 4px;
  height: 231px;
  width: 100%;
  max-width: 174px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    /* box-shadow: 0px 4px 12px ${({ theme }) => theme.mainColor}40; */
  }

  img {
    height: 178px;
    width: 100%;
    object-fit: cover;
  }
`;
