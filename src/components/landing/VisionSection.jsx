import React, { useState, useEffect } from 'react';
import { Rate, Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, StarFilled, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { feedbackApi } from '../../api/feedback.api';
import FeedbackModal from '../feedback/FeedbackModal';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const AppFeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.profile);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await feedbackApi.getFeedbacks();

      // Response structure: { success: true, message: "", data: [...] }
      if (response?.success && response?.data) {
        // Chỉ lấy 6 feedback đầu tiên cho landing page
        setFeedbacks(response.data.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const FeedbackCard = ({ feedback }) => (
    <div className="px-3">
      <div className="bg-white rounded-2xl p-6 h-72 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-orange-50 rounded-bl-full opacity-50"></div>

        {/* Quote icon */}
        <div className="absolute top-4 right-4 text-blue-100">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>

        {/* User Info */}
        <div className="flex items-start mb-6">
          <div className="relative flex-shrink-0">
            <Avatar
              size={64}
              src={feedback.avatarUrl ? feedback.avatarUrl : null}
              icon={feedback.avatarUrl ? null : <UserOutlined />}
              className="border-3 border-blue-100 shadow-lg !bg-[#1279a1]"
            />
            {/* Online status dot */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-3 border-white rounded-full shadow-sm"></div>
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 text-lg mb-1 truncate">{feedback.fullName ? feedback.fullName : "Người dùng ẩn danh"}</h4>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{dayjs(feedback.createdAt).format('DD/MM/YYYY')}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex items-center">
            <Rate
              disabled
              defaultValue={feedback.rating}
              character={<StarFilled style={{ fontSize: '18px' }} />}
              className="text-yellow-400"
            />
            <span className="ml-3 text-lg font-bold text-gray-800">
              {feedback.rating}.0
            </span>
          </div>
        </div>

        {/* Comment */}
        <div className="relative">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 italic">
            "{feedback.feedbackText}"
          </p>
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400"></div>
      </div>
    </div>
  );

  const handleViewMore = () => {
    navigate('/feedbacks');
  };

  const handleOpenFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackSuccess = () => {
    // Refresh feedbacks after successful submission
    fetchFeedbacks();
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="text-center mb-8">
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
            Đánh giá từ người dùng
          </span>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight max-w-4xl mx-auto">
            <span className="text-blue-600">Những phản hồi tích cực từ </span>
            <span className="text-orange-500">cộng đồng</span>
            <span className="text-blue-600"> CoHabit</span>
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Khám phá những trải nghiệm tuyệt vời mà người dùng đã có với CoHabit.
            Mỗi đánh giá là một câu chuyện về sự tin tưởng và hài lòng.
          </p>
        </div>

        {/* Feedback Carousel */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Đang tải đánh giá...</p>
          </div>
        ) : feedbacks.length > 0 ? (
          <div className="mb-12">
            <Slider {...settings}>
              {feedbacks.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))}
            </Slider>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có đánh giá nào.</p>
          </div>
        )}

        {/* View More Button */}
        {feedbacks.length > 0 && (
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                type="primary"
                size="large"
                onClick={handleViewMore}
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 px-8 py-2 h-12 rounded-lg font-medium"
              >
                Xem tất cả đánh giá
              </Button>
              <Button
                icon={<EditOutlined />}
                size="large"
                onClick={handleOpenFeedbackModal}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-2 h-12 rounded-lg font-medium"
              >
                Viết đánh giá
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        visible={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSuccess={handleFeedbackSuccess}
      />
    </section>
  );
};

export default AppFeedbackSection;
