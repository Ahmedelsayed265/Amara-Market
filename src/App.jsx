import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import i18n from "./utils/i18n";
import useAuth from "./hooks/useAuth";
import Login from "./routes/Login";
import Dashboard from "./Dashboard";
import Register from "./routes/Register";
import ForgetPassword from "./routes/ForgetPassword";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const { loading } = useAuth();
  const lang = useSelector((state) => state.language.lang);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => AOS.refresh(), 100);
  }, [location]);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionDivs = section.querySelectorAll("[data-aos]");
      sectionDivs.forEach((div, index) => {
        div.setAttribute("data-aos-delay", (index + 1) * 100);
      });
    });

    AOS.init({
      offset: 20,
      delay: 50,
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return loading ? null : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/*" element={<Dashboard loading={loading} />} />
    </Routes>
  );
}

export default App;
