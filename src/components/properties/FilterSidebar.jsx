import React, { useState } from 'react';
import { Card, Radio, Button, Divider, Rate, Input, InputNumber, Modal } from 'antd';
import { FilterOutlined, StarFilled, EnvironmentOutlined, DollarOutlined, CrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';

const FilterSidebar = ({ onFilterChange }) => {
  const navigate = useNavigate();
  const { isPlusMember } = useRole();
  const [filters, setFilters] = useState({
    address: '',
    maxPrice: null,
    averageRating: null
  });
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);

  const ratingOptions = [
    { label: 'Tất cả', value: null },
    { label: '5 sao', value: 5 },
    { label: '4 sao trở lên', value: 4 },
    { label: '3 sao trở lên', value: 3 },
    { label: '2 sao trở lên', value: 2 },
    { label: '1 sao trở lên', value: 1 }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    console.log(`Filter changed - ${key}:`, value);
    console.log('Current filters state:', newFilters);
    setFilters(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      address: '',
      maxPrice: null,
      averageRating: null
    };
    console.log('🔄 Resetting filters to default');
    setFilters(defaultFilters);
    // Pass empty object to clear all filters in the API
    console.log('📤 Sending empty filters to clear search');
    onFilterChange && onFilterChange({});
  };

  const applyFilters = () => {
    console.log('🔍 Apply Filters button clicked');
    console.log('📋 Current filter values:', filters);

    // Check if user has Plus or Pro membership for advanced filtering
    if (!isPlusMember()) {
      console.log('❌ User does not have Plus/Pro membership - showing upgrade modal');
      setUpgradeModalVisible(true);
      return;
    }

    console.log('✅ User has Plus/Pro membership - processing filters');

    // Only send non-null/non-empty filter values to the API
    const activeFilters = {};
    if (filters.address && filters.address.trim() !== '') {
      activeFilters.address = filters.address.trim();
      console.log('  ✓ Address filter:', activeFilters.address);
    }
    if (filters.maxPrice !== null && filters.maxPrice > 0) {
      activeFilters.maxPrice = filters.maxPrice;
      console.log('  ✓ MaxPrice filter:', activeFilters.maxPrice);
    }
    if (filters.averageRating !== null) {
      activeFilters.averageRating = filters.averageRating;
      console.log('  ✓ AverageRating filter:', activeFilters.averageRating);
    }

    console.log('📤 Sending active filters to API:', activeFilters);
    onFilterChange && onFilterChange(activeFilters);
  };

  const handleUpgrade = (plan) => {
    setUpgradeModalVisible(false);
    navigate(`/premium/payment-detail/${plan}`);
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <FilterOutlined />
          <span>Bộ lọc tìm kiếm</span>
        </div>
      }
      className="filter-sidebar h-fit sticky w-full"
      style={{ minWidth: '100%' }}
      extra={
        <Button type="link" onClick={resetFilters} className="text-blue-500">
          Đặt lại
        </Button>
      }
    >
      {/* Địa chỉ */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <EnvironmentOutlined className="text-blue-500" />
          Địa chỉ
        </h4>
        <Input
          placeholder="Nhập địa chỉ..."
          value={filters.address}
          onChange={(e) => handleFilterChange('address', e.target.value)}
          allowClear
          className="w-full"
        />
      </div>

      <Divider />

      {/* Giá tối đa */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <DollarOutlined className="text-green-500" />
          Giá tối đa
        </h4>
        <InputNumber
          placeholder="Nhập giá tối đa..."
          value={filters.maxPrice}
          onChange={(value) => handleFilterChange('maxPrice', value)}
          min={0}
          step={100000}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          className="w-full"
          addonAfter="VNĐ"
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
          value={filters.averageRating}
          onChange={(e) => handleFilterChange('averageRating', e.target.value)}
          className="w-full"
        >
          <div className="space-y-2">
            {ratingOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <Radio value={option.value}>{option.label}</Radio>
                {option.value !== null && (
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

      {/* Button Tìm kiếm */}
      <div className="mt-6">
        <Button
          type="primary"
          size="large"
          className="w-full bg-blue-500 hover:bg-blue-600 border-blue-500"
          onClick={applyFilters}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Upgrade Modal */}
      <Modal
        open={upgradeModalVisible}
        onCancel={() => setUpgradeModalVisible(false)}
        footer={null}
        centered
        width="90%"
        style={{ maxWidth: '700px' }}
        className="upgrade-modal"
      >
        <div className="text-center py-4">
          <div className="mb-4">
            <CrownOutlined className="text-5xl md:text-7xl text-yellow-500 animate-pulse" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 px-2">
            Nâng cấp tài khoản để sử dụng bộ lọc nâng cao
          </h2>
          <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-8 px-4">
            Tính năng lọc nâng cao chỉ dành cho thành viên Plus và Pro.
            Hãy nâng cấp ngay để tận hưởng trải nghiệm tốt nhất!
          </p>

          {/* Package Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-2">
            {/* Plus Package */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-300 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
              <div className="absolute top-4 right-4">
                <div className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                  PHỔ BIẾN
                </div>
              </div>
              <div className="mb-4 mt-2">
                <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">PLUS</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">30,000</span>
                  <span className="text-base md:text-lg text-gray-600 ml-1">đ/tháng</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-grow">
                <ul className="text-left text-sm text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    <span>Tìm bạn ở ghép</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    <span>Nhận tin trực tiếp trong hệ thống</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    <span>Lọc nâng cao</span>
                  </li>
                </ul>
              </div>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => handleUpgrade('plus')}
                className="bg-blue-500 hover:bg-blue-600 border-0 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all mt-auto"
              >
                Chọn gói Plus
              </Button>
            </div>

            {/* Pro Package */}
            <div className="relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-400 hover:border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                  TỐT NHẤT
                </div>
              </div>
              <div className="mb-4 mt-2">
                <h3 className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">PRO</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">80,000</span>
                  <span className="text-base md:text-lg text-gray-600 ml-1">đ/tháng</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-grow">
                <ul className="text-left text-sm text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 font-bold">✓</span>
                    <span>Tất cả tính năng Plus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 font-bold">✓</span>
                    <span>Đăng tin không giới hạn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 font-bold">✓</span>
                    <span>Ưu tiên hiển thị trên đầu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 font-bold">✓</span>
                    <span>Quản lí nhà trọ được thuê</span>
                  </li>
                </ul>
              </div>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => handleUpgrade('pro')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-0 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all mt-auto"
              >
                Chọn gói Pro
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-800">
              <strong>💡 Lưu ý:</strong> Bạn có thể hủy nâng cấp bất cứ lúc nào. Không có ràng buộc dài hạn.
            </p>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default FilterSidebar;
