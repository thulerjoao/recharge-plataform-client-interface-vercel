import styled from "styled-components";

export const CardContainer = styled.article`
  background: ${({ theme }) => theme.background_04};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.border_02};
  height: 231px;
  width: 100%;
  max-width: 174px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 178px;
    width: 100%;
    object-fit: fill;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (max-width: 767px) {
    min-width: 0px;
  }
`;
