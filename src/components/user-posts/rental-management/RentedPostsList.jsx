import React, { useState, useEffect } from 'react';
import { Spin, Empty, Row, Col, message, Pagination, Button } from 'antd';
import { orderApi } from '../../../api/order.api';
import RentedPostCard from './RentedPostCard';

const RentedPostsList = () => {
  const [rentedPosts, setRentedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  // Load rented posts from API
  const fetchRentedPosts = async (page = 1, size = 10) => {
    try {
      setLoading(true);
      const response = await orderApi.getOwnerOrders(page, size);
      console.log('Owner Orders Response:', response);

      if (response.success && response.data) {
        // Map API data to component format
        const mappedPosts = (response.data.items || []).map(order => ({
          id: order.postId,
          orderId: order.orderId,
          title: order.postTitle,
          address: order.postAddress,
          image: '/images/room1.jpg', // Default image, có thể cập nhật sau
          renter: {
            name: order.userName,
            message: `Đã liên hệ thuê phòng`,
          },
          rentStartDate: order.createdAt,
          conversationId: order.conversationId,
          ownerId: order.ownerId,
          userId: order.userId
        }));

        setRentedPosts(mappedPosts);
        setPagination({
          currentPage: response.data.currentPage || 1,
          pageSize: response.data.pageSize || 10,
          totalCount: response.data.totalCount || 0,
          totalPages: response.data.totalPages || 0
        });

        console.log('Pagination set to:', {
          currentPage: response.data.currentPage || 1,
          pageSize: response.data.pageSize || 10,
          totalCount: response.data.totalCount || 0,
          totalPages: response.data.totalPages || 0
        });
      } else {
        setRentedPosts([]);
      }
    } catch (error) {
      console.error('Error fetching rented posts:', error);
      message.error('Không thể tải danh sách bài đăng đã được thuê. Vui lòng thử lại!');
      setRentedPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentedPosts();
  }, []);

  // Handle pagination change
  const handlePageChange = (page, pageSize) => {
    fetchRentedPosts(page, pageSize);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (rentedPosts.length === 0) {
    return (
      <div className="py-12">
        <Empty
          description={
            <div>
              <div className="text-gray-400 text-6xl mb-4">🏠</div>
              <span className="text-gray-500">
                Chưa có bài đăng nào được thuê
              </span>
              <p className="text-gray-400 text-sm mt-2">
                Các bài đăng của bạn chưa có ai liên hệ thuê
              </p>
            </div>
          }
          className="text-gray-500"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <style jsx>{`
        .custom-pagination .ant-pagination-item {
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        .custom-pagination .ant-pagination-item-active {
          background: #3b82f6;
          border-color: #3b82f6;
        }
        .custom-pagination .ant-pagination-item-active a {
          color: white;
        }
        .custom-pagination .ant-pagination-options-size-changer {
          margin-left: 16px;
        }
        .custom-pagination .ant-pagination-jump-prev,
        .custom-pagination .ant-pagination-jump-next {
          border-radius: 6px;
        }
      `}</style>

      {/* Posts List */}
      <div className="space-y-3">
        <Row gutter={[0, 12]}>
          {rentedPosts.map((post) => (
            <Col span={24} key={post.orderId || post.id}>
              <RentedPostCard post={post} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Pagination */}
      {rentedPosts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          {/* Simple Pagination */}
          <div className="flex justify-end">
            <Pagination
              current={pagination.currentPage}
              total={Math.max(pagination.totalCount, 1)}
              pageSize={pagination.pageSize}
              onChange={(page) => handlePageChange(page, pagination.pageSize)}
              showSizeChanger={false}
              showQuickJumper={false}
              showTotal={false}
              className="simple-pagination"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RentedPostsList;