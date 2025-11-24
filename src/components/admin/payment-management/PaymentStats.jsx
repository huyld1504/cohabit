import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  CreditCardOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';

const PaymentStats = ({
  totalPayments,
  successPayments,
  inProgressPayments,
  totalRevenue
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const statsData = [
    {
      title: 'Tổng thanh toán',
      value: totalPayments,
      icon: <CreditCardOutlined />,
      color: '#1890ff',
      bgColor: '#e6f7ff'
    },
    {
      title: 'Thành công',
      value: successPayments,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
      bgColor: '#f6ffed'
    },
    {
      title: 'Đang xử lý',
      value: inProgressPayments,
      icon: <ClockCircleOutlined />,
      color: '#faad14',
      bgColor: '#fffbe6'
    },
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(totalRevenue),
      icon: <DollarCircleOutlined />,
      color: '#722ed1',
      bgColor: '#f9f0ff',
      isRevenue: true
    }
  ];

  return (
    <Row gutter={[16, 16]} className="mb-6">
      {statsData.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card bordered={false} className="shadow-sm">
            <div className="flex items-center">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-lg mr-4"
                style={{ backgroundColor: stat.bgColor, color: stat.color }}
              >
                {React.cloneElement(stat.icon, { style: { fontSize: '24px' } })}
              </div>
              <div className="flex-1">
                <Statistic
                  title={
                    <span className="text-gray-600 text-sm font-medium">
                      {stat.title}
                    </span>
                  }
                  value={stat.isRevenue ? null : stat.value}
                  valueStyle={{
                    color: stat.color,
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
                />
                {stat.isRevenue && (
                  <div
                    className="text-lg font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PaymentStats;