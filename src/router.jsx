import Login from "./routes/Login";
import Register from "./routes/Register";

const router = [
  {
    path: "/",
    element: <></>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
];

export default router;
