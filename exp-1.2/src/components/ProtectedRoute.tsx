import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectIsAuthenticated } from "../features/auth/authSelectors";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(
    selectIsAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;