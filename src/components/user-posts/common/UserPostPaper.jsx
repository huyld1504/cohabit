import React from 'react';
import { Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const UserPostPaper = ({
  title,
  subtitle,
  children,
  extra,
  headerAction,
  showCreateButton = false,
  onCreatePost,
  className = '',
  bodyClassName = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="w-full bg-white shadow-sm">
        {/* Header Section */}
        {(title || subtitle || extra || headerAction || showCreateButton) && (
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <div className="flex-1">
                {title && (
                  <Title level={2} className="!mb-2 !text-gray-900 !font-semibold">
                    {title}
                  </Title>
                )}
                {subtitle && (
                  <Text className="text-gray-600 text-sm">
                    {subtitle}
                  </Text>
                )}
              </div>

              {(extra || headerAction || showCreateButton) && (
                <div className="flex items-center space-x-3">
                  {extra}
                  {showCreateButton && (
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={onCreatePost}
                      className="bg-blue-600 hover:bg-blue-700 border-0"
                      size="large"
                    >
                      Tạo bài đăng
                    </Button>
                  )}
                  {headerAction}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className={`p-6 ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

UserPostPaper.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  extra: PropTypes.node,
  headerAction: PropTypes.node,
  showCreateButton: PropTypes.bool,
  onCreatePost: PropTypes.func,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
};

export default UserPostPaper;