import React, { useState } from 'react';
import {
  Drawer,
  Radio,
  Button,
  Divider,
  Rate,
  Tag
} from 'antd';
import {
  FilterOutlined,
  CloseOutlined,
  StarFilled
} from '@ant-design/icons';

const FilterDrawer = ({
  visible,
  onClose,
  onFilterChange,
  placement = 'left',
  width = 320
}) => {
  const [filters, setFilters] = useState({
    rating: 'all',
    priceRange: 'all',
    propertyType: 'all',
    userType: []
  });

  const ratingOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: '5 sao', value: 5 },
    { label: '4 sao', value: 4 },
    { label: '3 sao', value: 3 },
    { label: '2 sao', value: 2 },
    { label: '1 sao', value: 1 }
  ];

  const priceRangeOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Dưới 5 triệu', value: 'under5' },
    { label: '5-10 triệu', value: '5to10' },
    { label: '10-15 triệu', value: '10to15' },
    { label: '15-30 triệu', value: '15to30' }
  ];

  const propertyTypeOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Ưu đãi', value: 'deal' },
    { label: 'Nổi bật', value: 'featured' },
    { label: 'Mới', value: 'new' }
  ];

  const userTypes = [
    { label: 'Plus', value: 'plus', color: '#52c41a' },
    { label: 'Pro', value: 'pro', color: '#faad14' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  const handleUserTypeChange = (userType) => {
    const newUserTypes = filters.userType.includes(userType)
      ? filters.userType.filter(type => type !== userType)
      : [...filters.userType, userType];
    handleFilterChange('userType', newUserTypes);
  };

  const resetFilters = () => {
    const defaultFilters = {
      rating: 'all',
      priceRange: 'all',
      propertyType: 'all',
      userType: []
    };
    setFilters(defaultFilters);
    onFilterChange && onFilterChange(defaultFilters);
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterOutlined />
            <span>Bộ lọc tìm kiếm</span>
          </div>
        </div>
      }
      placement={placement}
      width={width}
      onClose={onClose}
      open={visible}
      className="filter-drawer"
      extra={
        <Button type="link" onClick={resetFilters} className="text-blue-500">
          Đặt lại
        </Button>
      }
      footer={
        <div className="p-4 border-t">
          <Button
            type="primary"
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600"
            size="large"
          >
            Áp dụng bộ lọc
          </Button>
        </div>
      }
    >
      <div className="px-2">
        {/* Điểm đánh giá */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <StarFilled className="text-yellow-500" />
            Điểm đánh giá
          </h4>
          <Radio.Group
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full"
          >
            <div className="space-y-3">
              {ratingOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <Radio value={option.value} className="mr-2">
                    {option.label}
                  </Radio>
                  {option.value !== 'all' && (
                    <Rate
                      disabled
                      value={option.value}
                      className="ml-2 text-xs"
                      style={{ fontSize: '14px' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Radio.Group>
        </div>

        <Divider />

        {/* Khoảng giá */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Khoảng giá</h4>
          <Radio.Group
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full"
          >
            <div className="space-y-3">
              {priceRangeOptions.map(option => (
                <Radio key={option.value} value={option.value} className="block">
                  {option.label}
                </Radio>
              ))}
            </div>
          </Radio.Group>
        </div>

        <Divider />

        {/* Loại nhà trọ */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Loại nhà trọ</h4>
          <Radio.Group
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full"
          >
            <div className="space-y-3">
              {propertyTypeOptions.map(option => (
                <Radio key={option.value} value={option.value} className="block">
                  {option.label}
                </Radio>
              ))}
            </div>
          </Radio.Group>
        </div>

        <Divider />

        {/* Loại User */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Loại User</h4>
          <div className="flex flex-wrap gap-2">
            {userTypes.map(userType => (
              <Tag.CheckableTag
                key={userType.value}
                checked={filters.userType.includes(userType.value)}
                onChange={() => handleUserTypeChange(userType.value)}
                style={{
                  backgroundColor: filters.userType.includes(userType.value)
                    ? userType.color
                    : 'transparent',
                  color: filters.userType.includes(userType.value) ? 'white' : userType.color,
                  border: `1px solid ${userType.color}`,
                  borderRadius: '16px',
                  padding: '6px 16px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {userType.label}
              </Tag.CheckableTag>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
