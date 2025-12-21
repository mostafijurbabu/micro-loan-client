import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ManagerRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return <p>Loading...</p>;
  }

  if (user && (role === "manager" || role === "admin")) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ManagerRoute;
