import { useState } from "react";
import PageHeader from "../ui/Layout/PageHeader";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      const res = await axiosInstance.post("/contact_us", formData);
      if (res.data.code === 200) {
        toast.success("تم الارسال بنجاح");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message || "حدث خطأ ما");
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="اتصل بنا" />
      <section className="contact_section">
        <div className="container">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-8 p-2">
             
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="inputfield">
                    <label htmlFor="name">الإسم</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onFocus={(e) => highlight(e)}
                      onBlur={(e) => dehighlight(e)}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <span className="highlight"></span>
                  </div>

                  <div className="inputfield">
                    <label htmlFor="email">البريد الالكتروني</label>
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
                    <label htmlFor="phone">رقم الهاتف</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
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
                      الرسالة
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
                  ارسال {loading && <i className="fa fa-spinner fa-spin"></i>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
