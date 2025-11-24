import React from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Avatar,
  Typography,
  Tooltip,
  Dropdown
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  PhoneOutlined,
  DollarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

const PaymentTable = ({
  data,
  loading,
  selectedRowKeys,
  onSelectionChange,
  onView,
  onEdit,
  onDelete
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      'Success': { color: 'green', text: 'Thành công' },
      'InProgress': { color: 'orange', text: 'Đang xử lý' },
      'Failed': { color: 'red', text: 'Thất bại' },
    };

    const config = statusConfig[status] || { color: 'default', text: status };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getPackageTag = (description) => {
    if (description && description.includes('PLUS')) {
      return <Tag color="blue">PLUS</Tag>;
    } else if (description && description.includes('PRO')) {
      return <Tag color="purple">PRO</Tag>;
    }
    return <Tag color="default">Standard</Tag>;
  };

  const getActionItems = (record) => [
    {
      key: 'view',
      label: 'Xem chi tiết',
      icon: <EyeOutlined />,
      onClick: () => onView(record)
    },
    {
      key: 'edit',
      label: 'Chỉnh sửa',
      icon: <EditOutlined />,
      onClick: () => onEdit(record)
    },
    {
      key: 'delete',
      label: 'Xóa',
      icon: <DeleteOutlined />,
      onClick: () => onDelete(record),
      danger: true
    }
  ];

  const columns = [
    {
      title: 'Khách hàng',
      key: 'customer',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record.avatarUrl || null}
            icon={!record.avatarUrl && <UserOutlined />}
            size={40}
            className='!bg-[#1279a2]'
          />
          <div>
            <div className="font-medium">
              {record.fullName || 'Không có tên'}
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <PhoneOutlined className="text-xs" />
              {record.phone}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Gói dịch vụ',
      dataIndex: 'description',
      key: 'package',
      width: 180,
      render: (description) => (
        <div>
          <div className="font-medium text-sm">{description}</div>
          {getPackageTag(description)}
        </div>
      )
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'right',
      render: (price) => (
        <div className="flex items-center justify-end gap-1">
          <DollarOutlined className="text-green-500" />
          <Text strong className="text-green-600">
            {formatCurrency(price)}
          </Text>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      align: 'center',
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 150,
      render: (date) => (
        <Tooltip title={dayjs(date).format('DD/MM/YYYY HH:mm:ss')}>
          <Text className="text-sm">{formatDate(date)}</Text>
        </Tooltip>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
              size="small"
              className="text-blue-600 hover:bg-blue-50"
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: getActionItems(record).map(item => ({
                ...item,
                onClick: undefined
              })),
              onClick: ({ key }) => {
                const item = getActionItems(record).find(i => i.key === key);
                if (item?.onClick) item.onClick();
              }
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              size="small"
              className="text-gray-600 hover:bg-gray-50"
            />
          </Dropdown>
        </Space>
      )
    }
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectionChange,
    getCheckboxProps: (record) => ({
      name: record.subcriptionId,
    })
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowSelection={rowSelection}
      pagination={false}
      rowKey="key"
      scroll={{ x: 1200 }}
      className="payment-table"
    />
  );
};

export default PaymentTable;