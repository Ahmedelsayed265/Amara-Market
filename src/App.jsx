import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import i18n from "./utils/i18n";
import Header from "./ui/Layout/Header";
import router from "./router";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./routes/ProtectedRoute";
import Footer from "./ui/Layout/Footer";

function App() {
  const { loading, profile } = useAuth();
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
    <>
      <Header />
      <main>
        <Routes>
          {router.map(({ path, element, index, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute profile={profile}>{element}</ProtectedRoute>
                ) : (
                  element
                )
              }
              index={index}
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
