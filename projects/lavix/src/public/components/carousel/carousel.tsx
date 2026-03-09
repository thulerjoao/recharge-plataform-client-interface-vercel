import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperContainer } from "./style";

interface Props {
  imagesList: string[];
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
        loop
      >
        {imagesList &&
          imagesList.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                className="mainBanner"
                src={item}
                alt={`Banner promocional ${index + 1}`}
                width={1000}
                height={600}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
                quality={85}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default Carousel;
