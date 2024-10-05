import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function AddProductModal({ showModal, setShowModal, id }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    price: "",
    offer_price: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/market/create_product",
        { ...formData, section_id: id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.code === 200) {
        toast.success("تم اضافة المنتج بنجاح");
        handleClose();
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      } else {
        throw new Error(res.data.message || "فشل إضافة المنتج");
      }
    } catch (error) {
      console.error("Error in adding product:", error);
      toast.error(
        error.response?.data?.message || "حدث خطأ ما، حاول مرة أخرى."
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);

    setFormData({
      title: "",
      image: null,
      price: "",
      offer_price: "",
      description: "",
      section_id: id,
    });
  };

  return (
    <Modal centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>إضافة قسم</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label>صورة المنتج</label>
            <label htmlFor="image" className="upload_image">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
              <div className="upload_image_wrap">
                {formData.image ? (
                  <img src={URL.createObjectURL(formData.image)} alt="upload" />
                ) : (
                  <div className="icon">
                    <img src="/images/gallery.svg" alt="upload" />
                  </div>
                )}
              </div>
            </label>
          </div>

          <InputField
            label="اسم المنتج"
            name="title"
            id="title"
            required
            placeholder="اسم المنتج"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <div className="form_group">
            <InputField
              label="السعر"
              name="price"
              id="price"
              required
              type="number"
              placeholder="00"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <InputField
              label="السعر بعد الخصم"
              hint={"(اختياري)"}
              name="offer_price"
              id="offer_price"
              type="number"
              placeholder="00"
              value={formData.offer_price}
              onChange={(e) =>
                setFormData({ ...formData, offer_price: e.target.value })
              }
            />
          </div>

          <InputField
            label="وصف المنتج"
            name="description"
            id="description"
            as={"textarea"}
            placeholder="وصف المنتج"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <SubmitButton name="اضافة" loading={loading} />
        </form>
      </Modal.Body>
    </Modal>
  );
}
