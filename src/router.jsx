import About from "./routes/About";
import Contact from "./routes/Contact";
import EditProfile from "./routes/EditProfile";
import ForgetPassword from "./routes/ForgetPassword";
import Login from "./routes/Login";
import OrderDetails from "./routes/OrderDetails";
import Orders from "./routes/Orders";
import Products from "./routes/Products";
import Register from "./routes/Register";

const router = [
  {
    path: "/",
    element: <Orders />,
    protected: true,
  },
  {
    path: "/order/:id",
    element: <OrderDetails />,
    protected: true,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />,
    protected: true,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
    protected: true,
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
