import React from 'react';
import { Table, Dropdown, Button, Space } from 'antd';
import { MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomerInfo from './CustomerInfo';
import StatusBadge from './StatusBadge';
import RatingDisplay from './RatingDisplay';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const RentalTable = ({
  data,
  loading,
  selectedRowKeys,
  onSelectionChange,
  pagination,
  onView,
  onEdit,
  onDelete
}) => {
  const actionMenuItems = [
    {
      key: 'view',
      label: 'Xem chi tiết',
      icon: <EyeOutlined />,
    },
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: <EditOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: 'Xóa',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (key, record) => {
    switch (key) {
      case 'view':
        onView(record);
        break;
      case 'edit':
        onEdit(record);
        break;
      case 'delete':
        onDelete(record);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => (
        <span className="font-mono font-medium">{id}</span>
      ),
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      width: 250,
      render: (_, record) => (
        <CustomerInfo
          avatar={record.customer.avatar}
          name={record.customer.name}
          email={record.customer.email}
        />
      ),
    },
    {
      title: 'Phòng trọ',
      dataIndex: 'room',
      key: 'room',
      width: 150,
      render: (room) => (
        <span className="font-medium text-gray-900">{room}</span>
      ),
    },
    {
      title: 'Thời gian',
      key: 'duration',
      width: 200,
      render: (_, record) => (
        <div>
          <div className="text-sm">
            <span className="font-medium">
              {dayjs(record.startDate, 'DD/MM/YYYY').format('DD/MM/YYYY')}
            </span>
            {record.endDate && (
              <>
                <span className="mx-2">-</span>
                <span className="font-medium">
                  {record.endDate === 'đến nay'
                    ? 'đến nay'
                    : dayjs(record.endDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
                  }
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">{record.duration}</div>
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (rating) => rating ? <RatingDisplay rating={rating} /> : '-',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => <StatusBadge status={status} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: actionMenuItems,
            onClick: ({ key }) => handleMenuClick(key, record)
          }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      rowSelection={rowSelection}
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: false,
        showQuickJumper: false,
        simple: false,
      }}
      scroll={{ x: 1000 }}
    />
  );
};

RentalTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onSelectionChange: PropTypes.func,
  pagination: PropTypes.object,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default RentalTable;
