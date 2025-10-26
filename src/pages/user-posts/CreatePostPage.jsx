import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Alert, Button } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import CreatePostForm from '../../components/user-posts/forms/CreatePostForm';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userPlan] = useState('basic'); // Mock user plan - should come from Redux/API

  // Mock check user plan - replace with actual logic
  const hasRequiredPlan = userPlan === 'plus' || userPlan === 'pro';

  const handleUpgradePlan = () => {
    navigate('/premium');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {hasRequiredPlan ? (
        <div className="flex items-center justify-center min-h-screen p-6">
          <Alert
            message="Yêu cầu nâng cấp gói"
            description={
              <div className="space-y-4">
                <p className="text-gray-600">
                  Để tạo bài đăng, bạn cần nâng cấp lên gói <strong>Plus</strong> hoặc <strong>Pro</strong>.
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Lợi ích khi nâng cấp:</p>
                  <ul className="text-left text-sm text-gray-600 max-w-md mx-auto">
                    <li>• Tạo không giới hạn bài đăng</li>
                    <li>• Ưu tiên hiển thị trong kết quả tìm kiếm</li>
                    <li>• Hỗ trợ khách hàng 24/7</li>
                    <li>• Thống kê chi tiết lượt xem</li>
                  </ul>
                </div>
                <Button
                  type="primary"
                  size="large"
                  icon={<CrownOutlined />}
                  onClick={handleUpgradePlan}
                  className="mt-4"
                >
                  Nâng cấp ngay
                </Button>
              </div>
            }
            type="warning"
            showIcon
            className="max-w-2xl"
          />
        </div>
      ) : (
        <div className="w-full p-6">
          {/* Bỏ giới hạn chiều cao để form hiển thị đầy đủ */}
          <div className="bg-white rounded-lg shadow-sm">
            <CreatePostForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostPage;