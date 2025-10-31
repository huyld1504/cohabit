import React, { useState } from 'react';
import { Button, Card, Space, Modal, Form, Input, DatePicker, message } from 'antd';
import { PhoneOutlined, MessageOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../../hooks/useRole';
import { useChatContext } from '../../../contexts/ChatContext';

const BookingSection = ({ property }) => {
  const navigate = useNavigate();
  const { isPlusMember } = useRole();
  const { createOrGetConversation } = useChatContext();

  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [form] = Form.useForm();

  const handleBookingSubmit = (values) => {
    console.log('Booking data:', values);
    message.success('Yêu cầu thuê phòng đã được gửi thành công!');
    setBookingModalVisible(false);
    form.resetFields();
  };

  const handleContactOwner = () => {
    setContactModalVisible(true);
  };

  const handleConfirmRental = async () => {
    // Check if user has Plus/Pro membership
    if (!isPlusMember()) {
      console.log('❌ User does not have Plus/Pro membership');
      setUpgradeModalVisible(true);
      return;
    }

    try {
      setIsCreatingConversation(true);
      console.log('🆕 Creating conversation for post:', property.id);

      // Create or get existing conversation
      const conversation = await createOrGetConversation(property.id);

      if (conversation) {
        console.log('✅ Conversation created:', conversation.conversationId);
        message.success('Đang chuyển đến tin nhắn...');

        // Navigate to chat page with conversationId
        navigate(`/chat?conversationId=${conversation.conversationId}`);
      } else {
        message.error('Không thể tạo cuộc trò chuyện. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('❌ Error creating conversation:', error);
      message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsCreatingConversation(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <>
      <Card className="w-full sticky top-4">
        <Space direction="vertical" size="large" className="w-full">
          {/* Price Display */}
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {formatPrice(property.price)}/tháng
            </div>
            <div className="text-sm text-gray-500">
              Đã bao gồm tiện ích cơ bản
            </div>
          </div>

          {/* Action Buttons */}
          <Space direction="vertical" size="middle" className="w-full">
            <Button
              type="primary"
              size="large"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleConfirmRental}
              loading={isCreatingConversation}
              icon={<MessageOutlined />}
            >
              Xác nhận thuê
            </Button>

            <Button
              type="default"
              size="large"
              className="w-full"
              onClick={handleContactOwner}
              icon={<PhoneOutlined />}
            >
              Liên hệ chủ nhà
            </Button>

            <Button
              type="default"
              size="large"
              className="w-full"
              icon={<MessageOutlined />}
            >
              Nhắn tin
            </Button>
          </Space>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Thông tin quan trọng:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tiền cọc: 1 tháng tiền thuê</li>
              <li>• Thanh toán trước: 1 tháng</li>
              <li>• Hợp đồng tối thiểu: 3 tháng</li>
              <li>• Xem phòng miễn phí</li>
            </ul>
          </div>

          {/* Safety Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Lưu ý:</strong> Chỉ thanh toán sau khi đã xem phòng và ký hợp đồng.
              Tránh các giao dịch đáng ngờ.
            </p>
          </div>
        </Space>
      </Card>

      {/* Booking Modal */}
      <Modal
        title="Xác nhận thuê phòng"
        open={bookingModalVisible}
        onCancel={() => setBookingModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleBookingSubmit}
          className="mt-4"
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ và tên của bạn" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>

          <Form.Item
            name="moveInDate"
            label="Ngày dự kiến chuyển vào"
            rules={[{ required: true, message: 'Vui lòng chọn ngày chuyển vào!' }]}
          >
            <DatePicker className="w-full" placeholder="Chọn ngày" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Tin nhắn (tùy chọn)"
          >
            <Input.TextArea
              rows={3}
              placeholder="Gửi lời nhắn đến chủ nhà..."
            />
          </Form.Item>

          <div className="flex space-x-3">
            <Button
              onClick={() => setBookingModalVisible(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="flex-1 bg-blue-600"
            >
              Gửi yêu cầu
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Contact Modal */}
      <Modal
        title="Thông tin liên hệ"
        open={contactModalVisible}
        onCancel={() => setContactModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setContactModalVisible(false)}>
            Đóng
          </Button>
        ]}
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Chủ nhà: Nguyễn Văn A</h4>
            <p className="text-gray-600">Đã xác minh danh tính</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <PhoneOutlined className="text-blue-600" />
              <span className="font-medium">0901 234 567</span>
              <Button size="small" type="link">Gọi ngay</Button>
            </div>

            <div className="flex items-center space-x-2">
              <MessageOutlined className="text-green-600" />
              <span>Zalo: 0901 234 567</span>
              <Button size="small" type="link">Nhắn tin</Button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Thời gian liên hệ tốt nhất:</strong> 8:00 - 22:00 hàng ngày
            </p>
          </div>
        </div>
      </Modal>

      {/* Upgrade Modal - Plus/Pro Required */}
      <Modal
        open={upgradeModalVisible}
        onCancel={() => setUpgradeModalVisible(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: '700px' }}
        centered
      >
        <div className="text-center py-4">
          <div className="mb-6">
            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Tính năng chat chỉ dành cho thành viên Plus & Pro
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Nâng cấp tài khoản để sử dụng tính năng nhắn tin trực tiếp với chủ nhà
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Plus Package */}
            <div className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg h-full">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-3">
                  PHỔ BIẾN
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Plus</h3>
                <div className="mb-4">
                  <span className="text-2xl md:text-4xl font-bold text-gray-900">30,000đ</span>
                  <span className="text-sm md:text-base text-gray-600">/tháng</span>
                </div>
                <ul className="text-left space-y-2 text-xs md:text-sm text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-0.5">✓</span>
                    <span>Tìm kiếm nâng cao với bộ lọc chi tiết</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-0.5">✓</span>
                    <span>Nhắn tin trực tiếp với chủ nhà</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-0.5">✓</span>
                    <span>Xem trước thông tin chi tiết</span>
                  </li>
                </ul>
              </div>
              <Button
                type="primary"
                size="large"
                className="w-full bg-blue-600 hover:bg-blue-700 mt-auto"
                onClick={() => {
                  setUpgradeModalVisible(false);
                  navigate('/premium/payment-detail/plus');
                }}
              >
                Chọn gói Plus
              </Button>
            </div>

            {/* Pro Package */}
            <div className="flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-lg h-full">
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full mb-3">
                  KHUYẾN NGHỊ
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-2xl md:text-4xl font-bold text-gray-900">80,000đ</span>
                  <span className="text-sm md:text-base text-gray-600">/tháng</span>
                </div>
                <ul className="text-left space-y-2 text-xs md:text-sm text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-0.5">✓</span>
                    <span>Tất cả tính năng của Plus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-0.5">✓</span>
                    <span>Ưu tiên hiển thị tin đăng</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-0.5">✓</span>
                    <span>Hỗ trợ khách hàng 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 mt-0.5">✓</span>
                    <span>Phân tích chi tiết thị trường</span>
                  </li>
                </ul>
              </div>
              <Button
                type="primary"
                size="large"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 mt-auto"
                onClick={() => {
                  setUpgradeModalVisible(false);
                  navigate('/premium/payment-detail/pro');
                }}
              >
                Chọn gói Pro
              </Button>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-500">
            Bạn có thể hủy đăng ký bất cứ lúc nào. Không có cam kết dài hạn.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default BookingSection;
