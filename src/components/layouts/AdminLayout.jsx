import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import ProtectedRoute from '../common/ProtectedRoute';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // <ProtectedRoute allowedRoles={['admin']}>
    <div className="flex min-h-screen">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className="flex-1 bg-gray-50"
        style={{
          minHeight: '100vh',
          transition: 'all 0.2s',
        }}
      >
        <Outlet />
      </div>
    </div>
    // </ProtectedRoute>
  );
};

export default AdminLayout;