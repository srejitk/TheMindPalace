import { Navigate, useLocation, Outlet } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth/AuthContext";
import React from "react";

const RequireAuth = () => {
  const { isLogged } = useAuth();
  const location = useLocation();

  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
};

export default RequireAuth;
