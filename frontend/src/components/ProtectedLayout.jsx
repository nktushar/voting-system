import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
