import { useTask } from "../context/TaskProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useTask();

  return isAuthenticated ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default ProtectedRoute;
