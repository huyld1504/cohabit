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

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      // Simulate API call
      console.log('Creating post with data:', formData);

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      message.success('Tạo bài đăng thành công!');

      // Redirect to user posts management page
      navigate('/user/posts', { replace: true });

    } catch (error) {
      console.error('Error creating post:', error);
      message.error('Có lỗi xảy ra khi tạo bài đăng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
        <div className="max-w-4xl mx-auto p-6">
          {/* Sử dụng max-h-[80vh] để giới hạn chiều cao form là 80% viewport */}
          <div className="max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-sm">
            <CreatePostForm
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostPage;