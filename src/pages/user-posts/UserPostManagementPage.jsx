import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserPostPaper from '../../components/user-posts/common/UserPostPaper';
import PostStatusTabs from '../../components/user-posts/posts-management/PostStatusTabs';
import UserPostTable from '../../components/user-posts/posts-management/UserPostTable';
import EditPostModal from '../../components/user-posts/EditPostModal';
import { postApi } from '../../api/post.api';

const UserPostManagementPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postsData, setPostsData] = useState({
    pending: [],
    approved: [],
    rejected: [],
    closed: [],
    hidden: []
  });

  // Fetch user posts from API
  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await postApi.getAllUserPost();

      if (response.success) {
        // toast.success(response?.message || 'Lấy danh sách bài đăng thành công');
        // Transform API data to match UI format
        const transformedData = {
          pending: [],
          approved: [],
          rejected: [],
          closed: [],
          hidden: []
        };

        response.data.forEach(post => {
          const transformedPost = {
            id: post.postId,
            postId: post.postId,
            title: post.title,
            address: post.address,
            price: post.price,
            description: post.description,
            condition: post.condition,
            depositPolicy: post.depositPolicy,
            status: post.status,
            imageUrl: post.imageUrl || [],
            createdAt: new Date().toISOString().split('T')[0] // Mock created date since API doesn't provide
          };

          // Map status numbers to tab categories
          switch (post.status) {
            case 0: // Pending
              transformedPost.status = 'pending';
              transformedData.pending.push(transformedPost);
              break;
            case 1: // Approved/Published
              transformedPost.status = 'approved';
              transformedData.approved.push(transformedPost);
              break;
            case 2: // Rejected
              transformedPost.status = 'rejected';
              transformedData.rejected.push(transformedPost);
              break;
            case 3: // Closed
              transformedPost.status = 'closed';
              transformedData.closed.push(transformedPost);
              break;
            case 4: // Hidden
              transformedPost.status = 'hidden';
              transformedData.hidden.push(transformedPost);
              break;
            default:
              transformedPost.status = 'pending';
              transformedData.pending.push(transformedPost);
          }
        });

        setPostsData(transformedData);
      } else {
        message.error('Không thể tải danh sách bài đăng');
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
      message.error('Có lỗi xảy ra khi tải danh sách bài đăng');
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    fetchUserPosts();
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleCreatePost = () => {
    navigate('/user/posts/create');
  };

  const handleViewPost = (record) => {
    navigate(`/user/posts/${record.postId}`);
  };

  const handleEditPost = (record) => {
    setSelectedPost(record);
    setEditModalVisible(true);
  };

  const handleEditSuccess = () => {
    // Refresh data after successful edit
    fetchUserPosts();
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setSelectedPost(null);
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
        closedCount={postsData.closed?.length || 0}
        hiddenCount={postsData.hidden?.length || 0}
      />

      {/* Posts Table */}
      <UserPostTable
        data={getCurrentData()}
        loading={loading}
        onView={handleViewPost}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />

      {/* Edit Post Modal */}
      <EditPostModal
        visible={editModalVisible}
        onCancel={handleEditCancel}
        post={selectedPost}
        onSuccess={handleEditSuccess}
      />
    </UserPostPaper>
  );
};

export default UserPostManagementPage;