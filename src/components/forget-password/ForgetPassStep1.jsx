import { useState } from "react";
import { toast } from "react-toastify";
import PhoneField from "../../ui/form-elements/PhoneField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

function ForgetPassStep1({ formData, setFormData, setStep }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/check_phone", formData);
      if (res.data.code === 200) {
        toast.success("تم ارسال رمز التحقق");
        setFormData((prev) => ({ ...prev, hashed_code: res.data.data }));
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp_form_container">
      <div className="header">
        <img src="/images/reset1.svg" alt="" />
        <h4>ادخل رقم الجوال المسجل في الحساب ل استعاده كلمه السر</h4>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <PhoneField
          label="رقم الهاتف"
          icon={<i className="fa-light fa-phone"></i>}
          placeholder="5xxxxxxxxx"
          maxLength={9}
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <SubmitButton name="إرسال" loading={loading} />
      </form>
    </div>
  );
}

export default ForgetPassStep1;
