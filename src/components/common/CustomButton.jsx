import React from 'react';
import { Button as AntButton } from 'antd';

const CustomButton = ({
  children,
  variant = 'primary',
  size = 'large',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary border-primary text-white hover:bg-blue-600';
      case 'secondary':
        return 'bg-gray-100 border-gray-100 text-gray-800 hover:bg-gray-200';
      case 'outline':
        return 'bg-transparent border-primary text-primary hover:bg-blue-50';
      case 'warning':
        return 'bg-warning border-warning text-black hover:bg-yellow-300';
      case 'text':
        return 'bg-transparent border-none text-gray-600 hover:bg-gray-100';
      default:
        return 'bg-primary border-primary text-white hover:bg-blue-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return 'h-12 px-8 text-base';
      case 'medium':
        return 'h-10 px-6 text-sm';
      case 'small':
        return 'h-8 px-4 text-xs';
      default:
        return 'h-12 px-8 text-base';
    }
  };

  return (
    <AntButton
      className={`rounded-lg font-medium transition-all ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {children}
    </AntButton>
  );
}; export default CustomButton;
