import React from 'react';
import { Row, Col } from 'antd';
import {
  FileTextOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  DollarOutlined
} from '@ant-design/icons';
import RentalStatsCard from './RentalStatsCard';
import PropTypes from 'prop-types';

const RentalStats = ({
  totalRentals = 0,
  activeRentals = 0,
  availableRooms = 0,
  revenue = '0'
}) => {
  const statsData = [
    {
      title: 'Tổng đơn thuê',
      value: totalRentals.toLocaleString(),
      icon: <FileTextOutlined className="text-xl" />,
      iconColor: '#1890ff',
      iconBgColor: '#e6f7ff'
    },
    {
      title: 'Đang thuê',
      value: activeRentals.toLocaleString(),
      icon: <HomeOutlined className="text-xl" />,
      iconColor: '#52c41a',
      iconBgColor: '#f6ffed'
    },
    {
      title: 'Còn trống',
      value: availableRooms.toLocaleString(),
      icon: <CheckCircleOutlined className="text-xl" />,
      iconColor: '#ff4d4f',
      iconBgColor: '#fff2f0'
    },
    {
      title: 'Doanh thu',
      value: revenue,
      icon: <DollarOutlined className="text-xl" />,
      iconColor: '#faad14',
      iconBgColor: '#fffbe6'
    }
  ];

  return (
    <div className="mb-6">
      <Row gutter={[16, 16]}>
        {statsData.map((stat, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <RentalStatsCard
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

RentalStats.propTypes = {
  totalRentals: PropTypes.number,
  activeRentals: PropTypes.number,
  availableRooms: PropTypes.number,
  revenue: PropTypes.string,
};

export default RentalStats;
