import { useTask } from "../context/TaskProvider";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useTask();
  return isAuthenticated ? <Navigate to={"/"} /> : children;
};

export default PublicRoute;
