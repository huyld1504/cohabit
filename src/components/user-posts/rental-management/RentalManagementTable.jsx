import React from 'react';
import { Table, Button, Dropdown } from 'antd';
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const RentalManagementTable = ({ 
  data = [], 
  loading = false, 
  onView, 
  onEdit, 
  onDelete
}) => {
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getActionMenuItems = (record) => [
    {
      key: 'view',
      label: 'Xem chi tiết',
      icon: <EyeOutlined />,
      onClick: () => onView?.(record),
    },
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: <EditOutlined />,
      onClick: () => onEdit?.(record),
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Xóa',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => onDelete?.(record),
    },
  ];

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Tên nhà trọ',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text) => (
        <div className="font-medium text-gray-900">{text}</div>
      ),
    },
    {
      title: 'Địa chỉ nhà trọ',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      render: (text) => (
        <div className="text-gray-600">{text}</div>
      ),
    },
    {
      title: 'Số lượng người thuê',
      dataIndex: 'occupancy',
      key: 'occupancy',
      width: 150,
      render: (occupancy) => (
        <div className="text-center">
          <span className="font-medium text-gray-900">
            {occupancy.current}/{occupancy.total}
          </span>
        </div>
      ),
    },
    {
      title: 'Ngày tạo bài đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date) => (
        <div className="text-gray-600">
          {new Date(date).toLocaleDateString('vi-VN')}
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price) => (
        <div className="font-medium text-gray-900">
          {formatPrice(price)}
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="hover:bg-gray-100"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="rental-management-table">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: false,
          simple: false,
        }}
        scroll={{ x: 1000 }}
        className="custom-table"
        size="middle"
      />
    </div>
  );
};

RentalManagementTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default RentalManagementTable;