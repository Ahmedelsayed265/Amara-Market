import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function ProtectedRoute({ children }) {
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const navigate = useNavigate();

  const [cookies] = useCookies(["token", "id"]);
  const token = cookies?.token;

  useEffect(() => {
    if (!token && !isLogged) {
      navigate("/login", { replace: false });
    }
  }, [token, isLogged, navigate]);

  return children;
}

export default ProtectedRoute;
