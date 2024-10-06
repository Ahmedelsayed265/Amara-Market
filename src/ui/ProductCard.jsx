import { useState } from "react";
import ConfirmationModal from "./modals/ConfirmationModal";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import AddProductModal from "./modals/AddProductModal";

function ProductCard({ p }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/delete_product", {
        id: p?.id,
      });
      if (res.data?.code === 200) {
        toast.success("تم حذف المنتج بنجاح");
        setShowConfirmationModal(false);
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
    <div className="product_card">
      <div className="img">
        <img src={p?.image} alt={p?.title} />
        <div className="btns">
          <button
            className="delete"
            onClick={() => setShowConfirmationModal(true)}
          >
            <i className="fa-regular fa-trash"></i>
          </button>
          <button className="edit" onClick={() => setShowAddProductModal(true)}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
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
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        buttonText={"حذف"}
        text={"هل تريد حذف منتج"}
        type={"delete"}
        eventFun={deleteProduct}
        loading={loading}
        target={p?.title}
      />
      <AddProductModal
        showModal={showAddProductModal}
        setShowModal={setShowAddProductModal}
        product={p}
      />
    </div>
  );
}

export default ProductCard;
