import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./ui/Layout/Header";
import router from "./router";
import useAuth from "./hooks/useAuth";

function App() {
  const { loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return loading ? null : (
    <>
      <Header />
      <main>
        <Routes>
          {router.map((route, index) => {
            return (
              <Route path={route.path} element={route.element} key={index} />
            );
          })}
        </Routes>
      </main>
    </>
  );
}

export default App;
