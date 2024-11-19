import About from "./routes/About";
import Contact from "./routes/Contact";
import EditProfile from "./routes/EditProfile";
import Notifications from "./routes/Notifications";
import OrderDetails from "./routes/OrderDetails";
import Orders from "./routes/Orders";
import Privacy from "./routes/Privacy";
import Products from "./routes/Products";
import Terms from "./routes/Terms";

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
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
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
    protected: true,
  },
  {
    path: "/notifications",
    element: <Notifications />,
    protected: true,
  }
];

export default router;
