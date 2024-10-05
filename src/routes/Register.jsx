import { useState } from "react";
import PageHeader from "../ui/Layout/PageHeader";
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
  });

  return (
    <>
      <PageHeader title="إنشاء حساب" />
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center m-0">
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
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
