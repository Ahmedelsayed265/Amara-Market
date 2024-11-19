import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PasswordField from "../../ui/form-elements/PasswordField";
import axiosInstance from "../../utils/axiosInstance";

function ForgetPassStep3({ formData, setFormData, setStep }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/market/update_password", {
        password: formData.password,
        id: formData.user_id,
      });
      if (res.data.code === 200) {
        toast.success(t("passwordUpdated"));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp_form_container">
      <div className="header">
        <img src="/images/new-pass.svg" alt="" />
        <h4>{t("forgetPasswordTitle3")}</h4>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <PasswordField
          label={t("password")}
          placeholder={t("enterPassword")}
          id="password"
          name="password"
          required
          icon={<i className="fa-regular fa-lock"></i>}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <PasswordField
          label={t("confirmPassword")}
          placeholder={t("enterPassword")}
          id="password"
          name="password"
          required
          icon={<i className="fa-regular fa-lock"></i>}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="d-flex align-items-center gap-2 w-100">
          <div onClick={() => setStep(1)} className="backBtn">
            <i className="fa-light fa-arrow-left"></i>
          </div>
          <SubmitButton name={t("confirm")} loading={loading} />
        </div>
      </form>
    </div>
  );
}

export default ForgetPassStep3;
