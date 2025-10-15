import Image, { StaticImageData } from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperContainer } from "./style";

interface Props {
  imagesList: (string | StaticImageData)[];
}

const Carousel = ({ imagesList }: Props) => {
  return (
    <SwiperContainer>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={imagesList.length > 1}
      >
        {imagesList &&
          imagesList.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                className="mainBanner"
                src={item}
                alt={`Banner ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                priority={index === 0}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default Carousel;
