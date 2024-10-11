import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import OtpContainer from "../../ui/form-elements/OtpContainer";
import axiosInstance from "../../utils/axiosInstance";
import SubmitButton from "../../ui/form-elements/SubmitButton";

function ForgetPassStep2({ formData, setFormData, setStep }) {
  const [timer, setTimer] = useState(60);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendDisabled(true);

    try {
      const res = await axiosInstance.post("/market/check_phone", {
        phone: formData.phone,
      });
      if (res.data.code === 200) {
        setTimer(60);
        toast.success(t("otpSentSuccessfully"));
        setFormData((prev) => ({
          ...prev,
          hashed_code: res.data.data,
        }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forget password error:", error);
      throw new Error(error.message);
    } finally {
      setResendDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/check_code", {
        hashed_code: formData.hashed_code,
        code: formData.code,
      });
      if (res.data.code === 200) {
        setStep(3);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("check otp error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp_form_container">
      <div className="header">
        <img src="/images/OTP.svg" alt="" />
        <h4>
          {t("forgetPasswordTitle2")} <span>+{formData.phone}</span>
        </h4>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <OtpContainer formData={formData} setFormData={setFormData} />
        <div className="resend-code">
          <span
            className={`resend_link ${resendDisabled ? "disabled" : ""}`}
            onClick={handleResend}
          >
            {t("resendCode")}
          </span>
          <div
            className="timer flex-row-reverse"
            style={{ justifyContent: "end !important" }}
          >
            <span>
              {Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}
            </span>
            :<span>{(timer % 60).toString().padStart(2, "0")}</span>
          </div>
        </div>
        <SubmitButton name={t("confirm")} loading={loading} />
      </form>
    </div>
  );
}

export default ForgetPassStep2;
