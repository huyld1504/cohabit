import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const PostStatsCard = ({
  title,
  value,
  icon,
  iconColor = '#1279a2',
  iconBgColor = '#e6f3ff'
}) => {
  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm"
      bodyStyle={{ padding: '20px' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-0">{value}</p>
        </div>

        <div
          className="flex items-center justify-center w-12 h-12 rounded-lg"
          style={{
            backgroundColor: iconBgColor,
            color: iconColor
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

PostStatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string,
  iconBgColor: PropTypes.string,
};

export default PostStatsCard;
