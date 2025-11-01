import React, { useState } from 'react';
import {
  Drawer,
  Radio,
  Button,
  Divider,
  Rate,
  Input,
  Slider,
  Modal
} from 'antd';
import {
  FilterOutlined,
  StarFilled,
  EnvironmentOutlined,
  DollarOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';

const FilterDrawer = ({
  visible,
  onClose,
  onFilterChange,
  placement = 'left',
  width = 320
}) => {
  const navigate = useNavigate();
  const { isPlusMember } = useRole();
  const [searchParams] = useSearchParams();

  // Initialize filters from URL params
  const getInitialFilters = () => {
    const address = searchParams.get('address') || '';
    const maxPrice = searchParams.get('maxPrice');
    const averageRating = searchParams.get('averageRating');

    return {
      address,
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000000,
      averageRating: averageRating ? parseInt(averageRating) : null
    };
  };

  const [filters, setFilters] = useState(getInitialFilters());
  const [isPriceChanged, setIsPriceChanged] = useState(!!searchParams.get('maxPrice')); // Track if user changed price
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

    // Track if user manually changed the price
    if (key === 'maxPrice') {
      setIsPriceChanged(true);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      address: '',
      maxPrice: 10000000, // Reset to default 10 triệu
      averageRating: null
    };
    console.log('🔄 Resetting filters to default');
    setFilters(defaultFilters);
    setIsPriceChanged(false); // Reset price change tracking
    // Pass empty object to clear all filters in the API
    console.log('📤 Sending empty filters to clear search');
    onFilterChange && onFilterChange({});
  };

  const applyFilters = () => {
    console.log('🔍 Apply Filters button clicked (Mobile/Drawer)');
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
    // Only include maxPrice if user manually changed it
    if (isPriceChanged && filters.maxPrice !== null && filters.maxPrice > 0) {
      activeFilters.maxPrice = filters.maxPrice;
      console.log('  ✓ MaxPrice filter:', activeFilters.maxPrice);
    }
    if (filters.averageRating !== null) {
      activeFilters.averageRating = filters.averageRating;
      console.log('  ✓ AverageRating filter:', activeFilters.averageRating);
    }

    console.log('📤 Sending active filters to API:', activeFilters);
    onFilterChange && onFilterChange(activeFilters);
    onClose();
  };

  const handleUpgrade = (plan) => {
    setUpgradeModalVisible(false);
    onClose();
    navigate(`/premium/payment-detail/${plan}`);
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterOutlined />
            <span>Bộ lọc tìm kiếm</span>
            {!isPlusMember() && (
              <CrownOutlined className="text-yellow-500 ml-2" />
            )}
          </div>
        </div>
      }
      placement={placement}
      width={width}
      onClose={onClose}
      open={visible}
      className="filter-drawer"
      footer={
        <div className="p-4 border-t">
          <div className="flex gap-3">
            <Button
              onClick={resetFilters}
              className="flex-1"
              size="large"
            >
              Đặt lại
            </Button>
            {!isPlusMember() ? (
              <Button
                type="primary"
                onClick={() => setUpgradeModalVisible(true)}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                size="large"
                icon={<CrownOutlined />}
              >
                Nâng cấp để lọc
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={applyFilters}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                size="large"
              >
                Tìm kiếm
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="px-2">
        {/* Premium Feature Notice for Non-Members */}
        {!isPlusMember() && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CrownOutlined className="text-blue-600 text-lg" />
              <span className="font-semibold text-blue-900">Tính năng Premium</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Bộ lọc nâng cao chỉ dành cho thành viên Plus và Pro
            </p>
            <Button
              type="primary"
              size="small"
              block
              onClick={() => setUpgradeModalVisible(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Xem gói nâng cấp
            </Button>
          </div>
        )}

        {/* Địa chỉ */}
        <div className="mb-6" style={{ opacity: !isPlusMember() ? 0.5 : 1, pointerEvents: !isPlusMember() ? 'none' : 'auto' }}>
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
        <div className="mb-6" style={{ opacity: !isPlusMember() ? 0.5 : 1, pointerEvents: !isPlusMember() ? 'none' : 'auto' }}>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <DollarOutlined className="text-green-500" />
            Giá tối đa
          </h4>
          <div className="space-y-3">
            <div className="text-center">
              <span className="text-2xl font-bold text-blue-600">
                {filters.maxPrice?.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
            <Slider
              min={1000000}
              max={20000000}
              step={500000}
              value={filters.maxPrice}
              onChange={(value) => handleFilterChange('maxPrice', value)}
              tooltip={{
                formatter: (value) => `${value?.toLocaleString('vi-VN')} VNĐ`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1tr</span>
              <span>10tr</span>
              <span>20tr</span>
            </div>
          </div>
        </div>

        <Divider />

        {/* Điểm đánh giá */}
        <div className="mb-6" style={{ opacity: !isPlusMember() ? 0.5 : 1, pointerEvents: !isPlusMember() ? 'none' : 'auto' }}>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <StarFilled className="text-yellow-500" />
            Điểm đánh giá
          </h4>
          <Radio.Group
            value={filters.averageRating}
            onChange={(e) => handleFilterChange('averageRating', e.target.value)}
            className="w-full"
          >
            <div className="space-y-3">
              {ratingOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <Radio value={option.value} className="mr-2">
                    {option.label}
                  </Radio>
                  {option.value !== null && (
                    <Rate
                      disabled
                      value={option.value}
                      className="ml-2 text-xs [&_.ant-rate-star]:text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </Radio.Group>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Modal
        open={upgradeModalVisible}
        onCancel={() => setUpgradeModalVisible(false)}
        footer={null}
        centered
        width="90%"
        style={{ maxWidth: '700px', zIndex: 1050 }}
        className="upgrade-modal"
      >
        <div className="text-center py-4">
          <div className="mb-4">
            <CrownOutlined className="text-5xl md:text-7xl text-yellow-500 animate-pulse" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 px-2">
            Nâng cấp lên Plus để sử dụng bộ lọc nâng cao
          </h2>
          <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-8 px-4">
            Tìm kiếm chính xác hơn với bộ lọc nâng cao dành cho thành viên Plus.
            Hãy nâng cấp ngay để tận hưởng trải nghiệm tốt nhất!
          </p>

          {/* Package Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-2">
            {/* Plus Package */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-400 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full shadow-md">
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                  KHUYẾN NGHỊ
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
            <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-300 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
              <div className="absolute top-4 right-4">
                <div className="bg-purple-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                  NÂNG CAO
                </div>
              </div>
              <div className="mb-4 mt-2">
                <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-2">PRO</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">80,000</span>
                  <span className="text-base md:text-lg text-gray-600 ml-1">đ/tháng</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-grow">
                <ul className="text-left text-sm text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 font-bold">✓</span>
                    <span>Tất cả tính năng Plus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 font-bold">✓</span>
                    <span>Đăng tin không giới hạn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 font-bold">✓</span>
                    <span>Ưu tiên hiển thị trên đầu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2 font-bold">✓</span>
                    <span>Quản lí nhà trọ được thuê</span>
                  </li>
                </ul>
              </div>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => handleUpgrade('pro')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all mt-auto"
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
    </Drawer>
  );
};

export default FilterDrawer;
