import About from "./routes/About";
import Contact from "./routes/Contact";
import ForgetPassword from "./routes/ForgetPassword";
import Login from "./routes/Login";
import Products from "./routes/Products";
import Register from "./routes/Register";

const router = [
  {
    path: "/",
    element: <></>,
    protected: true
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />,
    protected: true
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
];

export default router;
