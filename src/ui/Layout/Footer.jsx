import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="container">
      <div className="inner_footer">
        <h6>
          {t("allRights")} <Link to="/">{t("amara")}</Link>{" "}
          <span> © {new Date().getFullYear()}.</span>
        </h6>
        <div className="links">
          <Link to="terms">{t("termsConditions")}</Link>
          <Link to="privacy">{t("privacyPolicy")}</Link>
          <Link to="contact">{t("contactUs")}</Link>
        </div>
      </div>
    </footer>
  );
}
