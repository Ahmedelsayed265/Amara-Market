import { useTranslation } from "react-i18next";
import useGetSettings from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";

export default function Privacy() {
  const { t } = useTranslation();
  const { data: settings, isLoading } = useGetSettings();
  return (
    <>
      <PageHeader title={t("privacyPolicy")} />
      <section className="page_content">
        <div className="container">
          {isLoading ? (
            <DataLoader />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: settings?.privacy }}></div>
          )}
        </div>
      </section>
    </>
  );
}
