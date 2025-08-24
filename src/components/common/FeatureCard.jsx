import React from 'react';
import { Card as AntCard } from 'antd';

const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <AntCard
      className={`rounded-xl shadow-sm border border-gray-100 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${className}`}
      {...props}
    >
      <div className="text-center">
        {icon && (
          <div className="text-4xl text-primary mb-4 flex justify-center">
            {icon}
          </div>
        )}
        {title && (
          <div className="text-lg font-bold mb-3 text-gray-800">
            {title}
          </div>
        )}
        {description && (
          <div className="text-gray-600 leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </AntCard>
  );
}; export default FeatureCard;
