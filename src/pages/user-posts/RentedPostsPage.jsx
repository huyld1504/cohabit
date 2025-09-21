import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserPostPaper from '../../components/user-posts/common/UserPostPaper';
import RentedPostsList from '../../components/user-posts/rental-management/RentedPostsList';

const RentedPostsPage = () => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/user/posts/create');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="w-full p-6">
        <UserPostPaper
          title="Bài đăng được thuê"
          subtitle="Quản lý các bài đăng đã có người thuê"
          showCreateButton={true}
          onCreatePost={handleCreatePost}
          createButtonProps={{
            icon: <PlusOutlined />,
            children: 'Tạo bài đăng mới',
            className: 'bg-blue-600 hover:bg-blue-700 border-blue-600'
          }}
        >
          <RentedPostsList />
        </UserPostPaper>
      </div>
    </div>
  );
};

export default RentedPostsPage;