import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import InputField from "../form-elements/InputField";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function AddProductModal({
  showModal,
  setShowModal,
  id,
  product,
}) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    price: "",
    offer_price: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product?.id,
        title: product?.title,
        image: product?.image,
        price: product?.price,
        offer_price: product?.offer_price,
        description: product?.description,
      });
    }
  }, [product, showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: formData.id,
      title: formData.title,
      price: formData.price,
      offer_price: formData.offer_price,
      description: formData.description,
      section_id: product?.section_id || id,
    };

    if (typeof formData.image === "object") {
      payload.image = formData.image;
    }

    try {
      const res = await axiosInstance.post(
        product?.id ? "/market/update_product" : "/market/create_product",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.code === 200) {
        toast.success(product?.id ? t("productUpdated") : t("productAdded"));
        handleClose();
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      } else {
        throw new Error(
          res.data.message || product?.id
            ? t("productUpdateFailed")
            : t("productAddFailed")
        );
      }
    } catch (error) {
      console.error("Error in adding product:", error);
      toast.error(error.response?.data?.message || t("somethingWentWrong"));
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
        <Modal.Title>
          {product?.id ? t("editProduct") : t("addProduct")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label>{t("productImage")}</label>
            <label htmlFor="image" className="upload_image">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required={!product?.id}
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
            label={t("productName")}
            name="title"
            id="title"
            required
            placeholder={t("productName")}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <div className="form_group">
            <InputField
              label={t("price")}
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
              label={t("priceAfterDiscount")}
              hint={`( ${t("optional")} )`}
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
            label={t("productDescription")}
            name="description"
            id="description"
            as={"textarea"}
            placeholder={t("productDescription")}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <SubmitButton
            name={product?.id ? t("editProduct") : t("addProduct")}
            loading={loading}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
