import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;

  .mainBanner {
    margin-top: 80px;
    width: 100%;
    max-width: 696px;
    object-fit: contain;
    height: auto;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .cardsContainer {
      width: 100%;
      max-width: 605px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 24px;
      margin-bottom: 56px;

      .cardEnviroment {
        height: auto;
        flex: 0 1 calc(33.33% - 16px);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 24px;
      }
    }
  }

  @media (min-width: 540px) and (max-width: 1024px) {
  }
  @media (max-width: 539px) {
    main {
      .cardsContainer {
        padding: 0 14px;
        box-sizing: border-box;

        .cardEnviroment {
          flex: 0 1 calc(50% - 10px);
        }
      }
    }

    .offerBanner {
      width: 100%;
      height: auto;
      object-fit: contain;
      padding: 0 16px;
    }
  }
`;
