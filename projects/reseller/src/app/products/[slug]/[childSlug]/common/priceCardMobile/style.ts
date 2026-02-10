import styled from "styled-components";

export const PriceCardMobileContainer = styled.div`
  background-color: ${({ theme }) => theme.background_01};
  padding: 24px;
  padding-bottom: 0;
  margin-bottom: 24px;
  border-radius: 8px;

  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin-bottom: 24px;

    image {
      background-color: pink;
      display: flex;
      align-items: center;
      height: 100%;
      width: auto;
    }

    p {
      margin-left: 8px;
    }
  }

  .values {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 24px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 50%;
    flex: 0 1 calc(50% - 16px);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;
