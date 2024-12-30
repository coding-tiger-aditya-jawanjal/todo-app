import { useTask } from "../context/TaskProvider";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated } = useTask();
  return isAuthenticated ? <Navigate to={"/"} /> : <Outlet />;
};

export default PublicRoute;
