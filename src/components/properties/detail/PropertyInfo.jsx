import React from 'react';
import { Card, Divider, Space, Tag } from 'antd';

const PropertyInfo = ({ property }) => {
  return (
    <Card className="w-full shadow-sm">
      <Space direction="vertical" size="middle" className="w-full">
        {/* Quick Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin nhanh</h3>
          <Space direction="vertical" size="small" className="w-full">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-600 text-sm md:text-base">Diện tích:</span>
              <span className="font-medium text-sm md:text-base">16 m²</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-600 text-sm md:text-base">Số người ở:</span>
              <span className="font-medium text-sm md:text-base">1 người</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-600 text-sm md:text-base">Loại phòng:</span>
              <span className="font-medium text-sm md:text-base">Phòng đơn</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-600 text-sm md:text-base">Tình trạng:</span>
              <Tag color="green" className="text-xs md:text-sm">Còn trống</Tag>
            </div>
          </Space>
        </div>

        <Divider className="my-4" />

        {/* Đánh giá */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Đánh giá</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-xl md:text-2xl font-bold text-yellow-600 mb-1">{property.rating}</div>
              <div className="text-xs md:text-sm text-gray-600">Điểm đánh giá</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">{property.reviewCount}</div>
              <div className="text-xs md:text-sm text-gray-600">Lượt đánh giá</div>
            </div>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default PropertyInfo;
