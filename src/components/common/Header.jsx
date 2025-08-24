import React from 'react';
import { Button, Badge } from 'antd';
import { SearchOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* Đặt logo ở đây */}
              LOGO
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-8">
              {/* Premium Button */}
              <Button
                className="!bg-yellow-400 !border-yellow-400 !text-white font-medium rounded-full px-6 shadow-sm hover:!bg-yellow-500 hover:!border-yellow-500"
                size="middle"
              >
                Premium
              </Button>

              {/* Danh mục Nhà Trọ */}
              <Link
                to="/properties"
                className="!text-black cursor-pointer px-4 py-2 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap font-medium"
              >
                Danh mục Nhà Trọ
              </Link>

              {/* Mẫu Hợp Đồng */}
              <Link
                to="/contracts"
                className="!text-black cursor-pointer px-4 py-2 rounded-md hover:bg-blue-50 transition-colors whitespace-nowrap font-medium"
              >
                Mẫu Hợp Đồng
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Create Post Button */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 rounded-full px-6 font-medium"
              size="middle"
            >
              Tạo bài đăng
            </Button>

            {/* Message Icon */}
            <Badge count={0} showZero={false}>
              <Button
                type="text"
                icon={<MessageOutlined />}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                size="large"
              />
            </Badge>

            {/* Search Icon */}
            <Button
              type="text"
              icon={<SearchOutlined />}
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              size="large"
            />

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button
                  type="text"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  size="middle"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 rounded-full px-6 font-medium"
                  size="middle"
                >
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;