import React from 'react';
import { Table, Tag, Dropdown, Button } from 'antd';
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const UserPostTable = ({
  data = [],
  loading = false,
  onView,
  onEdit,
  onDelete
}) => {

  const getStatusTag = (status) => {
    const statusConfig = {
      'pending': { color: 'orange', text: 'Đang duyệt' },
      'approved': { color: 'green', text: 'Đã duyệt' },
      'rejected': { color: 'red', text: 'Từ chối' },
      'closed': { color: 'default', text: 'Đã đóng' },
      'hidden': { color: 'purple', text: 'Đã ẩn' },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return <Tag color={config.color}>{config.text}</Tag>;
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
      dataIndex: 'title',
      key: 'title',
      width: 250,
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
      title: 'Ngày Đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => (
        <div className="text-gray-600">
          {new Date(date).toLocaleDateString('vi-VN')}
        </div>
      ),
    },
    {
      title: 'Trạng thái xử lý',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => getStatusTag(status),
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
    <div className="user-post-table">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={false}
        scroll={{ x: 800 }}
        className="custom-table"
        size="large"
      />
    </div>
  );
};

UserPostTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default UserPostTable;