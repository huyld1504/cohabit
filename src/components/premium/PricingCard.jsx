import React from 'react';
import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({
  plan,
  price,
  period = 'tháng',
  features = [],
  buttonText = 'Đăng ký gói',
  variant = 'plus', // 'plus' or 'pro'
}) => {
  const navigate = useNavigate();
  const isPlus = variant === 'plus';

  const handleSubscribe = () => {
      // Navigate to payment page
      navigate(`/payment/${variant}`);
  };

  // Color schemes
  const cardStyles = isPlus
    ? 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30'
    : 'bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30';

  const buttonStyles = isPlus
    ? 'bg-white text-blue-600 hover:bg-blue-50 border-0'
    : 'bg-white text-yellow-600 hover:bg-yellow-50 border-0';

  return (
    <div className={`${cardStyles} rounded-xl p-8 text-white relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Plan name */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">{plan}</h3>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-1">
            {price} {period}
          </div>
        </div>

        {/* Subscribe button */}
        <div className="mb-8">
          <Button
            size="large"
            className={`w-full ${buttonStyles} font-semibold py-3 h-12 rounded-lg`}
            onClick={handleSubscribe}
          >
            {buttonText}
          </Button>
        </div>

        {/* Features list */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckOutlined className="text-white mt-1 text-sm flex-shrink-0" />
              <span className="text-sm text-white/90 leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;