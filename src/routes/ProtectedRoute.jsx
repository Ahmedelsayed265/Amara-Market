import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthed, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthed) {
      navigate("/login", { replace: false });
    }
  }, [isAuthed, loading, navigate]);

  return children;
}

export default ProtectedRoute;
