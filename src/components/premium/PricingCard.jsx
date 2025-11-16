import React from 'react';
import { Button, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRole } from '../../hooks/useRole';

const PricingCard = ({
  plan,
  price,
  period = 'tháng',
  features = [],
  buttonText = 'Đăng ký gói',
  variant = 'plus',
}) => {
  const navigate = useNavigate();
  const { profile } = useSelector(state => state.user);
  const { isPlusMember, isProMember } = useRole();
  const isPlus = variant === 'plus';

  // Determine card state based on user membership
  const isCurrentPlan = (isPlus && isPlusMember() && !isProMember()) || (!isPlus && isProMember());
  const canUpgrade = isPlus && isProMember(); // Pro user viewing Plus card
  const canDowngrade = !isPlus && isPlusMember() && !isProMember(); // Plus user viewing Pro card
  const isDisabled = isCurrentPlan || canUpgrade;

  const getButtonText = () => {
    if (!profile) return 'Đăng nhập để đăng ký';
    if (isCurrentPlan) return 'Gói hiện tại';
    if (canUpgrade) return 'Gói hiện tại (Pro > Plus)';
    if (canDowngrade) return 'Nâng cấp lên Pro';
    return buttonText;
  };

  const handleSubscribe = () => {
    if (!profile) {
      message.warning('Vui lòng đăng nhập để đăng ký gói Premium');
      setTimeout(() => {
        navigate('/login', { state: { from: `/premium/payment-detail/${variant}` } });
      }, 500);
      return;
    }

    if (isDisabled) {
      if (isCurrentPlan) {
        message.info('Bạn đang sử dụng gói này');
      } else if (canUpgrade) {
        message.info('Bạn đang sử dụng gói Pro, không thể downgrade về Plus');
      }
      return;
    }

    // Navigate to payment detail page
    navigate(`/premium/payment-detail/${variant}`);
  };

  // Color schemes
  const getCardStyles = () => {
    if (isDisabled && !isCurrentPlan) {
      return 'bg-gray-500/20 backdrop-blur-sm border border-gray-400/30';
    }
    return isPlus
      ? 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30'
      : 'bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30';
  };

  const getButtonStyles = () => {
    if (isCurrentPlan) {
      return 'bg-green-500 text-white border-0 cursor-default';
    }
    if (isDisabled) {
      return 'bg-gray-300 text-gray-500 border-0 cursor-not-allowed';
    }
    return isPlus
      ? 'bg-white text-blue-600 hover:bg-blue-50 border-0'
      : 'bg-white text-yellow-600 hover:bg-yellow-50 border-0';
  };

  return (
    <div className={`${getCardStyles()} rounded-xl p-8 text-white relative overflow-hidden transition-all duration-300`}>
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          Gói hiện tại
        </div>
      )}

      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${isDisabled ? 'bg-gray-500/10' : 'bg-white/10'} rounded-full -translate-y-16 translate-x-16`}></div>
      <div className={`absolute bottom-0 left-0 w-24 h-24 ${isDisabled ? 'bg-gray-500/5' : 'bg-white/5'} rounded-full translate-y-12 -translate-x-12`}></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Plan name */}
        <div className="text-center mb-6">
          <h3 className={`text-2xl font-bold mb-2 ${isDisabled && !isCurrentPlan ? 'text-gray-300' : ''}`}>
            {plan}
          </h3>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <div className={`text-4xl font-bold mb-1 ${isDisabled && !isCurrentPlan ? 'text-gray-300' : ''}`}>
            {price} {period}
          </div>
        </div>

        {/* Subscribe button */}
        <div className="mb-8">
          <Button
            size="large"
            className={`w-full ${getButtonStyles()} font-semibold py-3 h-12 rounded-lg transition-all duration-200`}
            onClick={handleSubscribe}
            disabled={isDisabled}
          >
            {getButtonText()}
          </Button>
        </div>

        {/* Features list */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckOutlined className={`${isDisabled && !isCurrentPlan ? 'text-gray-400' : 'text-white'} mt-1 text-sm flex-shrink-0`} />
              <span className={`text-sm ${isDisabled && !isCurrentPlan ? 'text-gray-400' : 'text-white/90'} leading-relaxed`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Status Info */}
        {profile && (
          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="text-center text-sm">
              {isCurrentPlan && (
                <span className="text-green-300">✓ Bạn đang sử dụng gói này</span>
              )}
              {canUpgrade && (
                <span className="text-yellow-300">⚠ Bạn đã có gói cao hơn</span>
              )}
              {!isPlusMember() && !isProMember() && (
                <span className="text-blue-300">🚀 Sẵn sàng nâng cấp</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCard;