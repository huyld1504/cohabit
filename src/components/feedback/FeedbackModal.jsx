import React, { useState } from 'react';
import { Modal, Form, Input, Rate, Select, Button, message } from 'antd';
import { StarFilled, EditOutlined, LoginOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { feedbackApi } from '../../api/feedback.api';

const { TextArea } = Input;
const { Option } = Select;

const FeedbackModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.profile);
  const navigate = useNavigate();

  const favoriteFeatures = [
    'Realtime Chat',
    'Property Search',
    'User Profile',
    'Room Matching',
    'Rental Management',
    'Payment System',
    'Reviews System',
    'Map Integration',
    'Notifications',
    'Mobile Experience'
  ];

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const feedbackData = {
        feedbackText: values.feedbackText,
        rating: values.rating,
        experienceScore: values.experienceScore,
        mostFavoriteFeature: values.mostFavoriteFeature
      };

      const response = await feedbackApi.createFeedback(feedbackData);

      if (response?.success) {
        message.success('Cảm ơn bạn đã đánh giá! Phản hồi của bạn rất quan trọng với chúng tôi.');
        form.resetFields();
        onClose();
        if (onSuccess) onSuccess();
      } else {
        message.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Error creating feedback:', error);
      message.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const isLoggedIn = !!user;

  return (
    <Modal
      title={
        <div className="flex items-center">
          <EditOutlined className="mr-2 text-blue-600" />
          <span>Đánh giá CoHabit</span>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
      className="feedback-modal"
    >
      <div className="py-4 relative">
        {/* Login Required Overlay */}
        {!isLoggedIn && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <div className="mb-4">
                <LockOutlined className="text-6xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cần đăng nhập để đánh giá
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm">
                Bạn cần đăng nhập vào tài khoản CoHabit để có thể chia sẻ đánh giá và trải nghiệm của mình.
              </p>
              <div className="space-y-3">
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  size="large"
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Đăng nhập ngay
                </Button>
                <Button
                  size="large"
                  onClick={handleCancel}
                  className="w-full"
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className={`transition-all duration-300 ${!isLoggedIn ? 'opacity-30 pointer-events-none' : ''}`}>
          <p className="text-gray-600 mb-6">
            Chia sẻ trải nghiệm của bạn với CoHabit để giúp chúng tôi cải thiện dịch vụ tốt hơn!
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            {/* Đánh giá tổng thể */}
            <Form.Item
              label={<span className="font-semibold">Đánh giá tổng thể về CoHabit</span>}
              name="rating"
              rules={[{ required: true, message: 'Vui lòng chọn đánh giá!' }]}
            >
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Rate
                  character={<StarFilled style={{ fontSize: '24px' }} />}
                  className="text-yellow-400 text-2xl"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Chọn số sao để đánh giá
                </p>
              </div>
            </Form.Item>

            {/* Điểm trải nghiệm */}
            <Form.Item
              label={<span className="font-semibold">Điểm trải nghiệm người dùng</span>}
              name="experienceScore"
              rules={[{ required: true, message: 'Vui lòng chọn điểm trải nghiệm!' }]}
            >
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Rate
                  character={<StarFilled style={{ fontSize: '20px' }} />}
                  className="text-orange-400"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Đánh giá về trải nghiệm sử dụng ứng dụng
                </p>
              </div>
            </Form.Item>

            {/* Tính năng yêu thích */}
            <Form.Item
              label={<span className="font-semibold">Tính năng bạn yêu thích nhất</span>}
              name="mostFavoriteFeature"
              rules={[{ required: true, message: 'Vui lòng chọn tính năng yêu thích!' }]}
            >
              <Select
                placeholder="Chọn tính năng bạn thích nhất"
                size="large"
                showSearch
                optionFilterProp="children"
              >
                {favoriteFeatures.map((feature) => (
                  <Option key={feature} value={feature}>
                    {feature}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Nhận xét chi tiết */}
            <Form.Item
              label={<span className="font-semibold">Nhận xét chi tiết</span>}
              name="feedbackText"
              rules={[
                { required: true, message: 'Vui lòng viết nhận xét của bạn!' },
                { min: 10, message: 'Nhận xét phải có ít nhất 10 ký tự!' }
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Chia sẻ trải nghiệm chi tiết của bạn về CoHabit..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            {/* Buttons */}
            <Form.Item className="mb-0 pt-4">
              <div className="flex justify-end space-x-3">
                <Button
                  onClick={handleCancel}
                  size="large"
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;