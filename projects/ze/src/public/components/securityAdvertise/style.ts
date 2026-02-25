import styled from "styled-components";

export const SecurityAdvertiseContainer = styled.section`
  display: flex;

  article {
    height: 160px;
    width: 160px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.background_02};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 17px 0;
    box-sizing: border-box;
    margin: 0 28px;
    box-shadow: 0px 0px 2px ${({ theme }) => theme.border_03};
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    justify-content: space-between;
    width: 100%;
    max-width: 400px;
    padding: 0 16px;
    article {
      margin: 0 8px;
    }
  }
`;
