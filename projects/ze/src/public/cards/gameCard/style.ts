import styled from "styled-components";

export const CardContainer = styled.article`
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.background_02} 30%,
    ${({ theme }) => theme.background_01} 100%
  );
  box-shadow: 0px 0px 5px 2px ${({ theme }) => theme.border_01};
  height: 231px;
  width: 100%;
  max-width: 174px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid ${({ theme }) => theme.border_01};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px ${({ theme }) => theme.mainColor}40;
  }

  img {
    height: 178px;
    width: 100%;
    object-fit: cover;
  }
`;
