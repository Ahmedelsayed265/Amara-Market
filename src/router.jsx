import ForgetPassword from "./routes/ForgetPassword";
import Login from "./routes/Login";
import Register from "./routes/Register";

const router = [
  {
    path: "/",
    element: <></>,
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
