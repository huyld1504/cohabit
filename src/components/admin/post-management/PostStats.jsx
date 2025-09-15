import React from 'react';
import { Row, Col } from 'antd';
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import PostStatsCard from './PostStatsCard';
import PropTypes from 'prop-types';

const PostStats = ({
  totalPosts = 0,
  pendingPosts = 0,
  publishedPosts = 0,
  rejectedPosts = 0
}) => {
  const statsData = [
    {
      title: 'Tổng bài viết',
      value: totalPosts.toLocaleString(),
      icon: <FileTextOutlined className="text-xl" />,
      iconColor: '#1890ff',
      iconBgColor: '#e6f7ff'
    },
    {
      title: 'Chờ duyệt',
      value: pendingPosts.toLocaleString(),
      icon: <ClockCircleOutlined className="text-xl" />,
      iconColor: '#fa8c16',
      iconBgColor: '#fff7e6'
    },
    {
      title: 'Đã xuất bản',
      value: publishedPosts.toLocaleString(),
      icon: <CheckCircleOutlined className="text-xl" />,
      iconColor: '#52c41a',
      iconBgColor: '#f6ffed'
    },
    {
      title: 'Bị từ chối',
      value: rejectedPosts.toLocaleString(),
      icon: <CloseCircleOutlined className="text-xl" />,
      iconColor: '#ff4d4f',
      iconBgColor: '#fff2f0'
    }
  ];

  return (
    <div className="mb-6">
      <Row gutter={[16, 16]}>
        {statsData.map((stat, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <PostStatsCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
              iconBgColor={stat.iconBgColor}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

PostStats.propTypes = {
  totalPosts: PropTypes.number,
  pendingPosts: PropTypes.number,
  publishedPosts: PropTypes.number,
  rejectedPosts: PropTypes.number,
};

export default PostStats;
