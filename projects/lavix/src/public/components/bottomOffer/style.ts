import styled from "styled-components";

export const BottomOfferContainer = styled.section`
  width: 100%;
  max-width: 696px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .offerBannerContainer {
    position: relative;
    width: 80%;

    aspect-ratio: 21/9;

    .offerBanner {
      max-width: 100%;
      object-fit: fill;
    }
  }

  @media (max-width: 768px) {
    .offerBannerContainer {
      width: 85%;
    }
  }

  @media (max-width: 539px) {
    .offerBannerContainer {
      width: 100%;
    }
  }
`;
