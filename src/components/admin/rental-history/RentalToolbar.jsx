import React from 'react';
import { Input, Button, Space, Select, DatePicker } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { RangePicker } = DatePicker;

const RentalToolbar = ({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  onFilter,
  onExport
}) => {
  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'active', label: 'Đang thuê' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'cancelled', label: 'Đã hủy' }
  ];

  return (
    <div className="mb-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-80"
          />

          <Space>
            <Select
              value={statusFilter}
              onChange={onStatusChange}
              options={statusOptions}
              className="w-40"
              placeholder="Trạng thái"
            />

            <RangePicker
              value={dateRange}
              onChange={onDateRangeChange}
              format="DD/MM/YYYY"
              placeholder={['Từ ngày', 'Đến ngày']}
              className="w-64"
            />
          </Space>
        </div>

        <Space>
          <Button
            type="primary"
            onClick={onFilter}
            className="!bg-[#1279a2]"
          >
            Lọc
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={onExport}
            className="!bg-green-500 !border-green-500 !text-white hover:!bg-green-600"
          >
            Xuất Excel
          </Button>
        </Space>
      </div>
    </div>
  );
};

RentalToolbar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.string,
  onStatusChange: PropTypes.func,
  dateRange: PropTypes.array,
  onDateRangeChange: PropTypes.func,
  onFilter: PropTypes.func,
  onExport: PropTypes.func,
};

export default RentalToolbar;
