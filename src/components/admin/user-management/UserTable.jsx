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
  ManOutlined,
  WomanOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

const UserTable = ({
  data,
  loading,
  selectedRowKeys,
  onSelectionChange,
  pagination,
  onPaginationChange,
  onView,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY HH:mm');
  };

  const getRoleTag = (role) => {
    const roleConfig = {
      'BasicMember': { color: 'blue', text: 'Basic Member' },
      'ProMember': { color: 'purple', text: 'Pro Member' },
      'PlusMember': { color: 'cyan', text: 'Plus Member' },
      'Moderator': { color: 'orange', text: 'Moderator' },
      'Admin': { color: 'red', text: 'Admin' },
    };
    
    const config = roleConfig[role] || { color: 'default', text: role };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getSexIcon = (sex) => {
    switch(sex) {
      case 'Male': return <ManOutlined style={{ color: '#1890ff' }} />;
      case 'Female': return <WomanOutlined style={{ color: '#eb2f96' }} />;
      default: return <UserOutlined style={{ color: '#666' }} />;
    }
  };

  const getSexText = (sex) => {
    switch(sex) {
      case 'Male': return 'Nam';
      case 'Female': return 'Nữ';
      default: return 'Khác';
    }
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
      title: 'User',
      key: 'user',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar 
            src={record.avatarUrl || null}
            icon={!record.avatarUrl && <UserOutlined />}
            size={40}
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
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      align: 'center',
      render: (role) => getRoleTag(role)
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      key: 'sex',
      width: 100,
      align: 'center',
      render: (sex) => (
        <div className="flex items-center justify-center gap-1">
          {getSexIcon(sex)}
          <span className="text-sm">{getSexText(sex)}</span>
        </div>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
      name: record.id,
    })
  };

  const handleTableChange = (paginationConfig) => {
    onPaginationChange(paginationConfig.current, paginationConfig.pageSize);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowSelection={rowSelection}
      pagination={{
        current: pagination.currentPage,
        pageSize: pagination.pageSize,
        total: pagination.totalCount,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} của ${total} người dùng`,
        pageSizeOptions: ['10', '20', '50', '100']
      }}
      onChange={handleTableChange}
      rowKey="id"
      scroll={{ x: 800 }}
      className="user-table"
    />
  );
};

export default UserTable;