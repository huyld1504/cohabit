import { useSelector } from 'react-redux';
import { USER_ROLES, ROLE_PERMISSIONS } from '../constants/roles.constant';

export const useRole = () => {
  const user = useSelector((state) => state.user);
  const userRole = user?.profile?.role || USER_ROLES.USER;
  const isLoading = user?.loading || false;

  const hasRole = (roles) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    return roles.includes(userRole);
  };

  const hasPermission = (permission) => {
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };

  const isAdmin = () => userRole === USER_ROLES.ADMIN;
  const isProMember = () => [USER_ROLES.ADMIN, USER_ROLES.PRO_MEMBER].includes(userRole);
  const isPlusMember = () => [USER_ROLES.ADMIN, USER_ROLES.PRO_MEMBER, USER_ROLES.PLUS_MEMBER].includes(userRole);
  const isModerator = () => [USER_ROLES.ADMIN, USER_ROLES.MODERATOR].includes(userRole);

  return {
    userRole,
    user,
    isLoading,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin,
    isProMember,
    isPlusMember,
    isModerator
  };
};