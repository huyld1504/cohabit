import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../constants/roles.constant';

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requireAuth = true,
  fallbackPath = '/unauthorized'
}) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  // If authentication is required but we don't have profile yet, show loading
  // This handles the case where profile is being loaded asynchronously
  if (requireAuth && user?.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !user?.profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no role restrictions, allow access
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user role is in allowed roles
  const userRole = user?.profile?.role;
  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <Navigate
        to={fallbackPath}
        state={{
          from: location,
          requiredRoles: allowedRoles,
          userRole: userRole
        }}
        replace
      />
    );
  }

  return children;
};

// Convenience components for common role checks
export const AdminRoute = ({ children, ...props }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} {...props}>
    {children}
  </ProtectedRoute>
);

export const ProMemberRoute = ({ children, ...props }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.PRO_MEMBER]} {...props}>
    {children}
  </ProtectedRoute>
);

export const PlusMemberRoute = ({ children, ...props }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.PRO_MEMBER, USER_ROLES.PLUS_MEMBER]} {...props}>
    {children}
  </ProtectedRoute>
);

export const ModeratorRoute = ({ children, ...props }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.MODERATOR]} {...props}>
    {children}
  </ProtectedRoute>
);

// User post management - ProMember only
export const UserPostRoute = ({ children, ...props }) => (
  <ProtectedRoute allowedRoles={[USER_ROLES.PRO_MEMBER]} {...props}>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
