import React, { useState } from 'react';
import { Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import FilterSidebar from './FilterSidebar';
import FilterDrawer from './FilterDrawer';

const FilterSection = ({ onFilterChange }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleFilterChange = (filters) => {
    onFilterChange && onFilterChange(filters);
    // Auto close drawer on mobile after applying filters
    setDrawerVisible(false);
  };

  return (
    <>
      {/* Desktop Sidebar - Positioned absolutely */}
      <div className="hidden lg:block lg:fixed lg:left-4 lg:top-32 lg:w-80 lg:z-10">
        <FilterSidebar onFilterChange={onFilterChange} />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={() => setDrawerVisible(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 border-blue-500 rounded-full shadow-lg"
          size="large"
          shape="round"
        >
          Bộ lọc
        </Button>
      </div>

      {/* Mobile Drawer */}
      <FilterDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onFilterChange={handleFilterChange}
        placement="left"
        width={320}
      />
    </>
  );
};

export default FilterSection;
