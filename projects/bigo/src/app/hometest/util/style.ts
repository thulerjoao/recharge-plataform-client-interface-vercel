import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const HomeTestContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  overflow-x: hidden;

  .slide {
    max-width: 50rem;

    .slidePic {
      background-color: green;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    .cardsContainer {
      width: 100%;
      max-width: 1000px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      margin-top: 32px;
      margin-bottom: 56px;
      padding: 0 24px;
      box-sizing: border-box;

      .cardEnviroment {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
      }
    }
  }

  .couponsLink {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 32px 0;

    a {
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1400px) {
    main {
      .cardsContainer {
        grid-template-columns: repeat(4, 1fr);
        max-width: 820px;

        .cardEnviroment {
          min-width: 0;
          max-width: 100%;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    main {
      .cardsContainer {
        grid-template-columns: repeat(4, 1fr);
        max-width: 820px;
        gap: 12px;
        padding: 0 16px;

        .cardEnviroment {
          min-width: 0;
          max-width: 100%;
        }
      }
    }
  }

  @media (min-width: 540px) and (max-width: 767px) {
    main {
      .cardsContainer {
        grid-template-columns: repeat(3, 1fr);
        max-width: 620px;
        gap: 12px;
        padding: 0 16px;

        .cardEnviroment {
          min-width: 0;
          max-width: 100%;
        }
      }
    }
  }

  @media (max-width: 539px) {
    main {
      .homeTestText {
        max-width: 200px;
      }
      .cardsContainer {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 0 14px;
        margin-top: 24px;

        .cardEnviroment {
          min-width: 0;
          max-width: 100%;
        }
      }
    }

    .couponsLink {
      margin: 24px 0;
      padding: 0 16px;
    }
  }
`;
