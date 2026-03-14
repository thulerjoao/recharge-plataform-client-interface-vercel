import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SwiperContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  
  .swiper {
    width: 100%;
    height: auto;
  }

  .swiper-slide {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 32px;
    width: 100%;
  }
  
  .mainBanner {
    width: 100%;
    height: auto;
    aspect-ratio: 21/9;
    object-fit: fill;
  }

  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.text_01};
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.mainColor};
    opacity: 1;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .swiper-slide {
      margin-top: 0px;
      .mainBanner {
        width: 100%;
        max-width: 768px;
        padding: 0 24px;
      }
    }
  }
  
  @media (max-width: 767px) {
    .swiper-slide {
      margin-top: 0px;
      .mainBanner {
        width: 100%;
        max-width: 100%;
      }
    }
  }
  `;
