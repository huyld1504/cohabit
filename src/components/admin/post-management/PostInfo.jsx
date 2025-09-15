import React from 'react';
import { FileImageOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const PostInfo = ({ thumbnail, title, description }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-16 h-16 flex-shrink-0">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
            <FileImageOutlined className="text-2xl text-gray-400" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-medium text-gray-900 truncate mb-1">{title}</h4>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

PostInfo.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PostInfo;
