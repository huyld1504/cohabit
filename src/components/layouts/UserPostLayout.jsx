import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserPostSidebar from '../user-posts/common/UserPostSidebar';

const UserPostLayout = () => {
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
    <div className="flex min-h-screen bg-gray-50">
      <UserPostSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className="flex-1 overflow-x-auto"
        style={{
          minHeight: '100vh',
          transition: 'all 0.2s',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default UserPostLayout;