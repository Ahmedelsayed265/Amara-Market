import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function SectionsSlider({ sections }) {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={9}
      speed={1000}
      loop={true}
      breakpoints={{
        992: {
          slidesPerView: 9,
        },
        768: {
          slidesPerView: 6,
        },
        350: {
          slidesPerView: 3,
        },
      }}
    >
      {sections?.map((section) => (
        <SwiperSlide key={section.id}>
          <button className="section_btn">
            <div className="img">
              <img src={section?.image} alt={section?.title} />
            </div>
            <span className="title">{section?.title}</span>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
