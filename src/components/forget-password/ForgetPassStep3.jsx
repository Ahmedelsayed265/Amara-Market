import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PasswordField from "../../ui/form-elements/PasswordField";
import axiosInstance from "../../utils/axiosInstance";

function ForgetPassStep3({ formData, setFormData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== confirmPassword) {
      toast.error("كلمة المرور غير متطابقة");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/market/update_password", {
        password: formData.password,
      });
      if (res.data.code === 200) {
        toast.success("تم تغيير كلمة المرور بنجاح");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp_form_container">
      <div className="header">
        <img src="/images/new-pass.svg" alt="" />
        <h4>
          ادخل كلمة السر الجديدة واحرص ان تكون قوية ويسهل تذكرها ولا تقل عن 6
          خانات
        </h4>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <PasswordField
          label={"كلمة المرور"}
          placeholder="ادخل كلمة المرور"
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
          label="تأكيد كلمة المرور"
          placeholder="ادخل كلمة المرور"
          id="password"
          name="password"
          required
          icon={<i className="fa-regular fa-lock"></i>}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SubmitButton name="تأكيد" loading={loading} />
      </form>
    </div>
  );
}

export default ForgetPassStep3;
