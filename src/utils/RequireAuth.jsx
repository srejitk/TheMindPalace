import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/Auth/AuthContext";

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
