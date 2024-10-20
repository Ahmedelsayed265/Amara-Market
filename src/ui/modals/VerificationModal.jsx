import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import SubmitButton from "./../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function VerificationModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
  });

  const handleAttachments = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesArray],
    }));
  };

  const removeFile = (index) => {
    setFormData((prevState) => {
      const updatedFiles = prevState.images.filter((_, i) => i !== index);
      return {
        images: updatedFiles,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/market/verify_market", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code === 200) {
        setShowModal(false);
        toast.success(t("verificationSuccess"));
        queryClient.invalidateQueries({ queryKey: ["authed-user"] });
      }
    } catch (error) {
      console.error("Error during change status:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      centered
    >
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("verificationTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <p className="verificationText">
                {t("verificationTextRequirement")}
              </p>
            </div>

            <div className="col-12 p-2">
              <label className="upload_attachments">
                <div className="icon">
                  <img src="/images/img-upload.svg" alt="icon" />
                </div>
                <div className="content">
                  <h6>{t("addattachments")}</h6>
                </div>
                <input
                  type="file"
                  name="project_files"
                  id="project_files"
                  multiple
                  onChange={handleAttachments}
                />
              </label>
            </div>
            {formData?.images?.length > 0 && (
              <div className="col-12 p-2">
                <div className="attachments">
                  {formData?.images?.map((file, index) => (
                    <div className="attachment" key={index}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon">
                          <img
                            src={
                              file?.type?.startsWith("image/")
                                ? URL.createObjectURL(file)
                                : "/images/doc.svg"
                            }
                            alt="icon"
                          />
                        </div>
                        <div className="content">
                          <h6>
                            {file?.file ? <p>{file?.file}</p> : file?.name}
                          </h6>
                          <p>
                            {file?.file_size
                              ? file?.file_size?.toFixed(2)
                              : (file.size / 1024).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      </div>
                      <div className="delete" onClick={() => removeFile(index)}>
                        <i className="fa-regular fa-trash-can"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="col-12 p-2">
              <SubmitButton loading={loading} name={t("verifyNow")} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
