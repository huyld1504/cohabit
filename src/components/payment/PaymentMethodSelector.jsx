import React from 'react';
import { Radio } from 'antd';

const PaymentMethodSelector = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
  variant = 'plus'
}) => {
  const isPlus = variant === 'plus';

  const radioStyles = isPlus
    ? 'text-white [&_.ant-radio-checked_.ant-radio-inner]:bg-blue-500 [&_.ant-radio-checked_.ant-radio-inner]:border-blue-500'
    : 'text-white [&_.ant-radio-checked_.ant-radio-inner]:bg-yellow-500 [&_.ant-radio-checked_.ant-radio-inner]:border-yellow-500';

  return (
    <div className="space-y-3">
      <h4 className="text-white font-medium text-sm mb-4">
        Chọn phương thức thanh toán :
      </h4>

      <Radio.Group
        value={selectedPaymentMethod}
        onChange={(e) => onPaymentMethodChange(e.target.value)}
        className={radioStyles}
      >
        <div className="space-y-3">
          {/* MoMo */}
          <div className="flex items-center">
            <Radio value="momo" className="text-white">
              <div className="flex items-center space-x-2 ml-2">
                <span className="text-white text-sm">Ví MoMo</span>
                <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              </div>
            </Radio>
          </div>

          {/* ZaloPay */}
          <div className="flex items-center">
            <Radio value="zalopay" className="text-white">
              <div className="flex items-center space-x-2 ml-2">
                <span className="text-white text-sm">Ví ZaloPay</span>
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Z</span>
                </div>
              </div>
            </Radio>
          </div>
        </div>
      </Radio.Group>
    </div>
  );
};

export default PaymentMethodSelector;