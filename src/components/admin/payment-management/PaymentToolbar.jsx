import React from 'react';
import {
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Row,
  Col
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const PaymentToolbar = ({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  packageFilter,
  onPackageChange,
  dateRange,
  onDateRangeChange,
  onFilter,
  onRefresh,
  onExport
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <Row gutter={[16, 16]} align="middle">
        {/* Search Input */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="Tìm theo tên, SĐT..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
          />
        </Col>

        {/* Status Filter */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Select
            placeholder="Trạng thái"
            value={statusFilter}
            onChange={onStatusChange}
            style={{ width: '100%' }}
            allowClear
          >
            <Option value="all">Tất cả</Option>
            <Option value="Success">Thành công</Option>
            <Option value="InProgress">Đang xử lý</Option>
            <Option value="Failed">Thất bại</Option>
          </Select>
        </Col>

        {/* Package Filter */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Select
            placeholder="Gói dịch vụ"
            value={packageFilter}
            onChange={onPackageChange}
            style={{ width: '100%' }}
            allowClear
          >
            <Option value="all">Tất cả gói</Option>
            <Option value="PLUS">Premium Package PLUS</Option>
            <Option value="PRO">Premium Package PRO</Option>
          </Select>
        </Col>

        {/* Date Range */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <RangePicker
            placeholder={['Từ ngày', 'Đến ngày']}
            value={dateRange}
            onChange={onDateRangeChange}
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
          />
        </Col>

        {/* Action Buttons */}
        <Col xs={24} lg={4}>
          <Space size="small" style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={onFilter}
              size="middle"
            >
              Lọc
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              size="middle"
            >
              Làm mới
            </Button>
            <Button
              type="default"
              icon={<DownloadOutlined />}
              onClick={onExport}
              size="middle"
            >
              Xuất Excel
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentToolbar;