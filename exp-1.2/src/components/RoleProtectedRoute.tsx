import { Navigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

import {
  selectIsAuthenticated,
  selectUserRole,
} from "../features/auth/authSelectors";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

function RoleProtectedRoute({
  children,
  allowedRoles,
}: RoleProtectedRouteProps) {
  const isAuthenticated = useAppSelector(
    selectIsAuthenticated
  );

  const role = useAppSelector(selectUserRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default RoleProtectedRoute;