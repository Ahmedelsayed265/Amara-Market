import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setIsLogged, setUser } from "../redux/slices/authedUser";
import { useTranslation } from "react-i18next";
import PhoneField from "../ui/form-elements/PhoneField";
import PageHeader from "../ui/Layout/PageHeader";
import PasswordField from "../ui/form-elements/PasswordField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axiosInstance from "../utils/axiosInstance";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [, setCookie] = useCookies(["token", "id"]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/login", formData);
      if (res.data?.code === 200) {
        toast.success(t("loginSuccess"));
        dispatch(setUser(res.data.data));
        dispatch(setIsLogged(true));
        navigate("/");
        setCookie("token", res.data.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setCookie("id", res.data.data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
      } else {
        toast.error(t("loginError"));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={t("login")} />
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center m-0">
            <div className="col-lg-8 col-12 p-2 mb-4">
              <h2 className="auth-head">{t("login")}</h2>
              <p className="auth-subhead">{t("loginSubTitle")}</p>
            </div>
            <div className="col-lg-8 col-12">
              <form className="form" onSubmit={handleSubmit}>
                <PhoneField
                  label={t("phoneNumber")}
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
                  label={t("password")}
                  placeholder={t("enterPassword")}
                  id="password"
                  name="password"
                  required
                  icon={<i className="fa-light fa-lock"></i>}
                  value={formData.password}
                  onChange={handleChange}
                />
                <Link to="/forget-password" className="forgetpass">
                  {t("forgetPassword")}
                </Link>
                <SubmitButton loading={loading} name={t("login")} />
                <p className="noAccount">
                  {t("don'tHaveAccount")}{" "}
                  <Link to="/register">{t("register")}</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
