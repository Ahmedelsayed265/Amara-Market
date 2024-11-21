import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { useSelector } from "react-redux";
import LandingHeader from "../ui/Layout/LandingHeader";
import "swiper/swiper-bundle.css";
import FooterLanding from "../ui/Layout/FooterLanding";
import { Link } from "react-router-dom";

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
                    <a href="https://apps.apple.com/us/app/amara-%D8%B9%D9%85%D8%A7%D8%B1%D8%A9/id6504358027">
                      <img src="/images/Apple Store.png" alt="" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.itqan.serviceprovider">
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
                  <h2 data-aos="fade-up">{t("about.title1")}</h2>
                  <p data-aos="fade-up">{t("about.text1")}</p>
                  <Link to="/login" className="loginLink">
                    {t("joinUs")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works-section sec" id="how-it-works">
          <h4 className="title" data-aos="fade-up">
            {t("enjoy_experience")}{" "}
          </h4>
          <p className="subtitle" data-aos="fade-up">
            {t("app_description")}{" "}
          </p>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center">
                <div className="row">
                  <div className="col-12">
                    <div className="h-card" data-aos="fade-up">
                      <div className="icon">
                        <img src="images/add.svg" alt="icon" />
                      </div>
                      <div className="text">
                        <h5>{t("add_services")}</h5>
                        <p>{t("add_services_description")}</p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="h-card" data-aos="fade-up">
                      <div className="icon">
                        <img src="images/order-track.svg" alt="icon" />
                      </div>
                      <div className="text">
                        <h5>{t("manage_orders")}</h5>
                        <p>{t("manage_orders_description")}</p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="h-card" data-aos="fade-up">
                      <div className="icon">
                        <img src="images/rate.svg" alt="icon" />
                      </div>
                      <div className="text">
                        <h5>{t("rate_experience")}</h5>{" "}
                        <p>{t("rate_experience_description")}</p>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-12">
                <div className="mockup">
                  <img src="/images/Home.svg" alt="mockup" data-aos="fade-up" />
                </div>
              </div>

              <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center">
                <div className="row">
                  <div className="col-12">
                    <div className="h-card left" data-aos="fade-up">
                      <div className="icon">
                        <img src="images/storee.svg" alt="users" />
                      </div>
                      <div className="text">
                        <h5>{t("add_store_products")}</h5>{" "}
                        <p>{t("store_products_description")}</p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="h-card left" data-aos="fade-up">
                      <div className="icon">
                        <img src="images/order-track-2.svg" alt="icon" />
                      </div>
                      <div className="text">
                        <h5>{t("track_orders")}</h5> 
                        <p>{t("track_orders_description")}</p>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="h-card left" data-aos="fade-up">
                      <div className="icon">
                        <img src="images/reports.svg" alt="icon" />
                      </div>
                      <div className="text">
                        <h5>{t("view_reports")}</h5> 
                        <p>{t("view_reports_description")}</p>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about_section sec" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-12 p-2">
                <div className="content">
                  <h2 data-aos="fade-up">{t("about.title2")}</h2>
                  <p data-aos="fade-up">{t("about.text2")}</p>

                  <div className="download_btns" data-aos="fade-up">
                    <a href="https://apps.apple.com/eg/app/%D8%B9%D9%85%D8%A7%D8%B1%D8%A9-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA/id6504286396?l=ar">
                      <img src="/images/Apple Store.png" alt="" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.itqan.serviceprovider">
                      <img src="/images/Play Sotre.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-12 p-2 d-flex align-items-center justify-content-center imgs-wrap">
                <div
                  className="circle"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  <img className="legend" src="images/legend.svg" alt="" />
                  <img className="img1" src="images/mq4.svg" alt="mouckup4" />
                  <img className="img2" src="images/mq3.svg" alt="mouckup5" />
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
                      loop={true}
                      speed={1000}
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      rtl={lang === "ar"}
                      key={lang}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
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
          <p className="text-center subtitle" data-aos="fade-up">
            {t("features.text")}
          </p>
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
                <h3 data-aos="fade-up">
                  {t("downloadApp")} <br /> {t("downloadApp2")}
                </h3>
                <p data-aos="fade-up">{t("downloadAppSub")}</p>
                <div className="btns" data-aos="fade-up">
                  <a href="https://apps.apple.com/us/app/amara-%D8%B9%D9%85%D8%A7%D8%B1%D8%A9/id6504358027">
                    <img src="images/app-store.svg" alt="google-play" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.itqan.serviceprovider">
                    <img src="images/google-play.svg" alt="app-store" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-12 app-imgs">
                <div className="img" data-aos="zoom-in-up">
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
