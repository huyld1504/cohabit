import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import ProtectedRoute from '../common/ProtectedRoute';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // <ProtectedRoute allowedRoles={['admin']}>
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className="overflow-x-auto"
        style={{
          minHeight: '100vh',
          marginLeft: collapsed ? '80px' : '280px',
          transition: 'margin-left 0.2s',
        }}
      >
        <Outlet />
      </div>
    </div>
    // </ProtectedRoute>
  );
};

export default AdminLayout;