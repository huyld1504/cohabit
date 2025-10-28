import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, List, Typography, message } from 'antd';
import { CheckOutlined, ArrowLeftOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { paymentAPI } from '../../api/payment.api';
import { PAYMENT_PACKAGES, PAYMENT_CONSTANTS } from '../../constants/payment.constant';
import { API_CONSTANTS } from '../../constants/api.constant';

const { Title, Text } = Typography;

const PaymentDetailSection = () => {
  const { plan } = useParams(); // 'plus' or 'pro'
  const navigate = useNavigate();
  const { profile } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  // Plan data
  const planData = {
    plus: {
      name: 'PLUS',
      displayName: 'Gói PLUS',
      price: '30,000đ',
      period: '1 tháng',
      amount: 30000,
      subscriptionId: 1,
      features: [
        'Tính năng tìm bạn ở ghép',
        'Có thể nhận tin trực tiếp trong hệ thống (chatbot)',
        'Lọc nâng cao'
      ],
      bgClass: 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30',
      badgeClass: 'bg-blue-500',
      description: 'Gói cơ bản phù hợp cho người mới bắt đầu tìm bạn ở ghép.'
    },
    pro: {
      name: 'PRO',
      displayName: 'Gói PRO',
      price: '80,000đ',
      period: '1 tháng',
      amount: 80000,
      subscriptionId: 2,
      features: [
        'Tính năng tìm bạn ở ghép',
        'Có thể nhận tin trực tiếp trong hệ thống (chatbot)',
        'Lọc nâng cao',
        'Đăng nhiều tin nhà trọ cùng lúc không bị giới hạn',
        'Tin được ưu tiên hiển thị trên đầu có biểu tượng',
        'Quản lí nhà trọ được thuê'
      ],
      bgClass: 'bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30',
      badgeClass: 'bg-yellow-500',
      description: 'Gói cao cấp dành cho người dùng chuyên nghiệp với đầy đủ tính năng.'
    }
  };

  const currentPlan = planData[plan] || planData.plus;

  const handleConfirmPayment = async () => {
    if (!profile) {
      message.warning('Vui lòng đăng nhập để tiếp tục');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      const description = `Premium Package ${currentPlan.name}`;

      const paymentData = {
        amount: currentPlan.amount,
        description,
        subscriptionId: currentPlan.subscriptionId,
        returnUrl: `${API_CONSTANTS.API_URL}/v1/Payment/update-status`,
        cancelUrl: `${API_CONSTANTS.API_URL}/v1/Payment/update-status`
      };

      const response = await paymentAPI.createPayment(paymentData);

      if (response && response.paymentId && response.checkoutUrl) {
        // Save payment ID to localStorage
        localStorage.setItem(PAYMENT_CONSTANTS.PENDING_PAYMENT_KEY, response.paymentId);

        // Open checkout URL in new tab
        window.open(response.checkoutUrl, '_blank');

        // Navigate to payment status page
        navigate('/premium/payment');
      } else {
        message.error('Không thể tạo thanh toán. Vui lòng thử lại.');
      }
    } catch {
      message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Payment Detail Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Plan Details */}
          <div className={`${currentPlan.bgClass} rounded-xl p-8 text-white relative overflow-hidden`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className={`inline-block px-4 py-2 rounded-full ${currentPlan.badgeClass} text-white font-semibold mb-4`}>
                  {currentPlan.displayName}
                </div>
                <Title level={1} className="!text-white mb-2">
                  {currentPlan.price}
                  <span className="!text-lg font-normal">/{currentPlan.period}</span>
                </Title>
                <Text className="!text-white/90 block">
                  {currentPlan.description}
                </Text>
              </div>

              <List
                dataSource={currentPlan.features}
                renderItem={(feature) => (
                  <List.Item className="border-0 px-0">
                    <div className="flex items-start space-x-3">
                      <CheckOutlined className="!text-white mt-1 text-sm flex-shrink-0" />
                      <Text className="!text-white/90 leading-relaxed">
                        {feature}
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/3 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Tóm tắt thanh toán</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <Text className="!text-white font-medium">Gói dịch vụ:</Text>
                  <Text className="!text-white">{currentPlan.displayName}</Text>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <Text className="!text-white font-medium">Giá:</Text>
                  <Text className="!text-white">{currentPlan.price}</Text>
                </div>

                <div className="flex justify-between items-center py-2">
                  <Text className="!text-white font-medium">Thời hạn:</Text>
                  <Text className="!text-white">{currentPlan.period}</Text>
                </div>

                <div className="flex justify-between items-center py-4 border-t-2 border-gray-300">
                  <Text className="text-lg !text-white font-bold">Tổng cộng:</Text>
                  <Text className="text-lg !text-blue-600 font-bold">
                    {currentPlan.price}
                  </Text>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleConfirmPayment}
                  loading={loading}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 border-0 h-12 text-base font-semibold"
                >
                  {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
                </Button>               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailSection;