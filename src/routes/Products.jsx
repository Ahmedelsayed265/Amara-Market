import { useState } from "react";
import SectionsSlider from "../components/products/SectionsSlider";
import useGetSections from "../hooks/sections-products/useGetSections";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";
import AddSectionModal from "../ui/modals/AddSectionModal";

export default function Products() {
  const { data: sections, isLoading } = useGetSections();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <PageHeader title="المنتجات" />
      <section className="products_section">
        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="container">
            <div className="row m-0">
              <div className="col-12 p-2">
                <div className="section_header">
                  <h6>الأقسام</h6>
                  <button onClick={() => setShowModal(true)}>
                    <i className="fa-regular fa-plus"></i> اضافة قسم
                  </button>
                </div>
              </div>
              <div className="col-12 p-2">
                <SectionsSlider sections={sections} />
              </div>
            </div>
          </div>
        )}
        <AddSectionModal showModal={showModal} setShowModal={setShowModal} />
      </section>
    </>
  );
}
