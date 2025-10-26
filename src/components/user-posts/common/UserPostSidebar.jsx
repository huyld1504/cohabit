import React from 'react';
import { Button, Typography, Avatar, Space, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EditOutlined,
  HomeOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/auth.slice';
import { clearUserData } from '../../../redux/features/user.slice';
import { removeToken } from '../../../utils/token.store.util';
import { toast } from 'react-toastify';
import { logoWhite, logoWhite2 } from '../../../assets';

const { Title, Text } = Typography;

const UserPostSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: '/user/posts',
      icon: <EditOutlined />,
      label: 'Bài đăng của tôi',
    },
    {
      key: '/user/rentals',
      icon: <HomeOutlined />,
      label: 'Quản lí nhà trọ',
    },
    {
      key: '/user/terms',
      icon: <FileTextOutlined />,
      label: 'Điều khoản cho bài đăng',
    },
    {
      key: '/user/posts/rented',
      icon: <CheckCircleOutlined />,
      label: 'Bài đăng được thuê',
    },
    {
      type: 'divider',
    },
    {
      key: 'toggle-sidebar',
      icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
      label: collapsed ? 'Mở rộng' : 'Thu gọn',
      onClick: () => setCollapsed(!collapsed),
    },
  ];

  const handleLogout = () => {
    try {
      // Clear token from storage
      removeToken();
      // Clear Redux state
      dispatch(logout());
      dispatch(clearUserData());
      // Show success message
      toast.success('Đăng xuất thành công!');

      setTimeout(() => window.location.href = '/', 1000);
      clearTimeout();

    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Có lỗi xảy ra khi đăng xuất');
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <SettingOutlined />,
      onClick: () => navigate('/profile/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      className="user-post-sidebar"
      style={{
        background: '#1279a2',
        minHeight: '100vh',
        width: collapsed ? '80px' : '280px',
        transition: 'width 0.2s',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center border-b border-white/10">
        {collapsed ? (
          // Logo khi collapsed - chỉ hiển thị icon
          <div className="w-20 h-20 flex justify-center">
            <img
              alt='logo'
              src={logoWhite}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          // Logo khi expanded - hiển thị full logo
          <div className="flex items-start">
            <div className="h-20">
              <img
                alt='logo'
                src={logoWhite2}
                className="h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="px-2 mt-6">
        {menuItems.map((item, index) => {
          if (item.type === 'divider') {
            return <div key={index} className="h-px bg-white/20 mx-2 my-4" />;
          }

          const isActive = location.pathname === item.key;
          const isToggleButton = item.key === 'toggle-sidebar';

          // If it's a toggle button, render as clickable div
          if (isToggleButton) {
            return (
              <div
                key={item.key}
                onClick={item.onClick}
                className={`
                  h-12 mx-1 mb-2 rounded-lg font-medium border-none cursor-pointer
                  flex items-center transition-all duration-300 ease-in-out
                  ${collapsed ? 'px-2 justify-center' : 'px-3'}
                  text-white/80 hover:bg-white/15 hover:text-white hover:scale-105
                  active:scale-95 active:bg-white/20
                `}
                title={collapsed ? item.label : undefined}
              >
                <span className={`text-base transition-all duration-200 ${collapsed ? '' : 'mr-3'}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="transition-opacity duration-200">{item.label}</span>
                )}
              </div>
            );
          }

          return (
            <Link
              to={item.key}
              key={item.key}
              style={{ textDecoration: 'none' }}
              className={`
                h-12 mx-1 mb-2 rounded-lg font-medium border-none
                flex items-center transition-all duration-300 ease-in-out
                ${collapsed ? 'px-2 justify-center' : 'px-3'}
                ${isActive
                  ? 'bg-white/20 text-white shadow-sm scale-105'
                  : 'text-white/85 hover:bg-white/15 hover:text-white hover:scale-105'
                }
                active:scale-95
              `}
              title={collapsed ? item.label : undefined}
            >
              <span className={`text-base transition-all duration-200 ${collapsed ? '' : 'mr-3'}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="transition-opacity duration-200">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Profile Section - Fixed at bottom */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 animate-in fade-in duration-200">
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="topLeft"
            trigger={['click']}
          >
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/15 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="flex items-center !space-x-3">
                <Avatar
                  size="large"
                  src={profile?.image || null}
                  icon={profile?.image === '' ? <UserOutlined /> : null}
                  className="bg-white/20"
                />
                <div className="flex-1 min-w-0">
                  <Text className="text-white text-sm font-medium block truncate">
                    {profile?.fullName || 'User'}
                  </Text>
                  <Text className="text-white/70 text-xs block truncate">
                    {profile?.email || profile?.phone || 'user@example.com'}
                  </Text>
                </div>
              </div>
              <DownOutlined className="text-white/70 text-xs transition-transform duration-200 hover:rotate-180" />
            </div>
          </Dropdown>
        </div>
      )}

      {/* User Profile Collapsed */}
      {collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-2 animate-in fade-in duration-200">
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="topRight"
            trigger={['click']}
          >
            <div className="flex justify-center p-2 rounded-lg hover:bg-white/15 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95">
              <Avatar
                size="large"
                src={profile?.image}
                icon={<UserOutlined />}
                className="bg-white/20"
              />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default UserPostSidebar;