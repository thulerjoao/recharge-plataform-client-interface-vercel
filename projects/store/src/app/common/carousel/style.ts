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
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    background: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #333;
  }

  .swiper-pagination-bullet {
    background: #333;
    opacity: 0.7;
  }

  .swiper-pagination-bullet-active {
    background: #007bff;
    opacity: 1;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #333;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #007bff;
  }
`;
