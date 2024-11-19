import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import i18n from "./utils/i18n";
import useAuth from "./hooks/useAuth";
import Login from "./routes/Login";
import Dashboard from "./Dashboard";
import LandingPage from "./routes/LandingPage";
import Register from "./routes/Register";
import ForgetPassword from "./routes/ForgetPassword";

function App() {
  const { loading } = useAuth();
  const lang = useSelector((state) => state.language.lang);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return loading ? null : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/dashboard/*" element={<Dashboard loading={loading} />} />
      <Route path="/*" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
