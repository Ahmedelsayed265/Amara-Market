import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingHeader from "../ui/Layout/LandingHeader";
import "swiper/swiper-bundle.css";
import FooterLanding from "../ui/Layout/FooterLanding";

export default function LandingPage() {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);

  const images = [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
    "images/8.png",
    "images/9.png",
  ];
  return (
    <>
      <LandingHeader />
      <main>
        <section className="heroSection sec" id="home">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="text">
                  <span data-aos="fade-up">
                    <i className="fa-sharp fa-thin fa-face-smile-wink"></i>
                    {t("heroHint")}
                  </span>
                  <h1 data-aos="fade-up">
                    {t("heroTitle")} <span>{t("amara")}</span>
                  </h1>
                  <p data-aos="fade-up">{t("heroText")}</p>
                  <div className="download_btns" data-aos="fade-up">
                    <a href="">
                      <img src="/images/Apple Store.png" alt="" />
                    </a>
                    <a href="">
                      <img src="/images/Play Sotre.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="img">
                  <img
                    src="/images/app_mockup.png"
                    alt="mockup"
                    data-aos="zoom-in-up"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about_section sec" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-12 p-2 d-flex align-items-center justify-content-center imgs-wrap">
                <div
                  className="circle"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  <img className="legend" src="images/legend.svg" alt="" />
                  <img className="img1" src="images/mq2.svg" alt="mouckup4" />
                  <img className="img2" src="images/mq1.svg" alt="mouckup5" />
                </div>
              </div>
              <div className="col-lg-7 col-12 p-2">
                <div className="content">
                  <h2 data-aos="fade-up">{t("about.title")}</h2>
                  <p data-aos="fade-up">{t("about.text")}</p>
                  <p data-aos="fade-up">
                    <b>{t("about.mission")}</b> {t("about.missionText")}
                  </p>
                  <p data-aos="fade-up">
                    <b>{t("about.vission")}</b> {t("about.vissionText")}
                  </p>
                  <Link to="/login" data-aos="fade-up" className="loginLink">
                    {t("joinUs")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="gallery" id="gallery">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="appImgs">
                  <h2 data-aos="fade-up">{t("exploreAmara")}</h2>
                  <p data-aos="fade-up">{t("exploreSubTitle")}</p>
                  <div className="swiper phoneImgs">
                    <Swiper
                      data-aos="fade-up"
                      modules={[EffectCoverflow, Navigation, Autoplay]}
                      effect="coverflow"
                      grabCursor={true}
                      centeredSlides={true}
                      spaceBetween={60}
                      speed={1000}
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      rtl={lang === "ar"}
                      key={lang}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      slidesPerView="auto"
                      navigation={{
                        nextEl: ".appSliderNext",
                        prevEl: ".appSliderPrev",
                      }}
                      coverflowEffect={{
                        rotate: 5,
                        stretch: 10,
                        depth: 200,
                        modifier: 1.2,
                        slideShadows: true,
                      }}
                    >
                      {images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img src={image} alt={`Slide ${index + 1}`} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <img
                      src="images/frame.png"
                      className="frame"
                      alt="Decorative frame"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="features sec" id="features">
          <h2 className="text-center title" data-aos="fade-up">
            {t("features.title")}
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <div className="feature-card" data-aos="fade-up">
                  <div className="icon">
                    <img src="images/traking.svg" alt="icon" />
                  </div>
                  <h4>{t("features.f1Title")}</h4>
                  <p>{t("features.f1Text")}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <div className="feature-card" data-aos="fade-up">
                  <div className="icon">
                    <img src="images/reports.svg" alt="icon" />
                  </div>
                  <h4>{t("features.f2Title")}</h4>
                  <p>{t("features.f2Text")}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <div className="feature-card" data-aos="fade-up">
                  <div className="icon">
                    <img src="images/security.svg" alt="icon" />
                  </div>
                  <h4>{t("features.f3Title")}</h4>
                  <p>{t("features.f3Text")}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <div className="feature-card" data-aos="fade-up">
                  <div className="icon">
                    <img src="images/support.svg" alt="icon" />
                  </div>
                  <h4>{t("features.f4Title")}</h4>
                  <p>{t("features.f4Text")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="download-app sec" id="downloadApp">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-12 d-flex justify-content-center flex-column">
                <h3>
                  {t("downloadApp")} <br /> {t("downloadApp2")}
                </h3>
                <p>{t("downloadAppSub")}</p>
                <div className="btns">
                  <a href="#!">
                    <img src="images/app-store.svg" alt="google-play" />
                  </a>
                  <a href="#!">
                    <img src="images/google-play.svg" alt="app-store" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-12 app-imgs">
                <div className="img">
                  <img src="images/downloadMoukup.svg" alt="mockup" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterLanding />
    </>
  );
}
