export const USER_ROLES = {
  ADMIN: 'Admin',
  PRO_MEMBER: 'ProMember',
  PLUS_MEMBER: 'PlusMember',
  MODERATOR: 'Moderator',
  USER: 'User' // Default role for regular users
};

export const ROLE_PERMISSIONS = {
  // Admin có tất cả quyền
  [USER_ROLES.ADMIN]: [
    'admin:read',
    'admin:write',
    'admin:delete',
    'posts:read',
    'posts:write',
    'posts:delete',
    'users:read',
    'users:write',
    'users:delete',
    'rentals:read',
    'rentals:write',
    'rentals:delete'
  ],

  // ProMember có quyền quản lý posts
  [USER_ROLES.PRO_MEMBER]: [
    'posts:read',
    'posts:write',
    'posts:delete',
    'rentals:read',
    'rentals:write'
  ],

  // PlusMember có quyền cơ bản với posts
  [USER_ROLES.PLUS_MEMBER]: [
    'posts:read',
    'posts:write',
    'rentals:read'
  ],

  // Moderator có quyền quản lý posts và users
  [USER_ROLES.MODERATOR]: [
    'posts:read',
    'posts:write',
    'posts:delete',
    'users:read',
    'users:write',
    'rentals:read'
  ],

  // User cơ bản
  [USER_ROLES.USER]: [
    'posts:read',
    'rentals:read'
  ]
};