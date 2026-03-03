import styled from "styled-components";

export const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 21/9;
    object-fit: fill;
  }

  .centerContent {
    width: 100%;

    .instructions {
      width: 100%;
      max-width: 496px;
    }
    .seeLess,
    .seeMore {
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    img {
      max-width: 100%;
      padding: 0 24px;
    }

    .centerContent {
      width: 100%;
      padding: 0 72px;

      .instructions {
        width: 100%;
        max-width: 100%;
      }
      .seeLess,
      .seeMore {
        display: flex;
      }
    }

    .hiddenContent {
      display: none;
    }
  }
  @media (max-width: 767px) {
    img {
      width: 100vw;
      max-width: 100%;
    }

    .centerContent {
      width: 100%;
      padding: 0 16px;

      .instructions {
        width: 100%;
        max-width: 100%;
      }
      .seeLess,
      .seeMore {
        display: flex;
      }
    }

    .hiddenContent {
      display: none;
    }
  }
`;
