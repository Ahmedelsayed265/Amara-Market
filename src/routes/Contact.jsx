import { useTranslation } from "react-i18next";
import PageHeader from "../ui/Layout/PageHeader";
import ContactForm from "../ui/Layout/ContactForm";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t("contactUs")} />
      <section className="contact_section">
        <div className="container">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-8 p-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
