import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { loading } = useSelector((state) => state.admin);
  const role = localStorage.getItem('role')
  if (loading === false) {
    if (role !== "Admin") {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;
