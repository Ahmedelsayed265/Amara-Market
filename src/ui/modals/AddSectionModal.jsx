import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function AddSectionModal({ showModal, setShowModal }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/create_section", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success("تم اضافة قسم بنجاح");
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      } else {
        throw new Error(res.data.message || "فشل إضافة القسم");
      }
    } catch (error) {
      console.error("Error in adding section:", error);
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
            <label>صورة القسم</label>
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
            label="اسم القسم"
            name="title"
            id="title"
            required
            placeholder="اسم القسم"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <SubmitButton name="اضافة" loading={loading} />
        </form>
      </Modal.Body>
    </Modal>
  );
}
