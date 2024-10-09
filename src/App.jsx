import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./ui/Layout/Header";
import router from "./router";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./routes/ProtectedRoute";
import Footer from "./ui/Layout/Footer";

function App() {
  const { loading, profile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
