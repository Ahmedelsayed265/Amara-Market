import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import PhoneField from "../../ui/form-elements/PhoneField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

function ForgetPassStep1({ formData, setFormData, setStep }) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/check_phone", formData);
      if (res.data.code === 200) {
        toast.success(t("otpSentSuccessfully"));
        setFormData((prev) => ({
          ...prev,
          hashed_code: res.data?.data?.code,
          user_id: res.data?.data?.user?.id,
        }));
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp_form_container">
      <div className="header">
        <img src="/images/reset1.svg" alt="" />
        <h4>{t("forgetPasswordTitle1")}</h4>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <PhoneField
          label={t("phoneNumber")}
          icon={<i className="fa-light fa-phone"></i>}
          placeholder="5xxxxxxxxx"
          maxLength={9}
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <div className="d-flex align-items-center gap-2 w-100">
          <Link to="/login" className="backBtn">
            <i className="fa-light fa-arrow-left"></i>
          </Link>
          <SubmitButton name={t("send")} loading={loading} />
        </div>
      </form>
    </div>
  );
}

export default ForgetPassStep1;
