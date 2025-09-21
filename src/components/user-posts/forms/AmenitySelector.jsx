import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import {
  WifiOutlined,
  CarOutlined,
  ThunderboltOutlined,
  DropboxOutlined,
  FireOutlined,
  SafetyOutlined,
  VideoCameraOutlined,
  ToolOutlined,
  ShopOutlined,
  BankOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';

const AmenitySelector = ({ value = [], onChange }) => {
  const amenitiesData = [
    {
      key: 'wifi',
      label: 'WiFi miễn phí',
      icon: <WifiOutlined />,
    },
    {
      key: 'parking',
      label: 'Chỗ để xe',
      icon: <CarOutlined />,
    },
    {
      key: 'electricity',
      label: 'Điện tự do',
      icon: <ThunderboltOutlined />,
    },
    {
      key: 'water',
      label: 'Nước tự do',
      icon: <DropboxOutlined />,
    },
    {
      key: 'kitchen',
      label: 'Bếp chung',
      icon: <FireOutlined />,
    },
    {
      key: 'security',
      label: 'An ninh 24/7',
      icon: <SafetyOutlined />,
    },
    {
      key: 'maintenance',
      label: 'Bảo trì định kỳ',
      icon: <ToolOutlined />,
    },
    {
      key: 'convenience',
      label: 'Cửa hàng tiện lợi',
      icon: <ShopOutlined />,
    },
    {
      key: 'atm',
      label: 'ATM gần đó',
      icon: <BankOutlined />,
    },
    {
      key: 'camera',
      label: 'Camera giám sát',
      icon: <VideoCameraOutlined />,
    },
  ];

  const handleChange = (checkedValues) => {
    onChange?.(checkedValues);
  };

  return (
    <div className="w-full">
      <Checkbox.Group
        value={value}
        onChange={handleChange}
        className="w-full"
      >
        <Row gutter={[16, 16]}>
          {amenitiesData.map((amenity) => (
            <Col xs={12} sm={8} md={6} key={amenity.key}>
              <Checkbox
                value={amenity.key}
                className="flex items-center p-3 border rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 w-full border-none"
              >
                <div className="flex items-center space-x-2 w-full">
                  <span className="text-blue-600 text-lg">
                    {amenity.icon}
                  </span>
                  <span className="text-gray-700 text-sm font-medium">
                    {amenity.label}
                  </span>
                </div>
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>

      {value.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Đã chọn {value.length} tiện nghi:
          </p>
          <div className="flex flex-wrap gap-2">
            {value.map((amenityKey) => {
              const amenity = amenitiesData.find(item => item.key === amenityKey);
              return amenity ? (
                <span
                  key={amenityKey}
                  className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                >
                  <span className="mr-1">{amenity.icon}</span>
                  {amenity.label}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.ant-checkbox-wrapper) {
          width: 100% !important;
          margin: 0 !important;
        }
        :global(.ant-checkbox-wrapper:hover .ant-checkbox-inner) {
          border-color: #1890ff !important;
        }
        :global(.ant-checkbox-checked .ant-checkbox-inner) {
          background-color: #1890ff !important;
          border-color: #1890ff !important;
        }
      `}</style>
    </div>
  );
};

AmenitySelector.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default AmenitySelector;