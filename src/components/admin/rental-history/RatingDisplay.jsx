import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const RatingDisplay = ({ rating, text }) => {
  const getRatingConfig = (rating) => {
    switch (rating.toLowerCase()) {
      case 'good':
      case 'tốt':
        return {
          color: 'success',
          text: text || 'Tốt'
        };
      case 'fair':
      case 'tạm':
        return {
          color: 'warning',
          text: text || 'Tạm'
        };
      case 'poor':
      case 'kém':
        return {
          color: 'error',
          text: text || 'Kém'
        };
      default:
        return {
          color: 'default',
          text: text || rating
        };
    }
  };

  const config = getRatingConfig(rating);

  return (
    <Tag color={config.color} className="font-medium">
      {config.text}
    </Tag>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default RatingDisplay;
