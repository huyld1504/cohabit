import React from 'react';
import { Button } from 'antd';
import PaymentMethodSelector from './PaymentMethodSelector';

const PaymentDetailsCard = ({
  price = '30,000đ',
  selectedPaymentMethod,
  onPaymentMethodChange,
  onPayment,
  variant = 'plus'
}) => {
  const isPlus = variant === 'plus';

  const cardStyles = 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50';

  const buttonStyles = isPlus
    ? 'bg-blue-500 hover:bg-blue-600 border-0 h-12 text-base font-medium'
    : 'bg-yellow-500 hover:bg-yellow-600 border-0 h-12 text-base font-medium';

  const priceColor = isPlus ? 'text-blue-400' : 'text-yellow-400';

  return (
    <div className={`${cardStyles} rounded-xl overflow-hidden`}>
      {/* Header */}
      <div className="bg-gray-700/50 border-b border-gray-600/50 px-6 py-4">
        <h3 className="text-white font-bold text-center text-lg">
          Chi tiết thanh toán
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Price Summary */}
        <div className="border-b border-gray-600/30 pb-4">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm">Tổng thanh toán :</span>
            <span className={`${priceColor} text-2xl font-bold`}>
              {price}/tháng
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <PaymentMethodSelector
          selectedPaymentMethod={selectedPaymentMethod}
          onPaymentMethodChange={onPaymentMethodChange}
          variant={variant}
        />

        {/* Payment Button */}
        <div className="pt-4">
          <Button
            type="primary"
            className={buttonStyles}
            size="large"
            block
            onClick={onPayment}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;