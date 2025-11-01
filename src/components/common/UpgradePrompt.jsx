import React from 'react';
import { Card, Button, Typography, Space } from 'antd';
import { CrownOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';
import { USER_ROLES } from '../../constants/roles.constant';

const { Title, Text, Paragraph } = Typography;

const UpgradePrompt = ({ requiredRole, feature }) => {
  const navigate = useNavigate();
  const { userRole } = useRole();

  const getUpgradeMessage = () => {
    switch (requiredRole) {
      case USER_ROLES.PLUS_MEMBER:
        return {
          title: 'Nâng cấp lên Plus',
          description: 'Để sử dụng tính năng này, bạn cần nâng cấp tài khoản lên Plus',
          features: [
            'Đăng bài cho thuê không giới hạn',
            'Quản lý bài đăng chi tiết',
            'Nhắn tin với chủ nhà',
            'Xem thống kê chi tiết',
            'Hỗ trợ ưu tiên'
          ],
          plan: 'plus'
        };
      case USER_ROLES.PRO_MEMBER:
        return {
          title: 'Nâng cấp lên Pro',
          description: 'Để sử dụng tính năng nâng cao này, bạn cần nâng cấp tài khoản lên Pro',
          features: [
            'Tất cả tính năng Plus',
            'Ẩn/hiện bài đăng linh hoạt',
            'Chỉnh sửa bài đăng không giới hạn',
            'Thống kê và phân tích nâng cao',
            'Ưu tiên hiển thị bài đăng',
            'Hỗ trợ 24/7'
          ],
          plan: 'pro'
        };
      case USER_ROLES.ADMIN:
        return {
          title: 'Quyền truy cập bị từ chối',
          description: 'Tính năng này chỉ dành cho quản trị viên',
          features: [],
          plan: null
        };
      default:
        return {
          title: 'Nâng cấp lên Plus',
          description: 'Để sử dụng tính năng này, bạn cần nâng cấp tài khoản lên Plus',
          features: [
            'Đăng bài cho thuê không giới hạn',
            'Quản lý bài đăng chi tiết',
            'Nhắn tin với chủ nhà',
            'Xem thống kê chi tiết',
            'Hỗ trợ ưu tiên'
          ],
          plan: 'plus'
        };
    }
  };

  const message = getUpgradeMessage();

  const handleUpgrade = () => {
    if (message.plan) {
      navigate(`/premium`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <div className="text-center mb-6">
          <CrownOutlined className="text-6xl text-yellow-500 mb-4" />
          <Title level={2} className="text-gray-800 mb-2">
            {message.title}
          </Title>
          <Paragraph className="text-gray-600 text-lg">
            {message.description}
          </Paragraph>
        </div>

        {message.features.length > 0 && (
          <div className="mb-6">
            <Title level={4} className="text-gray-800 mb-4">
              Bạn sẽ được:
            </Title>
            <ul className="space-y-2">
              {message.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center">
          <Space size="middle">
            <Button size="large" onClick={handleGoBack}>
              Quay lại
            </Button>
            {message.plan && (
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                onClick={handleUpgrade}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Nâng cấp ngay
              </Button>
            )}
          </Space>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-700 text-sm">
            <strong>Lưu ý:</strong> Việc nâng cấp sẽ giúp bạn tận dụng tối đa các tính năng của Cohabit.
            Bạn có thể hủy nâng cấp bất cứ lúc nào.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default UpgradePrompt;