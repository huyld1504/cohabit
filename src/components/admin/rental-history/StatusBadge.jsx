import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const StatusBadge = ({ status, text }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'đang thuê':
        return {
          color: 'success',
          text: text || 'Đang thuê'
        };
      case 'completed':
      case 'hoàn thành':
        return {
          color: 'default',
          text: text || 'Hoàn thành'
        };
      case 'available':
      case 'còn trống':
        return {
          color: 'warning',
          text: text || 'Còn trống'
        };
      case 'cancelled':
      case 'đã hủy':
        return {
          color: 'error',
          text: text || 'Đã hủy'
        };
      default:
        return {
          color: 'default',
          text: text || status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Tag color={config.color} className="font-medium">
      {config.text}
    </Tag>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default StatusBadge;
