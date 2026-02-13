import styled from "styled-components";

export const UnderConstructionContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 48px - 238px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  .content-wrapper {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .text-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .message-box {
    width: 100%;
    max-width: 500px;
    background-color: ${({ theme }) => theme.background_01};
    border-radius: 12px;
    padding: 32px 24px;
    margin: 24px 0;
    border: 1px solid ${({ theme }) => theme.background_03};
    box-shadow: 0px 0px 10px 2px rgba(0, 200, 255, 0.1);
  }

  .features-preview {
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 32px;
    gap: 24px;

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      .feature-icon {
        font-size: 32px;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 60px 40px;

    .message-box {
      padding: 40px 32px;
    }
  }

  @media (max-width: 767px) {
    padding: 40px 16px;
    min-height: calc(100vh - 48px - 300px);

    .message-box {
      padding: 24px 20px;
      margin: 20px 0;
    }

    .features-preview {
      gap: 16px;
      margin-top: 24px;
      flex-wrap: wrap;
      justify-content: center;

      .feature-item {
        flex: 0 1 auto;
        min-width: 80px;

        .feature-icon {
          font-size: 28px;
        }
      }
    }
  }
`;
