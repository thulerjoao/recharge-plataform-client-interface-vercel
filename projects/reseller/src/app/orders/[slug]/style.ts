import styled from "styled-components";

export const SalesInnerPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 97px;

  .mobile {
    display: none;
  }

  .mainTitle {
    margin-top: 32px;
  }

  main {
    margin-top: 96px;
    width: 100%;
    max-width: 852px;
    border-radius: 8px;
    padding: 16px;
    border: 1px solid ${({ theme }) => theme.border_02};
    background-color: ${({ theme }) => theme.background_02};
    padding: 16px;

    img {
      border: 1px solid ${({ theme }) => theme.border_02};
    }

    .top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.border_01};
      min-width: 0;

      .leftTop {
        display: flex;
        flex-direction: column;

        img {
          height: 72px;
          width: 72px;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        p {
          margin-top: 16px;
        }
      }

      .rightTop {
        display: flex;
        flex-direction: column;
        min-width: 0;
        overflow: hidden;

        h2,
        h3,
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        h2 {
          margin-bottom: 8px;
        }

        h3 {
          margin-bottom: 35px;
        }

        p {
          margin-top: 16px;
        }
      }
    }

    .medium,
    .bottom {
      display: flex;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.border_01};

      section {
        height: 42px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-left: 16px;

        div {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }

      .statusText {
        text-shadow: 0px 0px 1px ${({ theme }) => theme.text_01};
      }
    }

    .bottom {
      border-bottom: none;

      img {
        height: 40px;
        width: 40px;
        border-radius: 8px;
      }
    }
  }

  .bottomContainer {
    display: flex;
    align-items: center;
    padding: 24px;
    margin-top: 32px;
    background-color: ${({ theme }) => theme.background_01};
    border-radius: 8px;
    gap: 24px;
    margin-bottom: 79px;

    div {
      display: flex;
      width: 50%;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    main {
      max-width: 100%;
    }
  }
  @media (max-width: 768px) {
    main {
      margin-top: 64px;
    }

    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }

    .mobileHeader {
      position: fixed;
      top: 0;
      z-index: 10;
      margin-top: 12px;
      width: auto;
      height: 0;
    }

    .mainTitle {
      margin-top: 24px;
    }

    main {
    }
  }
`;
