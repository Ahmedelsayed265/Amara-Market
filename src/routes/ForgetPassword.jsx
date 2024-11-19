import { useState } from "react";
import ForgetPassStep1 from "../components/forget-password/ForgetPassStep1";
import ForgetPassStep2 from "../components/forget-password/ForgetPassStep2";
import ForgetPassStep3 from "../components/forget-password/ForgetPassStep3";

export default function ForgetPassword() {
  const [step, setStep] = useState(3);
  const [formData, setFormData] = useState({
    phone: "",
  });
  return (
    <>
      <section className="auth login_section">
        <div className="img_div">
          <img src="/images/login.png" alt="" />
        </div>
        <div className="login_form">
          <div className="form_container">
            {step === 1 && (
              <ForgetPassStep1
                setStep={setStep}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 2 && (
              <ForgetPassStep2
                setStep={setStep}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 3 && (
              <ForgetPassStep3
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
