import { Navigate } from "react-router-dom";

function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Agar login nahi hai to Dashboard pe redirect
    return <Navigate to="/" replace />;
  }
  return children;
}

export default PrivateRoute;
