import { useTask } from "../context/TaskProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useTask();
  return isAuthenticated ? children : <Navigate to={"/"} />;
};

export default ProtectedRoute;
