import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { setIsLogged, setUser } from "../../redux/slices/authedUser";
import { convertTo12Hour } from "../../utils/helper";
import OtpContainer from "../../ui/form-elements/OtpContainer";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

function ConfirmOtp({ formData, setOtpData, otpData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [, setCookies] = useCookies(["token", "id"]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
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
      const res = await axiosInstance.post("/market/can_register", {
        phone: formData.phone,
        email: formData.email,
      });
      if (res.data.code === 200) {
        setTimer(60);
        toast.success(t("otpSentSuccessfully"));
        setOtpData((prev) => ({
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
      const checkCodeResponse = await axiosInstance.post(
        "/market/check_code",
        otpData
      );

      if (checkCodeResponse.data.code !== 200) {
        toast.error(t("otpCheckFailed"));
        return;
      }

      const payload = {
        logo: formData.logo,
        image: formData.image,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        description: formData.description,
        address: formData.address,
        lat: formData.lat,
        lng: formData.lng,
        city_id: formData.city_id,
        categories: formData.categories,
        delivery_price: formData.delivery_price,
        work_hours:
          convertTo12Hour(formData.from_time) +
          " - " +
          convertTo12Hour(formData.to_time),
      };

      const registerResponse = await axiosInstance.post(
        "/market/register",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (registerResponse.data.code !== 200) {
        toast.error(t("registerFailed"));
        return;
      }

      const loginResponse = await axiosInstance.post("/market/login", {
        phone: formData.phone,
        password: formData.password,
      });

      if (loginResponse.data.code === 200) {
        toast.success(t("registerSuccessfully"));

        dispatch(setUser(loginResponse.data.data));
        dispatch(setIsLogged(true));

        setCookies("token", loginResponse.data.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        setCookies("id", loginResponse.data.data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        navigate("/");
      } else {
        toast.error(loginResponse.data.message);
      }
    } catch (error) {
      console.error("Error during registration process:", error);
      toast.error(t("registerProcessFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-6 col-12 p-2">
      <div className="otp_form_container">
        <div className="header">
          <img src="/images/OTP.svg" alt="" />
          <h4>
            {t("confirmOtp")} <span>+{formData.phone}</span>
          </h4>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <OtpContainer formData={otpData} setFormData={setOtpData} />
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
    </div>
  );
}

export default ConfirmOtp;
