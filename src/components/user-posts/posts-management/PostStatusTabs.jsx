import React from 'react';
import { Tabs, Badge } from 'antd';
import PropTypes from 'prop-types';

const PostStatusTabs = ({
  activeTab,
  onTabChange,
  pendingCount = 0,
  approvedCount = 0,
  rejectedCount = 0
}) => {
  const tabItems = [
    {
      key: 'pending',
      label: (
        <div className="flex items-center space-x-2">
          <span>Chờ duyệt</span>
          {pendingCount > 0 && (
            <Badge
              count={pendingCount}
              className="bg-orange-500"
              size="small"
            />
          )}
        </div>
      ),
    },
    {
      key: 'approved',
      label: (
        <div className="flex items-center space-x-2">
          <span>Đã duyệt</span>
          {approvedCount > 0 && (
            <Badge
              count={approvedCount}
              className="bg-green-500"
              size="small"
            />
          )}
        </div>
      ),
    },
    {
      key: 'rejected',
      label: (
        <div className="flex items-center space-x-2">
          <span>Từ chối</span>
          {rejectedCount > 0 && (
            <Badge
              count={rejectedCount}
              className="bg-red-500"
              size="small"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={onTabChange}
      items={tabItems}
      className="post-status-tabs"
      size="large"
      type="card"
      tabBarStyle={{
        marginBottom: '24px',
        borderBottom: 'none',
      }}
    />
  );
};

PostStatusTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  pendingCount: PropTypes.number,
  approvedCount: PropTypes.number,
  rejectedCount: PropTypes.number,
};

export default PostStatusTabs;