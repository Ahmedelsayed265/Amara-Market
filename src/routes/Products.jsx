import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SectionsSlider from "../components/products/SectionsSlider";
import useGetSections from "../hooks/sections-products/useGetSections";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";
import AddSectionModal from "../ui/modals/AddSectionModal";
import AddProductModal from "../ui/modals/AddProductModal";
import ProductCard from "../ui/ProductCard";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import axiosInstance from "../utils/axiosInstance";

export default function Products() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [targetSection, setTargetSection] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const { data: sections, isLoading } = useGetSections();

  useEffect(() => {
    const id = searchParams.get("id");
    setSectionId(id || sections?.[0]?.id || null);
  }, [searchParams, sections]);

  const deleteSection = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/delete_section", {
        id: sectionId,
      });
      if (res.data?.code === 200) {
        toast.success("تم حذف القسم بنجاح");
        setShowConfirmationModal(false);
        searchParams.delete("id");
        setSearchParams(searchParams);
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="outline"
                      onClick={() => {
                        setShowModal(true);
                        setTargetSection(
                          sections?.find((s) => s.id === Number(sectionId))
                        );
                      }}
                    >
                      تعديل القسم
                    </button>

                    <button
                      className="outline"
                      onClick={() => setShowConfirmationModal(true)}
                    >
                      حذف القسم
                    </button>

                    <button onClick={() => setShowAddProductModal(true)}>
                      <i className="fa-regular fa-plus"></i> اضافة منتج
                    </button>
                  </div>
                </div>
              </div>

              {sections
                ?.find((s) => s.id === Number(sectionId))
                ?.products?.map((p) => (
                  <div className="col-lg-2 col-md-6 p-2 mb-2" key={p.id}>
                    <ProductCard p={p} />
                  </div>
                ))}
            </div>
          </div>
        )}
        <AddSectionModal
          showModal={showModal}
          setShowModal={setShowModal}
          setTargetSection={setTargetSection}
          targetSection={targetSection}
        />
        <AddProductModal
          showModal={showAddProductModal}
          setShowModal={setShowAddProductModal}
          id={sectionId}
        />
        <ConfirmationModal
          showModal={showConfirmationModal}
          setShowModal={setShowConfirmationModal}
          buttonText={"حذف"}
          text={"هل تريد حذف قسم"}
          type={"delete"}
          eventFun={deleteSection}
          loading={loading}
          target={sections?.find((s) => s.id === Number(sectionId))?.title}
        />
      </section>
    </>
  );
}
