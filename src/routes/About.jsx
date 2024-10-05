import useGetSettings from "../hooks/settings/useGetSettings";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";

export default function About() {
  const { data: settings, isLoading } = useGetSettings();
  return (
    <>
      <PageHeader title="من نحن" />
      <section className="page_content">
        <div className="container">
          {isLoading ? (
            <DataLoader />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: settings?.about_ar }}></div>
          )}
        </div>
      </section>
    </>
  );
}
