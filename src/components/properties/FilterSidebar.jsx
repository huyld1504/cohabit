import React, { useState } from 'react';
import { Card, Radio, Button, Divider, Rate, Tag, Input } from 'antd';
import { FilterOutlined, StarFilled, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    rating: 'all',
    priceRange: 'all',
    propertyType: 'all',
    userType: [],
    area: '',
    lifestyle: ''
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
    { label: 'Plus', value: 'plus', color: '#1279a1' },
    { label: 'Pro', value: 'pro', color: '#fdc700' }
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
      userType: [],
      area: '',
      lifestyle: ''
    };
    setFilters(defaultFilters);
    onFilterChange && onFilterChange(defaultFilters);
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <FilterOutlined />
          <span>Bộ lọc tìm kiếm</span>
        </div>
      }
      className="filter-sidebar h-fit sticky"
      extra={
        <Button type="link" onClick={resetFilters} className="text-blue-500">
          Đặt lại
        </Button>
      }
    >
      {/* Khu vực */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <EnvironmentOutlined className="text-blue-500" />
          Khu vực
        </h4>
        <Input
          placeholder="Nhập khu vực..."
          value={filters.area}
          onChange={(e) => handleFilterChange('area', e.target.value)}
          allowClear
          className="w-full"
        />
      </div>

      <Divider />

      {/* Thói quen sinh hoạt */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <UserOutlined className="text-green-500" />
          Thói quen sinh hoạt
        </h4>
        <Input
          placeholder="Nhập thói quen sinh hoạt..."
          value={filters.lifestyle}
          onChange={(e) => handleFilterChange('lifestyle', e.target.value)}
          allowClear
          className="w-full"
        />
      </div>

      <Divider />

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
          <div className="space-y-2">
            {ratingOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <Radio value={option.value}>{option.label}</Radio>
                {option.value !== 'all' && (
                  <Rate
                    disabled
                    value={option.value}
                    className="ml-2 text-xs [&_.ant-rate-star]:text-xs"
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
          <div className="space-y-2">
            {priceRangeOptions.map(option => (
              <Radio key={option.value} value={option.value}>
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
          <div className="space-y-2">
            {propertyTypeOptions.map(option => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </div>
        </Radio.Group>
      </div>

      <Divider />

      {/* Loại User */}
      <div className="mb-6">
        {/* <h4 className="font-semibold mb-3">Loại User</h4> */}
        <div className="space-y-2">
          {userTypes.map(userType => (
            <Tag.CheckableTag
              key={userType.value}
              checked={filters.userType.includes(userType.value)}
              onChange={() => handleUserTypeChange(userType.value)}
              className={`!text-xl !font-bold text-white border rounded-2xl py-1 px-3 m-0.5 cursor-pointer`}
              style={{
                backgroundColor: userType.color,
                borderColor: userType.color,
              }}
            >
              {userType.label}
            </Tag.CheckableTag>
          ))}
        </div>
      </div>

      <Divider />

      {/* Button Tìm kiếm */}
      <div className="mt-6">
        <Button
          type="primary"
          size="large"
          className="w-full bg-blue-500 hover:bg-blue-600 border-blue-500"
          onClick={() => onFilterChange && onFilterChange(filters)}
        >
          Tìm kiếm
        </Button>
      </div>
    </Card>
  );
};

export default FilterSidebar;
