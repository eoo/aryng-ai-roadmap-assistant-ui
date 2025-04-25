import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/AuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.email) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;