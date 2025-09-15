import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const PostStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'chờ duyệt':
      case 'pending':
        return {
          color: 'orange',
          text: 'Chờ duyệt'
        };
      case 'đã xuất bản':
      case 'published':
        return {
          color: 'success',
          text: 'Đã xuất bản'
        };
      case 'bị từ chối':
      case 'rejected':
        return {
          color: 'error',
          text: 'Bị từ chối'
        };
      case 'nháp':
      case 'draft':
        return {
          color: 'default',
          text: 'Nháp'
        };
      default:
        return {
          color: 'default',
          text: status
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
