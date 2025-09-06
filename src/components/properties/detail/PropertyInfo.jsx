import React from 'react';
import { Card, Divider, Space, Tag } from 'antd';

const PropertyInfo = ({ property }) => {
  return (
    <Card className="w-full">
      <Space direction="vertical" size="middle" className="w-full">
        {/* Quick Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Thông tin nhanh</h3>
          <Space direction="vertical" size="small" className="w-full">
            <div className="flex justify-between">
              <span className="text-gray-600">Diện tích:</span>
              <span className="font-medium">16 m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số người ở:</span>
              <span className="font-medium">1 người</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loại phòng:</span>
              <span className="font-medium">Phòng đơn</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tình trạng:</span>
              <Tag color="green">Còn trống</Tag>
            </div>
          </Space>
        </div>

        <Divider />

        {/* Đánh giá */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Đánh giá</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-500">{property.rating}</div>
              <div className="text-sm text-gray-500">Điểm đánh giá</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{property.reviewCount}</div>
              <div className="text-sm text-gray-500">Lượt đánh giá</div>
            </div>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default PropertyInfo;
