import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import PageHeader from "../ui/Layout/PageHeader";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);

  const [formData, setFormData] = useState({
    title: "",
    email: "",
    message: "",
  });

  function highlight(e) {
    e.target.previousElementSibling.classList.add("h");
  }

  function dehighlight(e) {
    if (e.target.value === "") {
      e.target.previousElementSibling.classList.remove("h");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/contact_us", {
        ...formData,
        user_id: user?.id,
        type: "market",
      });
      if (res.data.code === 200) {
        toast.success(t("messageSentSuccessfully"));
        setFormData({
          title: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message || t("somethingWentWrong"));
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={t("contactUs")} />
      <section className="contact_section">
        <div className="container">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-8 p-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="title">{t("subject")}</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                    <span className="highlight"></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="email">{t("email")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    />
                    <span className="highlight"></span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="message" className="message-label">
                      {t("message")}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                    ></textarea>
                    <span className="highlight"></span>
                  </div>
                </div>

                <button type="submit" className="customBtn" disabled={loading}>
                  {t("send")}{" "}
                  {loading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
