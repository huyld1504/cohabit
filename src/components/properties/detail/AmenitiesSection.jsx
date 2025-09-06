import React from 'react';
import { Row, Col, Card } from 'antd';
import {
  WifiOutlined,
  HomeOutlined,
  CarOutlined,
  VideoCameraOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const AmenitiesSection = ({ amenities = [] }) => {
  // Map amenity names to icons
  const getAmenityIcon = (name) => {
    const iconMap = {
      'Giường': '🛏️',
      'WC riêng': '🚿',
      'Wifi': <WifiOutlined className="text-xl" />,
      'Máy lạnh': '❄️',
      'Cửa sổ / ban công': '🪟',
      'Camera an ninh / chỗ để xe': <VideoCameraOutlined className="text-xl" />
    };
    return iconMap[name] || '✓';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Tiện nghi</h3>

        <Row gutter={[16, 16]}>
          {amenities.map((amenity, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                className="h-full hover:shadow-md transition-shadow"
                bodyStyle={{ padding: '16px' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getAmenityIcon(amenity.name)}
                  </div>
                  <span className="font-medium text-gray-800">
                    {amenity.name}
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Lưu ý thêm:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Hiện tại thêm: Theo thang không cho thuê theo ngày-tuần-giải</li>
          <li>• Tiền thuê: Thanh toán đầy đủ mỗi tháng</li>
          <li>• Tiền cọc: 1 tháng tiền thuê</li>
          <li>• Giờ giấc ra vào: Tự do 24/7, không chung chủ</li>
          <li>• Số người ở: Tối đa 1 người (không đón bạn bè, không có gái)</li>
          <li>• Nội thất: Được phép tự trang trí và không gây tiếng ồn hoặc mùi manh</li>
          <li>• Hút thuốc: Không cho hút thuốc trong phòng</li>
          <li>• Tiện ích hỗ phần:</li>
          <li className="ml-4">- Điện: 3,800đ / kWh</li>
          <li className="ml-4">- Nước: 80,000đ / người / tháng</li>
          <li className="ml-4">- Wifi: 50,000đ / tháng</li>
          <li className="ml-4">- Xe máy, ô tô: 200,000đ / tháng</li>
          <li>• Hợp đồng: Có thể thoát thuộm miến hoặc viết tay theo ngân, không có thúc đẩi nào</li>
        </ul>
      </div>
    </div>
  );
};

export default AmenitiesSection;
