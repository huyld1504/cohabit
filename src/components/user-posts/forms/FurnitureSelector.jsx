import React, { useState, useEffect } from 'react';
import { Checkbox, Row, Col, Spin, message } from 'antd';
import {
  HomeOutlined,
  DesktopOutlined,
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
import { furnitureApi } from '../../../api/furniture.api';

const FurnitureSelector = ({ value = [], onChange }) => {
  const [furnitureData, setFurnitureData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setLoading(true);
        const response = await furnitureApi.getAllFurniture();

        if (response.success && response.data) {
          console.log('API Response data:', response.data); // Debug log
          // Transform API data to component format
          const transformedData = response.data.map((item, index) => ({
            key: item.furId || item.id || item.furnitureId || item.key || `api-item-${index}`,
            label: item.name || item.furnitureName || item.label || 'Unknown Item',
            icon: getFurnitureIcon(item.name || item.furnitureName || item.label),
            description: item.description || item.furnitureDescription
          }));
          console.log('Transformed data:', transformedData); // Debug log
          setFurnitureData(transformedData);
        } else {
          // Fallback to static data if API fails
          console.warn('API failed, using fallback data:', response?.message);
          setFurnitureData(getStaticFurnitureData());
        }
      } catch (error) {
        console.error('Error fetching furniture:', error);
        message.error('Không thể tải danh sách nội thất. Đang sử dụng dữ liệu mẫu.');
        // Fallback to static data
        setFurnitureData(getStaticFurnitureData());
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []);

  const getFurnitureIcon = (name) => {
    const iconMap = {
      'Giường': <HomeOutlined />,
      'Tủ': <HomeOutlined />,
      'Bàn': <DesktopOutlined />,
      'Ghế': <HomeOutlined />,
      'Tủ lạnh': <HomeOutlined />,
      'Máy lạnh': <HomeOutlined />,
      'Máy giặt': <HomeOutlined />,
      'Tivi': <VideoCameraOutlined />,
      'Internet': <WifiOutlined />,
      'default': <HomeOutlined />
    };

    // Find matching icon based on furniture name
    for (const [key, icon] of Object.entries(iconMap)) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return iconMap.default;
  };

  const getStaticFurnitureData = () => [
    {
      key: 'bed',
      label: 'Giường ngủ',
      icon: <HomeOutlined />,
    },
    {
      key: 'wardrobe',
      label: 'Tủ quần áo',
      icon: <HomeOutlined />,
    },
    {
      key: 'desk',
      label: 'Bàn học',
      icon: <DesktopOutlined />,
    },
    {
      key: 'chair',
      label: 'Ghế',
      icon: <HomeOutlined />,
    },
    {
      key: 'fridge',
      label: 'Tủ lạnh',
      icon: <HomeOutlined />,
    },
    {
      key: 'air-conditioner',
      label: 'Máy lạnh',
      icon: <HomeOutlined />,
    },
    {
      key: 'washing-machine',
      label: 'Máy giặt',
      icon: <HomeOutlined />,
    },
    {
      key: 'tv',
      label: 'Tivi',
      icon: <VideoCameraOutlined />,
    },
    {
      key: 'internet',
      label: 'Internet',
      icon: <WifiOutlined />,
    }
  ];

  const handleChange = (checkedValues) => {
    // Keep furId as strings for API (e.g., "Fur001", "Fur002")
    const furIds = (checkedValues || []).filter(id => id !== null && id !== undefined && id !== '');
    onChange?.(furIds);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Checkbox.Group
        value={(value || []).map(String)}
        onChange={handleChange}
        className="w-full"
      >
        <Row gutter={[16, 16]}>
          {furnitureData.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.key || `fallback-${Math.random()}`}>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <Checkbox
                  value={item.key?.toString() || `fallback-${Math.random()}`}
                  className="w-full"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.label}</div>
                      {item.description && (
                        <div className="text-sm text-gray-500">{item.description}</div>
                      )}
                    </div>
                  </div>
                </Checkbox>
              </div>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
};

FurnitureSelector.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default FurnitureSelector;