import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SalesInnerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  main {
    background-color: ${Theme.colors.maindark};
    margin-top: 24px;
    width: 100%;
    max-width: 628px;
    border-radius: 8px;
    padding: 16px;

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
`;
