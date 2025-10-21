import React, { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import { toast } from 'react-toastify';
import AdminPaper from '../../components/admin/AdminPaper';
import { PostTable } from '../../components/admin/post-management';
import { postApi } from '../../api/post.api';

const PostManagementPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await postApi.getAdminPost();
        if (res.success) {
          // Convert API data to table data format
          setPosts(res?.data || []);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error(err);
        toast.error('Không thể tải danh sách bài đăng!');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // No client-side filters for now, API will handle filtering later
  const filteredPosts = posts; // keep variable name for future use

  const handleView = (record) => {
    toast.info(`Xem chi tiết bài viết: ${record.title}`);
  };

  const handleEdit = (record) => {
    toast.info(`Chỉnh sửa bài viết: ${record.title}`);
  };

  const handleDelete = (record) => {
    const id = record.postId || record.id;
    setPosts(prev => prev.filter(post => (post.postId || post.id) !== id));
    toast.success(`Đã xóa bài viết: ${record.title}`);
  };

  return (
    <AdminPaper
      title="Tổng hợp bài đăng"
      subtitle="Quản lý tất cả bài đăng trong hệ thống"
    >
       {/*<PostStats ... /> */}
      <Card>
        <Spin spinning={loading}>
          <PostTable
            data={filteredPosts}
            loading={loading}
            pagination={false}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Spin>
      </Card>
    </AdminPaper>
  );
};

export default PostManagementPage;
