import { useState } from "react";
import PageHeader from "../ui/Layout/PageHeader";
import ForgetPassStep1 from "../components/forget-password/ForgetPassStep1";
import ForgetPassStep2 from "../components/forget-password/ForgetPassStep2";
import ForgetPassStep3 from "../components/forget-password/ForgetPassStep3";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
  });
  return (
    <>
      <PageHeader title="إستعادة الحساب" />
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center m-0">
            <div className="col-lg-6 col-12 p-2">
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
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
