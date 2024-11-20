import { useState } from "react";
import RegisterForm from "../components/register/RegisterForm";
import ConfirmOtp from "../components/register/ConfirmOtp";

export default function Register() {
  const [step, setStep] = useState(1);
  const [otpData, setOtpData] = useState({
    hashed_code: "",
    code: "",
  });

  const [formData, setFormData] = useState({
    logo: "",
    image: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    description: "",
    address: "",
    lat: 24.7136,
    lng: 46.6753,
    city_id: "",
    categories: [],
    token: 123,
    delivery_price: "",
  });

  return (
    <>
      <section className="auth login_section">
        <div className="img_div">
          <img src="/images/login.png" alt="" />
        </div>
        <div className="login_form">
          <div className="form_container">
            {step === 1 ? (
              <RegisterForm
                setStep={setStep}
                formData={formData}
                setFormData={setFormData}
                setOtpData={setOtpData}
              />
            ) : (
              <ConfirmOtp
                otpData={otpData}
                setOtpData={setOtpData}
                formData={formData}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
