
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If token exists (user is logged in), allow access
  if (token) {
    return children;
  }


  return <Navigate to="/login" />;
};

export default PrivateRoute;
