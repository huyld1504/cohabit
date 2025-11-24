import React from 'react';
import { Button, Typography, Avatar, Space, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth.slice';
import { clearUserData } from '../../redux/features/user.slice';
import { removeToken } from '../../utils/token.store.util';
import { toast } from 'react-toastify';
import { logoWhite, logoWhite2 } from '../../assets';

const { Title, Text } = Typography;

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: '/admin',
      icon: <HomeOutlined />,
      label: <Link to="/admin">Tổng quan</Link>,
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Người dùng</Link>,
    },
    {
      key: '/admin/rental-history',
      icon: <CalendarOutlined />,
      label: <Link to="/admin/rental-history">Quản lí thanh toán</Link>,
    },
    {
      key: '/admin/posts-management',
      icon: <BarChartOutlined />,
      label: <Link to="/admin/posts-management">Tổng hợp bài đăng</Link>,
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
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <SettingOutlined />,
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
      className="admin-sidebar"
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
                  flex items-center transition-all duration-200
                  ${collapsed ? 'px-2 justify-center' : 'px-3'}
                  text-white/90 hover:bg-white/10 hover:text-white
                `}
                title={collapsed ? item.label : undefined}
              >
                <span className={`text-base ${collapsed ? '' : 'mr-3'}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span>{item.label}</span>
                )}
              </div>
            );
          }

          // For navigation links, extract the href from Link component
          const linkTo = item.label.props.to;

          return (
            <Link
              key={item.key}
              to={linkTo}
              className={`
                h-12 mx-1 mb-2 rounded-lg font-medium border-none cursor-pointer
                flex items-center transition-all duration-200 no-underline
                ${collapsed ? 'px-2 justify-center' : 'px-3'}
                ${isActive
                  ? 'bg-white text-[#1279a2] font-semibold shadow-lg'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
              `}
              title={collapsed ? item.label.props.children : undefined}
            >
              <span className={`text-base ${collapsed ? '' : 'mr-3'} ${isActive ? 'text-[#1279a2]' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className={isActive ? 'text-[#1279a2]' : ''}>
                  {item.label.props.children}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Profile Section */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl overflow-hidden shadow-xl">
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="topLeft"
              trigger={['click']}
            >
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-white/15 active:bg-white/20 p-4 transition-all duration-200 group">
                <div className="relative">
                  <Avatar
                    size={46}
                    src={profile?.image || null}
                    icon={profile?.image === '' ? <UserOutlined /> : null}
                    className="flex-shrink-0 border-2 border-white/40 group-hover:border-white/60 transition-all duration-200"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <Text className="text-white font-semibold text-sm block truncate group-hover:text-white transition-colors">
                    {profile?.fullName || 'Admin User'}
                  </Text>
                  <Text className="text-white/70 text-xs block truncate group-hover:text-white/85 transition-colors">
                    {profile?.email || profile?.phone || 'admin@cohabit.com'}
                  </Text>
                </div>
                <DownOutlined className="text-white/50 text-xs group-hover:text-white/70 transition-colors" />
              </div>
            </Dropdown>
          </div>
        </div>
      )}

      {/* Collapsed User Avatar */}
      {collapsed && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="topRight"
              trigger={['click']}
            >
              <div className="relative cursor-pointer">
                <Avatar
                  size={48}
                  src={profile?.image || null}
                  icon={<UserOutlined />}
                  className="border-2 border-white/40 group-hover:border-white/60 transition-all duration-200 shadow-xl group-hover:shadow-2xl group-hover:scale-105"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full group-hover:scale-110 transition-transform duration-200"></div>
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-200"></div>
              </div>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
