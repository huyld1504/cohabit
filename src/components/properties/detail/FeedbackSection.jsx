import React, { useState, useEffect } from 'react';
import { Card, Rate, Avatar, Button, Input, Modal, message, Pagination, Empty, Divider } from 'antd';
import { UserOutlined, EditOutlined, LockOutlined, CrownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../../../api/post.api';
import { useRole } from '../../../hooks/useRole';
import dayjs from 'dayjs';

const { TextArea } = Input;

const FeedbackSection = ({ postId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: ''
  });
  const [selectedRatingFilter, setSelectedRatingFilter] = useState(null);
  const [userHasFeedback, setUserHasFeedback] = useState(false);

  const { profile } = useSelector(state => state.user);
  const { isPlusMember, isProMember } = useRole();
  const navigate = useNavigate();

  // Check if user has premium access for filtering
  const hasPremiumAccess = isPlusMember() || isProMember();
  const isLoggedIn = !!profile;

  // Load feedbacks
  const loadFeedbacks = async (page = 1, ratingFilter = null) => {
    try {
      setLoading(true);
      const params = {
        currentPage: page,
        pageSize: pagination.pageSize
      };

      // Add rating filter if provided (only for premium users)
      if (ratingFilter && hasPremiumAccess) {
        params.rating = ratingFilter;
      }

      const response = await postApi.getPostFeedback(postId, params);

      if (response?.success && response?.data) {
        setFeedbacks(response.data.items || []);
        setPagination({
          current: response.data.currentPage || 1,
          pageSize: response.data.pageSize || 5,
          total: response.data.totalCount || 0
        });

        // Check if current user has already provided feedback
        if (profile?.id) {
          const userFeedback = response.data.items?.find(feedback => feedback.userId === profile.id);
          setUserHasFeedback(!!userFeedback);
        }
      }
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      message.error('Không thể tải đánh giá');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      setSelectedRatingFilter(null);
      setUserHasFeedback(false);
      loadFeedbacks();
    }
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Calculate average rating
  const averageRating = feedbacks.length > 0
    ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length
    : 0;



  // Handle rating filter - Premium users only
  const handleRatingFilter = (rating) => {
    if (!hasPremiumAccess) {
      message.warning('Vui lòng nâng cấp lên gói Plus hoặc Pro để sử dụng tính năng lọc');
      return;
    }

    const newRating = rating === selectedRatingFilter ? null : rating;
    setSelectedRatingFilter(newRating);
    setPagination(prev => ({ ...prev, current: 1 })); // Reset to page 1 when filtering
    loadFeedbacks(1, newRating);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
    loadFeedbacks(page, selectedRatingFilter);
  };

  // Handle submit feedback
  const handleSubmitFeedback = async () => {
    if (!profile) {
      message.warning('Vui lòng đăng nhập để đánh giá');
      return;
    }

    if (!newFeedback.comment.trim()) {
      message.warning('Vui lòng nhập nội dung đánh giá');
      return;
    }

    try {
      setSubmitting(true);
      const feedbackData = {
        postId: postId,
        rating: newFeedback.rating,
        comment: newFeedback.comment.trim(),
        createdAt: new Date().toISOString(),
        isDeleted: false
      };

      const response = await postApi.addFeedback(feedbackData);

      if (response?.success) {
        message.success('Đánh giá thành công!');
        setIsModalVisible(false);
        setNewFeedback({ rating: 5, comment: '' });
        loadFeedbacks(1); // Reload first page
      } else {
        message.error(response?.message || 'Không thể gửi đánh giá');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes('already provided feedback')) {
          message.warning('Bạn đã đánh giá bài đăng này rồi!');
          setUserHasFeedback(true);
        } else {
          message.error(errorMessage);
        }
      } else {
        message.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Card className="shadow-lg rounded-lg border-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <EditOutlined className="text-blue-600" />
            Đánh giá từ người thuê
          </h3>
          {profile && (
            userHasFeedback ? (
              <Button
                disabled
                icon={<EditOutlined />}
                className="bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
              >
                Đã đánh giá
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsModalVisible(true)}
                className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
              >
                Viết đánh giá
              </Button>
            )
          )}
        </div>

        {/* Rating Search Filter */}
        {hasPremiumAccess ? (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <CrownOutlined className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Tìm kiếm theo rating (Premium)</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm text-gray-700">Chọn rating để tìm kiếm:</span>
              <Rate
                value={selectedRatingFilter}
                onChange={handleRatingFilter}
                allowClear
                className="text-lg"
              />
              {selectedRatingFilter && (
                <span className="text-sm text-blue-600 font-medium">
                  {selectedRatingFilter} sao
                </span>
              )}
              {selectedRatingFilter && (
                <Button
                  size="small"
                  onClick={() => handleRatingFilter(null)}
                  className="text-gray-500 hover:text-gray-700"
                  type="text"
                  icon={<span>✕</span>}
                >
                  Xóa filter
                </Button>
              )}
            </div>

            {selectedRatingFilter && (
              <div className="mt-3 text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded flex items-center justify-between">
                <span>🔍 Đang tìm kiếm đánh giá với {selectedRatingFilter} sao - Tìm thấy {feedbacks.length} kết quả</span>
                <Button
                  size="small"
                  type="text"
                  onClick={() => handleRatingFilter(null)}
                  className="text-blue-600 hover:text-blue-800 ml-2"
                >
                  Hiển thị tất cả
                </Button>
              </div>
            )}
          </div>
        ) : isLoggedIn ? (
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LockOutlined className="text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Tìm kiếm nâng cao</span>
              </div>
              <Button
                size="small"
                type="primary"
                icon={<CrownOutlined />}
                onClick={() => navigate('/premium')}
                className="bg-blue-500 border-blue-500 hover:bg-blue-600"
              >
                Nâng cấp Premium
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Nâng cấp lên gói Plus hoặc Pro để sử dụng tính năng tìm kiếm đánh giá theo rating
            </p>
          </div>
        ) : null}        <Divider />

        {/* Feedback List với Blur cho non-logged users */}
        <div className={`space-y-4 relative ${!isLoggedIn ? 'filter blur-sm pointer-events-none' : ''}`}>
          {!isLoggedIn && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
              <div className="text-center p-6">
                <LockOutlined className="text-4xl text-gray-400 mb-3" />
                <h4 className="text-lg font-medium text-gray-700 mb-2">Đăng nhập để xem đánh giá</h4>
                <p className="text-sm text-gray-500 mb-4">Vui lòng đăng nhập để xem chi tiết các đánh giá của người thuê</p>
                <div className="space-x-2">
                  <Button type="primary" onClick={() => navigate('/login')}>
                    Đăng nhập
                  </Button>
                  <Button onClick={() => navigate('/register')}>
                    Đăng ký
                  </Button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4 text-lg">Đang tải đánh giá...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <Empty
              description={
                <div className="text-center">
                  <p className="text-gray-500 mb-2">
                    {selectedRatingFilter
                      ? `Không có đánh giá nào với ${selectedRatingFilter} sao`
                      : "Chưa có đánh giá nào cho bài đăng này"
                    }
                  </p>
                  <p className="text-sm text-gray-400">Hãy là người đầu tiên chia sẻ trải nghiệm!</p>
                </div>
              }
              className="py-12"
            >
              {!selectedRatingFilter && profile && (
                <Button
                  type="primary"
                  onClick={() => setIsModalVisible(true)}
                  className="mt-4 bg-blue-500 border-blue-500 hover:bg-blue-600"
                  disabled={userHasFeedback}
                >
                  Viết đánh giá đầu tiên
                </Button>
              )}
            </Empty>
          ) : (
            <>
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex gap-4">
                    <Avatar
                      src={feedback.userAvatar || undefined}
                      icon={!feedback.userAvatar && <UserOutlined />}
                      size={40}
                      className="bg-blue-600 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">
                          {feedback.userName || 'Người dùng'}
                        </span>
                        <Rate disabled value={feedback.rating} className="text-sm" />
                      </div>
                      <p className="text-gray-700 mb-2 leading-relaxed">
                        {feedback.comment}
                      </p>
                      <span className="text-gray-400 text-xs">
                        {dayjs(feedback.createdAt).format('DD/MM/YYYY HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced Pagination */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Hiển thị <span className="font-medium">{Math.min(pagination.pageSize * (pagination.current - 1) + 1, pagination.total)}</span> - <span className="font-medium">{Math.min(pagination.pageSize * pagination.current, pagination.total)}</span> trong tổng số <span className="font-medium">{pagination.total}</span> đánh giá
                    {selectedRatingFilter && ` (tìm kiếm ${selectedRatingFilter} sao)`}
                  </div>

                  <Pagination
                    current={pagination.current}
                    total={pagination.total}
                    pageSize={pagination.pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    size="default"
                    showTotal={(total) =>
                      `Trang ${pagination.current} / ${Math.ceil(total / pagination.pageSize)}`
                    }
                    className="flex-shrink-0"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Write Review Modal */}
      <Modal
        title="Viết đánh giá"
        open={isModalVisible}
        onOk={handleSubmitFeedback}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={submitting}
        okText="Gửi đánh giá"
        cancelText="Hủy"
        width={600}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá của bạn
            </label>
            <Rate
              value={newFeedback.rating}
              onChange={(value) => setNewFeedback({ ...newFeedback, rating: value })}
              className="text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chia sẻ trải nghiệm của bạn
            </label>
            <TextArea
              value={newFeedback.comment}
              onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
              placeholder="Hãy chia sẻ cảm nghĩ của bạn về nơi này..."
              rows={4}
              maxLength={500}
              showCount
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackSection;