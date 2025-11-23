import React, { useState, useEffect } from 'react';
import { Rate, Avatar, Card, Typography, Spin, Empty } from 'antd';
import { UserOutlined, StarFilled, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { feedbackApi } from '../../api/feedback.api';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const { Title, Paragraph } = Typography;

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllFeedbacks();
  }, []);

  const fetchAllFeedbacks = async () => {
    try {
      setLoading(true);
      // Lấy tất cả feedback (không giới hạn pageSize)
      const response = await feedbackApi.getFeedbacks();
      
      if (response?.success && response?.data) {
        setFeedbacks(response.data);
      }
    } catch (error) {
      console.error('Error fetching all feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const FeedbackCard = ({ feedback }) => (
    <Card
      className="w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] rounded-2xl border-0 mb-6"
      bodyStyle={{ padding: '32px' }}
    >
      <div className="flex items-start gap-6 relative">
        {/* Quote icon */}
        <div className="absolute top-0 right-0 text-blue-100">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        {/* Left: Avatar and User Info */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Avatar 
              size={80}
              src={feedback.avatarUrl}
              icon={!feedback.avatarUrl && <UserOutlined />}
              className="border-4 border-blue-100 shadow-lg"
            />
            {/* Online status dot */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 border-3 border-white rounded-full shadow-sm"></div>
          </div>
        </div>

        {/* Middle: User Details and Rating */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-xl mb-2">{feedback.fullName}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{dayjs(feedback.createdAt).format('DD/MM/YYYY HH:mm')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Thành viên CoHabit</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <Rate 
              disabled 
              defaultValue={feedback.rating} 
              character={<StarFilled style={{ fontSize: '20px' }} />}
              className="text-yellow-400 mr-3"
            />
            <span className="text-lg font-bold text-gray-800 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1 rounded-lg">
              {feedback.rating}.0/5
            </span>
          </div>

          {/* Feedback Text */}
          <div className="bg-gray-50 rounded-xl p-4 relative">
            <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-50 transform rotate-45"></div>
            <p className="text-gray-700 text-base leading-relaxed italic">
              "{feedback.feedbackText}"
            </p>
          </div>
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 rounded-b-2xl"></div>
      </div>
    </Card>
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  // Tính toán stats
  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  const ratingCounts = feedbacks.reduce((acc, feedback) => {
    acc[feedback.rating] = (acc[feedback.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button
              onClick={handleGoBack}
              className="mr-4 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex-shrink-0"
            >
              <ArrowLeftOutlined className="text-xl text-gray-700" />
            </button>
            <div className="flex-1">
              <Title level={2} className="!mb-2 !text-gray-900">
                Tất cả đánh giá về CoHabit
              </Title>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {!loading && feedbacks.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{feedbacks.length}</div>
                <div className="text-gray-600">Tổng số đánh giá</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">{averageRating}</div>
                <div className="text-gray-600">Điểm trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {Math.round((ratingCounts[5] || 0) / feedbacks.length * 100)}%
                </div>
                <div className="text-gray-600">Đánh giá 5 sao</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="text-center py-20">
            <Spin size="large" />
            <p className="text-gray-500 mt-4">Đang tải đánh giá...</p>
          </div>
        ) : feedbacks.length > 0 ? (
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Empty
              description="Chưa có đánh giá nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackListPage;