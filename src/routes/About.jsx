import { useTranslation } from "react-i18next";
import useGetSettings from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";

export default function About() {
  const { data: settings, isLoading } = useGetSettings();
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title={t("about")} />
      <section className="page_content">
        <div className="container">
          {isLoading ? (
            <DataLoader />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: settings?.about }}></div>
          )}
        </div>
      </section>
    </>
  );
}
