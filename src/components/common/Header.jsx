import React, { useState } from 'react';
import { Button, Badge, Drawer, Divider, Tooltip, Avatar, Dropdown, Menu } from 'antd';
import {
  SearchOutlined,
  MessageOutlined,
  PlusOutlined,
  MenuOutlined,
  AppstoreOutlined,
  CrownOutlined,
  UserOutlined,
  FileTextOutlined,
  PhoneOutlined,
  HeartOutlined,
  HistoryOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useSelector } from 'react-redux';

const Header = () => {
  const { profile } = useSelector((state) => state.user);
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

  const userMenu = (
    <Menu className='w-60 border-1'>
      <Menu.Item key="greeting" className='!my-2 !mr-2 flex justify-center align-center'>
        <div>
          <Badge title='Pro' size={'default'} count={'Pro'} color='gold' >
            <span className='text-2xl font-bold'>
              {profile?.name}
            </span>
          </Badge>
        </div>
        <div className='mt-1'>
          <span className='flex items-center gap-2 text-sm'>
            <PhoneOutlined size={'large'} className='text-xl' />
            {profile?.phone}
          </span>
        </div>
        <Divider style={{ margin: '5px 0', color: '#111111' }} />
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined className='!text-xl !mt-2' />}>
        <Link to="/profile">
          <span className='flex items-center gap-2 text-sm'>
            Tài khoản
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="history" icon={<HistoryOutlined className='!text-xl !mt-2' />}>
        <Link to="/my-posts">Lịch sử thuê</Link>
      </Menu.Item>
      <Menu.Item key="favorite" icon={<HeartOutlined className='!text-xl !mt-2' />}>
        <Link to="/my-posts">Danh sách yêu thích</Link>
      </Menu.Item>
      <Menu.Item key="manage" icon={<EditOutlined className='!text-xl !mt-2' />}>
        <Link to="/my-posts" className='flex gap-3'>
          <span className='flex items-center gap-2 text-sm'>
            Quản lí bài đăng
          </span>
          <Badge title='Pro' size={'default'} count={'Plus'} color='blue' />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined className='!text-xl !mt-2' />}>
        <span onClick={() => {/* Xử lý logout ở đây */ }}>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 overflow-x-hidden overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 gap-4 w-full max-w-screen">
            <div className="flex items-center gap-8">
              <Button
                className="!bg-yellow-400 !border-yellow-400 !text-white font-medium rounded-full px-6 shadow-sm hover:!bg-yellow-500 hover:!border-yellow-500"
                size="middle"
              >
                Premium
              </Button>
              <Link to="/properties" className="!text-black font-bold whitespace-nowrap">
                Danh mục Nhà Trọ
              </Link>
              <Link to="/contracts" className="!text-black font-bold whitespace-nowrap">
                Mẫu Hợp Đồng
              </Link>
            </div>
            <div className="hidden lg:flex gap-5 items-center space-x-5">
              <Badge status='processing' count={'Plus'} color='#1279a1'>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="!bg-[#1279a1] border-blue-600 hover:bg-blue-700 hover:border-blue-700 rounded-full px-6 font-medium"
                  size="middle"
                >
                  Tạo bài đăng
                </Button>
              </Badge>
              <Badge count={0} showZero={false}>
                <Tooltip title="Chatbot with AI" placement="bottom">
                  <Button size='large' type="text" icon={<MessageOutlined className="text-2xl" />} className="text-gray-600 hover:text-blue-600 hover:!bg-blue-50 !rounded-full !w-12 !h-12" />
                </Tooltip>
              </Badge>
              <Tooltip title="Tìm kiếm" placement="bottom">
                <Button type="text" size='large' icon={<SearchOutlined className="text-2xl" />} className="text-gray-600 hover:text-blue-600 hover:!bg-blue-50 !rounded-full !w-12 !h-12" />
              </Tooltip>
              {profile === null ? (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button type="text" className="text-gray-700 hover:text-blue-600 font-medium" size="middle">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="!border-[#1279a1] !text-white !bg-[#1279a1] rounded-full px-6 font-medium" size="middle">
                      Đăng ký
                    </Button>
                  </Link>
                </div>
              ) : (
                <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
                  <Avatar
                    size={'large'}
                    icon={<UserOutlined />}
                    className='!bg-[#1279a1] cursor-pointer'
                  />
                </Dropdown>
              )}
            </div>
          </nav>
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
            {profile ? (
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar size={64} icon={<UserOutlined />} className="!bg-[#1279a1]" />
                <span className="font-bold text-lg">{profile.name}</span>
                <span className="text-gray-500 text-base flex items-center gap-2"><PhoneOutlined />{profile.phone}</span>
                <Divider className="!my-2" />
                <Menu className="w-full border-none">
                  <Menu.Item key="profile" icon={<UserOutlined />}>
                    <Link to="/profile" onClick={closeDrawer}>Tài khoản</Link>
                  </Menu.Item>
                  <Menu.Item key="history" icon={<HistoryOutlined />}>
                    <Link to="/my-posts" onClick={closeDrawer}>Lịch sử thuê</Link>
                  </Menu.Item>
                  <Menu.Item key="favorite" icon={<HeartOutlined />}>
                    <Link to="/my-posts" onClick={closeDrawer}>Danh sách yêu thích</Link>
                  </Menu.Item>
                  <Menu.Item key="manage" icon={<EditOutlined />}>
                    <Link to="/my-posts" onClick={closeDrawer}>Quản lí bài đăng</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout" icon={<LogoutOutlined />}>
                    <span onClick={() => {/* Xử lý logout ở đây */ closeDrawer(); }}>Đăng xuất</span>
                  </Menu.Item>
                </Menu>
              </div>
            ) : (
              <>
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
                  <Badge status='processing' count={'Plus'} color='#1279a1'>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      className="w-full !h-12 !text-base !font-medium !bg-[#1279a1] !border-[#1279a1] rounded-lg"
                      onClick={closeDrawer}
                    >
                      Tạo bài đăng
                    </Button>
                  </Badge>
                </div>
              </>
            )}
          </div>
          {!profile && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <Link to="/login" className="w-full" onClick={closeDrawer}>
                  <Button size="large" className="w-full font-medium">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" className="w-full" onClick={closeDrawer}>
                  <Button size="large" type="primary" className="w-full font-medium !bg-[#1279a1] !border-[#1279a1] ">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;