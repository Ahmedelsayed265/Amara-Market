import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneField from "../ui/form-elements/PhoneField";
import PageHeader from "../ui/Layout/PageHeader";
import PasswordField from "../ui/form-elements/PasswordField";
import SubmitButton from "../ui/form-elements/SubmitButton";

export default function Login() {
  const [formData, setFormData] = useState({
    token: 123,
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageHeader title={"تسجيل الدخول"} />
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center m-0">
            <div className="col-lg-8 col-12 p-2 mb-4">
              <h2 className="auth-head">تسجيل الدخول</h2>
              <p className="auth-subhead">
                اهلا بك ...! ادخل بياناتك المسجلة لإتمام عملية الدخول
              </p>
            </div>
            <div className="col-lg-8 col-12">
              <form className="form">
                <PhoneField
                  label="رقم الهاتف"
                  value={formData.phone}
                  icon={<i className="fa-light fa-phone"></i>}
                  placeholder="5xxxxxxxxx"
                  maxLength={9}
                  id="phone"
                  name="phone"
                  required
                  onChange={handleChange}
                />
                <PasswordField
                  label={"كلمة المرور"}
                  placeholder="ادخل كلمة المرور"
                  id="password"
                  name="password"
                  required
                  icon={<i className="fa-light fa-lock"></i>}
                  value={formData.password}
                  onChange={handleChange}
                />
                <Link to="/forget-password" className="forgetpass">
                  نسيت كلمة المرور؟
                </Link>
                <SubmitButton name={"تسجيل الدخول"} />
                <p className="noAccount">
                  ليس لديك حساب؟ <Link to="/register">انشاء حساب</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
