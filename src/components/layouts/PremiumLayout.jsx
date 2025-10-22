import React from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../common/ProtectedRoute';
import { USER_ROLES } from '../../constants/roles.constant';

const PremiumLayout = () => {
  return (
    <ProtectedRoute allowedRoles={[]}>
      <div>
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default PremiumLayout;