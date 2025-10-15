import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  .swiper {
    width: 100%;
    height: 100%;
    aspect-ratio: 21/9;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    position: relative;
    background: ${Theme.colors.secondaryTextAction};
    overflow: hidden;

    .mainBanner {
      cursor: pointer;
      object-fit: fill;
      object-position: center;
    }
  }

  .swiper-pagination-bullet {
    background: ${Theme.colors.mainlight};
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: ${Theme.colors.mainHighlight};
    opacity: 1;
  }

  @media (min-width: 540px) and (max-width: 1024px) {
    max-width: 100%;
    padding: 0 24px;
  }

  @media (max-width: 539px) {
    max-width: 100%;
    padding: 0;
  }
`;
