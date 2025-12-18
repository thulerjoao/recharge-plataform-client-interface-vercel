import { Theme } from "@4miga/design-system/theme/theme";
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
    background-color: ${Theme.colors.maindark};
    margin-top: 96px;
    width: 100%;
    max-width: 852px;
    border-radius: 8px;
    padding: 16px;
    -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);

    .top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
      border-bottom: 1px solid ${Theme.colors.secondaryAction};

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
      border-bottom: 1px solid ${Theme.colors.secondaryAction};

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
    background-color: ${Theme.colors.maindark};
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
