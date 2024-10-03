import { Route, Routes } from "react-router-dom";
import Header from "./ui/Layout/Header";
import router from "./router";

function App() {
  return (
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
