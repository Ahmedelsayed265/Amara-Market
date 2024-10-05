import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function AddSectionModal({
  showModal,
  setShowModal,
  targetSection,
}) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  useEffect(() => {
    if (targetSection) {
      setFormData({
        title: targetSection.title,
        image: targetSection.image,
        id: targetSection.id,
      });
    }
  }, [targetSection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
    };
    if (typeof formData.image === "object") {
      payload.image = formData.image;
    }
    if (formData.id) {
      payload.id = formData.id;
    }

    try {
      const res = await axiosInstance.post(
        formData.id ? "/market/update_section" : "/market/create_section",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success(
          formData.id ? "تم تحديث القسم بنجاح" : "تم اضافة قسم بنجاح"
        );
        handleClose();
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      } else {
        throw new Error(
          res.data.message || formData.id ? "فشل التحديث" : "فشل الاضافة"
        );
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
                  typeof formData.image === "string" ? (
                    <img src={formData.image} alt="upload" />
                  ) : formData.image instanceof File &&
                    formData.image.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="upload"
                    />
                  ) : (
                    <div className="icon">
                      <img src="/images/gallery.svg" alt="upload" />
                    </div>
                  )
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
