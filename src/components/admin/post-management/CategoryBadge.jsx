import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const CategoryBadge = ({ category }) => {
  const getCategoryConfig = (category) => {
    switch (category.toLowerCase()) {
      case 'công nghiệp':
        return {
          color: 'blue',
          text: 'Công nghiệp'
        };
      case 'ẩm thực':
        return {
          color: 'green',
          text: 'Ẩm thực'
        };
      case 'du lịch':
        return {
          color: 'purple',
          text: 'Du lịch'
        };
      case 'bất động sản':
        return {
          color: 'orange',
          text: 'Bất động sản'
        };
      case 'giáo dục':
        return {
          color: 'cyan',
          text: 'Giáo dục'
        };
      default:
        return {
          color: 'default',
          text: category
        };
    }
  };

  const config = getCategoryConfig(category);

  return (
    <Tag color={config.color} className="font-medium">
      {config.text}
    </Tag>
  );
};

CategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryBadge;
