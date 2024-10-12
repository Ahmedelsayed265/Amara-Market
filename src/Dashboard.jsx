import { Route, Routes } from "react-router-dom";
import Header from "./ui/Layout/Header";
import router from "./router";
import ProtectedRoute from "./routes/ProtectedRoute";
import Footer from "./ui/Layout/Footer";

function Dashboard() {
  return (
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
                  <ProtectedRoute>{element}</ProtectedRoute>
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

export default Dashboard;
