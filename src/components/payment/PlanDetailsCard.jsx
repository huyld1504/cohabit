import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

const PlanDetailsCard = ({
  plan = 'PLUS',
  features = [],
  variant = 'plus'
}) => {
  const isPlus = variant === 'plus';

  const cardStyles = isPlus
    ? 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30'
    : 'bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30';

  const headerStyles = isPlus
    ? 'bg-blue-500/30 border-blue-400/40'
    : 'bg-yellow-500/30 border-yellow-400/40';

  return (
    <div className={`${cardStyles} rounded-xl overflow-hidden`}>
      {/* Header */}
      <div className={`${headerStyles} border-b px-6 py-4`}>
        <h3 className="text-white font-bold text-center text-lg">
          Đặc quyền gói {plan}
        </h3>
      </div>

      {/* Features List */}
      <div className="p-6">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="text-white text-sm leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsCard;