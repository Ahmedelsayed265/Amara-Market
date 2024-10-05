import About from "./routes/About";
import Contact from "./routes/Contact";
import ForgetPassword from "./routes/ForgetPassword";
import Login from "./routes/Login";
import Register from "./routes/Register";

const router = [
  {
    path: "/",
    element: <></>,
  },
  {
    path: "/about",
    element: <About />,
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
