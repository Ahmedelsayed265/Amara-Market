import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function SectionsSlider({ sections, sectionId }) {
  const [, setSearchParams] = useSearchParams();
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
          <button
            onClick={() => setSearchParams({ id: section.id })}
            className={`section_btn ${
              Number(sectionId) === section.id ? "active" : ""
            }`}
          >
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
