import { Avatar, List, Divider } from 'antd';
import { UserOutlined, HistoryOutlined, HeartOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const UserProfilePage = () => {
  const { profile } = useSelector(state => state.user);
  const [activeMenu, setActiveMenu] = useState('profile');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-screen my-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Left: 5/12 */}
      <div className="col-span-1 lg:col-span-4 bg-white rounded-xl shadow-md p-6 border border-gray-400">
        {/* Thông tin user, avatar, ... */}
        <div className='flex flex-col items-center justify-center'>
          <Avatar size={100} icon={<UserOutlined />} className='!bg-[#04537c]' />
          <span className='font-bold text-3xl text-center mt-6'>{profile?.phone}</span>
        </div>

        <div className="mt-10 w-full flex flex-col items-center">
          <List
            className="w-full max-w-xs"
            itemLayout="horizontal"
            dataSource={[
              { key: 'settings', label: 'Hồ sơ của tôi', icon: <UserOutlined className="mr-2 text-xl" /> },
              { key: 'history', label: 'Lịch sử', icon: <HistoryOutlined className="mr-2 text-xl" /> },
              { key: 'favorite', label: 'Yêu thích', icon: <HeartOutlined className="mr-2 text-xl text-pink-500" /> },
            ]}
            renderItem={item => (
              <Link to={`${item.key}`}>
                <List.Item
                  className={`cursor-pointer rounded-lg px-4 py-2 flex items-center justify-start ${activeMenu === item.key ? 'bg-blue-100 font-bold text-blue-700' : 'hover:bg-gray-100'}`}
                  key={item.key}
                  onClick={() => setActiveMenu(item.key)}
                >
                  <div className='flex items-center gap-2 ml-2 !text-black'>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </List.Item>
              </Link>
            )}
          />
          <Divider className="!bg-red-500 !w-50 !my-4" />
          <List
            className="w-full max-w-xs"
            itemLayout="horizontal"
            dataSource={[{ key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined className="mr-3 text-xl" /> }]}
            renderItem={item => (
              <List.Item className="cursor-pointer hover:bg-gray-100 rounded-lg px-4 py-2 flex items-center">
                <Link className='!ml-2 !text-black'>
                  {item.icon}
                  {item.label}
                </Link>
              </List.Item>
            )}
          />
        </div>
      </div>
      {/* Right: 7/12 */}
      <div className="col-span-1 lg:col-span-8 bg-white p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfilePage;