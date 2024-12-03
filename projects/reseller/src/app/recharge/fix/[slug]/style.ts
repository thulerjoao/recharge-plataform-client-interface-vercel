import styled from "styled-components";

export const FixRechargePage = styled.div`
  padding-top: 96px;

  main {
    display: flex;
    width: 100%;

    .bannerContainer {
      width: 42%;
      padding-right: 40px;
      img {
        max-width: 100%;
        height: auto;
      }
    }

    .rechargeDatas {
      width: 58%;

      .inputsContainer {
        width: 100%;
      }

      .bottomContainer {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    main {
      .rechargeDatas {
        .inputsContainer {
        }

        width: 100%;
        padding: 0 24px;
      }
    }
  }
  @media (max-width: 767px) {
    padding-top: 64px;

    main {
      .rechargeDatas {
        .inputsContainer {
        }

        .bottomContainer {
          .cardsList {
            padding: 0;
            box-sizing: border-box;

            .cardEnviroment {
              flex: 0 1 calc(50% - 10px);
              margin: 0;
              margin-bottom: 24px;
            }
          }
        }

        width: 100%;
        padding: 0;
      }
    }
  }
`;
