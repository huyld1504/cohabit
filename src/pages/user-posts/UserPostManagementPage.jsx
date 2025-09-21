import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserPostPaper from '../../components/user-posts/common/UserPostPaper';
import PostStatusTabs from '../../components/user-posts/posts-management/PostStatusTabs';
import UserPostTable from '../../components/user-posts/posts-management/UserPostTable';

const UserPostManagementPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [loading] = useState(false);
  const [userPlan] = useState('basic'); // Mock user plan - should come from Redux/API
  const [postsData, setPostsData] = useState({
    pending: [],
    approved: [],
    rejected: []
  });

  // Check if user has required plan for creating posts
  const canCreatePost = userPlan === 'plus' || userPlan === 'pro';

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockPosts = {
      pending: [
        {
          id: 1,
          title: 'Phòng đầy đủ tiện nghi giá rẻ Lê Văn Việt',
          address: 'D. Lê Văn Việt, Q. Thủ Đức, Tp. Hồ Chí Minh',
          createdAt: '2025-01-07',
          status: 'pending'
        }
      ],
      approved: [
        {
          id: 2,
          title: 'Phòng đầy đủ tiện nghi giá rẻ Lê Văn Việt',
          address: 'D. Lê Văn Việt, Q. Thủ Đức, Tp. Hồ Chí Minh',
          createdAt: '2025-01-07',
          status: 'approved'
        }
      ],
      rejected: [
        {
          id: 3,
          title: 'Phòng đầy đủ tiện nghi giá rẻ Lê Văn Việt',
          address: 'D. Lê Văn Việt, Q. Thủ Đức, Tp. Hồ Chí Minh',
          createdAt: '2025-01-07',
          status: 'rejected'
        }
      ]
    };

    // Initialize with mock data
    setPostsData(mockPosts);
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleCreatePost = () => {
    navigate('/user/posts/create');
  };

  const handleViewPost = (record) => {
    message.info(`Xem chi tiết bài đăng: ${record.title}`);
    // Navigate to post detail
  };

  const handleEditPost = (record) => {
    message.info(`Chỉnh sửa bài đăng: ${record.title}`);
    // Navigate to edit post
  };

  const handleDeletePost = (record) => {
    message.warning(`Xóa bài đăng: ${record.title}`);
    // Handle delete post
  };

  const getCurrentData = () => {
    return postsData[activeTab] || [];
  };

  return (
    <UserPostPaper
      title="Bài đăng của tôi"
      subtitle="Quản lý tất cả bài đăng trong hệ thống"
      showCreateButton={true}
      onCreatePost={handleCreatePost}
    >
      {/* Status Tabs */}
      <PostStatusTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        pendingCount={postsData.pending?.length || 0}
        approvedCount={postsData.approved?.length || 0}
        rejectedCount={postsData.rejected?.length || 0}
      />

      {/* Posts Table */}
      <UserPostTable
        data={getCurrentData()}
        loading={loading}
        onView={handleViewPost}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </UserPostPaper>
  );
};

export default UserPostManagementPage;