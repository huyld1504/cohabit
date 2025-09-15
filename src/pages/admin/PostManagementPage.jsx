import React, { useState } from 'react';
import { Card } from 'antd';
import { toast } from 'react-toastify';
import AdminPaper from '../../components/admin/AdminPaper';
import {
  PostStats,
  PostToolbar,
  PostTable
} from '../../components/admin/post-management';
import { mockPostData, mockPostStats } from '../../components/admin/post-management/mockData';

const PostManagementPage = () => {
  const [posts, setPosts] = useState(mockPostData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination] = useState({
    current: 1,
    pageSize: 10,
    total: mockPostData.length,
  });

  // Filter posts based on search text, status, and category
  const filteredPosts = posts.filter(post => {
    // Search filter
    const matchesSearch = searchText === '' ||
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.description.toLowerCase().includes(searchText.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchText.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' ||
      post.status.toLowerCase() === statusFilter.toLowerCase() ||
      (statusFilter === 'pending' && post.status === 'Chờ duyệt') ||
      (statusFilter === 'published' && post.status === 'Đã xuất bản') ||
      (statusFilter === 'rejected' && post.status === 'Bị từ chối');

    // Category filter
    const matchesCategory = categoryFilter === 'all' ||
      post.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleView = (record) => {
    console.log('View post:', record);
    toast.info(`Xem chi tiết bài viết: ${record.title}`);
  };

  const handleEdit = (record) => {
    console.log('Edit post:', record);
    toast.info(`Chỉnh sửa bài viết: ${record.title}`);
  };

  const handleDelete = (record) => {
    console.log('Delete post:', record);
    setPosts(posts.filter(post => post.id !== record.id));
    toast.success(`Đã xóa bài viết: ${record.title}`);
  };

  return (
    <AdminPaper
      title="Tổng hợp bài đăng"
      subtitle="Quản lý tất cả bài đăng trong hệ thống"
    >
      {/* Statistics Cards */}
      <PostStats
        totalPosts={mockPostStats.totalPosts}
        pendingPosts={mockPostStats.pendingPosts}
        publishedPosts={mockPostStats.publishedPosts}
        rejectedPosts={mockPostStats.rejectedPosts}
      />

      {/* Main Content */}
      <Card bordered={false}>
        {/* Toolbar */}
        <PostToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        {/* Table */}
        <PostTable
          data={filteredPosts}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          pagination={pagination}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </AdminPaper>
  );
};

export default PostManagementPage;
