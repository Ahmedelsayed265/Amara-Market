import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionsSlider from "../components/products/SectionsSlider";
import useGetSections from "../hooks/sections-products/useGetSections";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";
import AddSectionModal from "../ui/modals/AddSectionModal";
import AddProductModal from "../ui/modals/AddProductModal";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [sectionId, setSectionId] = useState(null);
  const { data: sections, isLoading } = useGetSections();
  const [showModal, setShowModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    setSectionId(id || sections?.[0]?.id || null);
  }, [searchParams, sections]);

  return (
    <>
      <PageHeader title="المنتجات" />
      <section className="products_section">
        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="container">
            <div className="row m-0">
              <div className="col-12 p-2 mb-2">
                <div className="section_header">
                  <h6>الأقسام</h6>
                  <button onClick={() => setShowModal(true)}>
                    <i className="fa-regular fa-plus"></i> اضافة قسم
                  </button>
                </div>
              </div>

              <div className="col-12 p-2 mb-5">
                <SectionsSlider sections={sections} sectionId={sectionId} />
              </div>

              <div className="col-12 p-2 mb-2">
                <div className="section_header">
                  <h6>
                    منتجات قسم{" "}
                    <span>
                      {sections?.find((s) => s.id === Number(sectionId))?.title}
                    </span>
                  </h6>
                  <button onClick={() => setShowAddProductModal(true)}>
                    <i className="fa-regular fa-plus"></i> اضافة منتج
                  </button>
                </div>
              </div>

              {sections
                ?.find((s) => s.id === Number(sectionId))
                ?.products?.map((p) => (
                  <div className="col-lg-2 col-md-6 p-2 mb-2" key={p.id}>
                    <div className="product_card">
                      <div className="img">
                        <img src={p?.image} alt={p?.title} />
                      </div>
                      <div className="content">
                        <h6>{p?.title}</h6>
                        {p?.offer_price ? (
                          <p>
                            {p?.offer_price} ر.س <span>{p?.price} ر.س</span>
                          </p>
                        ) : (
                          <p>{p?.price} ر.س</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <AddSectionModal showModal={showModal} setShowModal={setShowModal} />
        <AddProductModal
          showModal={showAddProductModal}
          setShowModal={setShowAddProductModal}
          id={sectionId}
        />
      </section>
    </>
  );
}
