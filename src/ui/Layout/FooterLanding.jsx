import { useTranslation } from "react-i18next";

export default function FooterLanding() {
  const { t } = useTranslation();
  return (
    <footer className="footerLanding">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 p-3 px-lg-4">
            <img
              loading="lazy"
              src="images/logo.png"
              className="logo"
              alt="logo"
            />
            <p className="info">{t("downloadAppSub")}</p>
          </div>
          <div className="col col-lg-4 p-3 px-lg-4">
            <div className="group">
              <h5 className="title">{t("importantLinks")} </h5>
              <ul>
                <li>
                  <a href="#about"> {t("aboutUs")} </a>
                </li>
                <li>
                  <a href="#!"> {t("termsConditions")} </a>
                </li>
                <li>
                  <a href="#!"> {t("privacyPolicy")} </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-lg-4 p-3 px-lg-4">
            <div className="group">
              <h5 className="title"> {t("socialMedia")} </h5>
              <div className="social">
                <a href="#!" target="_blank">
                  <span className="icon">
                    <img
                      loading="lazy"
                      src="images/facebook.svg"
                      alt="facebook"
                    />
                  </span>
                  Facebook
                </a>
                <a href="#!" target="_blank">
                  <span className="icon">
                    <img
                      loading="lazy"
                      src="images/instagram.svg"
                      alt="instagram"
                    />
                  </span>
                  Instagram
                </a>
                <a href="#!" target="_blank">
                  <span className="icon">
                    <img loading="lazy" src="images/X.svg" alt="X" />
                  </span>
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="copywriting">
          <p className="hint">
            {t("rights")}{" "}
            <a href="#!" target="_blank">
              {t("amara")}{" "}
            </a>{" "}
            ©{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
