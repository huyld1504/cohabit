import React, { useState } from 'react';
import { Button, Badge, Drawer, Divider } from 'antd';
import {
  SearchOutlined,
  MessageOutlined,
  PlusOutlined,
  MenuOutlined,
  AppstoreOutlined,
  CrownOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const navLinks = [
    {
      path: '/properties',
      label: 'Danh mục Nhà Trọ',
      icon: <AppstoreOutlined />,
    },
    {
      path: '/contracts',
      label: 'Mẫu Hợp Đồng',
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-full mx-5">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-8">
              <Button
                className="!bg-yellow-400 !border-yellow-400 !text-white font-medium rounded-full px-6 shadow-sm hover:!bg-yellow-500 hover:!border-yellow-500"
                size="middle"
              >
                Premium
              </Button>
              <Link to="/properties" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap font-medium">
                Danh mục Nhà Trọ
              </Link>
              <Link to="/contracts" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap font-medium">
                Mẫu Hợp Đồng
              </Link>
            </div>
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 rounded-full px-6 font-medium"
              size="middle"
            >
              Tạo bài đăng
            </Button>
            <Badge count={0} showZero={false}>
              <Button type="text" icon={<MessageOutlined className="text-2xl" />} className="text-gray-600 hover:text-blue-600 hover:!bg-blue-50 !rounded-full !w-12 !h-12" />
            </Badge>
            <Button type="text" icon={<SearchOutlined className="text-2xl" />} className="text-gray-600 hover:text-blue-600 hover:!bg-blue-50 !rounded-full !w-12 !h-12" />
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button type="text" className="text-gray-700 hover:text-blue-600 font-medium" size="middle">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 rounded-full px-6 font-medium" size="middle">
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex lg:hidden items-center">
            <Button
              type="text"
              icon={<MenuOutlined className="text-2xl" />}
              onClick={showDrawer}
              className="text-gray-600 hover:text-blue-600 hover:!bg-blue-50 !rounded-full !w-12 !h-12"
            />
          </div>
        </div>
      </div>

      {/* --- DRAWER --- */}
      <Drawer
        title={<Logo />}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        styles={{ padding: 0 }}
      >
        <div className="flex flex-col h-50">
          <div className="flex-grow p-6 space-y-6">
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeDrawer}
                  className="flex items-center gap-4 text-gray-700 text-lg font-medium p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            <Divider className="!my-6" />

            <div className="space-y-4">
              <Button
                icon={<CrownOutlined />}
                className="w-full !h-12 !text-base !font-medium !bg-yellow-400 !border-yellow-400 !text-white rounded-lg shadow-sm hover:!bg-yellow-500 hover:!border-yellow-500 !mb-5"
                onClick={closeDrawer}
              >
                Nâng cấp Premium
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="w-full !h-12 !text-base !font-medium bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 rounded-lg"
                onClick={closeDrawer}
              >
                Tạo bài đăng
              </Button>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <Link to="/login" className="w-full" onClick={closeDrawer}>
                <Button size="large" className="w-full font-medium">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register" className="w-full" onClick={closeDrawer}>
                <Button size="large" type="primary" className="w-full font-medium">
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;