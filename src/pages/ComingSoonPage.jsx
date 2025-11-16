import React, { useState } from 'react';
import { Button, Input, message, Typography } from 'antd';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ComingSoonPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailSubscription = () => {
    if (!email) {
      message.warning('Vui lòng nhập email của bạn');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error('Email không hợp lệ');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      message.success('Cảm ơn bạn! Chúng tôi sẽ thông báo khi tính năng ra mắt');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Back button */}
      <div className="p-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100"
        >
          Quay lại
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          {/* Main heading */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="text-2xl">🚀</span>
            </div>

            <Title level={1} className="!text-3xl md:!text-4xl !font-bold !text-gray-800 !mb-4">
              Tính Năng Mới Sắp Ra Mắt
            </Title>

            <Text className="text-lg text-gray-600">
              Chúng tôi đang phát triển những tính năng tuyệt vời cho bạn.
            </Text>
          </div>

          {/* Email subscription */}
          <div className="mb-8">
            {!isSubscribed ? (
              <div className="space-y-4">
                <Text className="text-gray-600 block">
                  Nhập email để nhận thông báo khi ra mắt:
                </Text>

                <div className="flex gap-2">
                  <Input
                    size="large"
                    placeholder="email@example.com"
                    prefix={<MailOutlined className="text-gray-400" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onPressEnter={handleEmailSubscription}
                    className="flex-1"
                  />
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleEmailSubscription}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-green-600 text-2xl mb-2">✓</div>
                <Text className="text-green-700 font-medium">
                  Cảm ơn bạn đã đăng ký! Chúng tôi sẽ thông báo sớm nhất.
                </Text>
              </div>
            )}
          </div>

          {/* Simple feature list */}
          <div className="text-left bg-white rounded-lg p-6 shadow-sm">
            <Title level={4} className="!mb-4 text-center">Những gì đang chờ đợi bạn:</Title>
            <ul className="space-y-2 text-gray-600">
              <li>• Giao diện người dùng được cải thiện</li>
              <li>• Tính năng tìm kiếm nâng cao</li>
              <li>• Hệ thống thông báo thông minh</li>
              <li>• Và nhiều tính năng khác...</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <Text className="text-gray-400 text-sm">
          © 2025 Cohabit. Tất cả quyền được bảo lưu.
        </Text>
      </div>
    </div>
  );
};

export default ComingSoonPage;