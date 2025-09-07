import React from 'react';
import {Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const AdminPaper = ({
  title,
  subtitle,
  children,
  extra,
  headerAction,
  className = '',
  bodyClassName = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex justify-center ${className}`}>
      <div className="w-full max-w-screen bg-white shadow-md m-10 rounded-lg">
        {/* Header Section */}
        {(title || subtitle || extra || headerAction) && (
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                {title && (
                  <Title level={2} className="!mb-2 !text-gray-800 !font-semibold">
                    {title}
                  </Title>
                )}
                {subtitle && (
                  <Text className="text-gray-600 text-base">
                    {subtitle}
                  </Text>
                )}
              </div>

              {(extra || headerAction) && (
                <div className="flex items-center space-x-2">
                  {extra}
                  {headerAction}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className={`p-8 ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

AdminPaper.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  extra: PropTypes.node,
  headerAction: PropTypes.node,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
};

export default AdminPaper;
