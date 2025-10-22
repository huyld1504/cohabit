import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const PostStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 0:
      case 'pending':
        return {
          color: 'orange',
          text: 'Đang chờ duyệt'
        };
      case 1:
      case 'publish':
      case 'published':
        return {
          color: 'success',
          text: 'Đang hoạt động'
        };
      case 2:
      case 'rejected':
        return {
          color: 'error',
          text: 'Đã từ chối'
        };
      case 3:
      case 'closed':
        return {
          color: 'default',
          text: 'Đã đóng'
        };
      case 4:
      case 'hidden':
        return {
          color: 'purple',
          text: 'Đã ẩn'
        };
      default:
        return {
          color: 'default',
          text: 'Không xác định'
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

PostStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default PostStatusBadge;
