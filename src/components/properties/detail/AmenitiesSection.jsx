import React from 'react';
import { Row, Col, Card, Alert } from 'antd';
import {
  WifiOutlined,
  HomeOutlined,
  CarOutlined,
  VideoCameraOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import SafeHTMLRenderer from '../../common/SafeHTMLRenderer';

const AmenitiesSection = ({
  amenities = [],
  amenitiesContent = null 
}) => {
  if (amenitiesContent) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Tiện nghi</h3>
        <SafeHTMLRenderer
          htmlContent={amenitiesContent}
          className="amenities-content"
        />
      </div>
    );
  }

  if (!amenities || amenities.length === 0) {
    return null;
  }
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
                className="h-full hover:shadow-md transition-shadow [&_.ant-card-body]:p-4"
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
    </div>
  );
};

export default AmenitiesSection;
