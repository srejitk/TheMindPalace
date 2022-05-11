import { Navigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth/AuthContext";

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    toast.error("You need to login first");
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
