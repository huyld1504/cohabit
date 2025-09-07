import {
  Table,
  Tag,
  Avatar,
  Dropdown,
  Space,
  Button
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const UserTable = ({
  users,
  loading,
  selectedRowKeys,
  onSelectionChange,
  pagination,
  onEdit,
  onDelete,
  onView,
  getGradeColor
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
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center !space-x-2">
          <Avatar
            size={40}
            src={record.avatar}
            icon={<UserOutlined />}
            className="flex-shrink-0 !bg-[#1279a2]"
          />
          <div>
            <div className="font-medium text-gray-900">{text}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <div className="flex items-center space-x-2">
          <PhoneOutlined className="text-gray-400" />
          <span>{phone}</span>
        </div>
      ),
    },
    {
      title: 'Ngày',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Thành phố',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<PhoneOutlined />}
            className="text-blue-600 hover:text-blue-800"
            onClick={() => window.open(`tel:${record.phone}`)}
          />
          <Button
            type="text"
            icon={<MailOutlined />}
            className="text-blue-600 hover:text-blue-800"
            onClick={() => window.open(`mailto:${record.email}`)}
          />
        </Space>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade) => (
        <Tag color={getGradeColor(grade)} className="font-medium">
          {grade}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
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
      dataSource={users}
      rowKey="id"
      rowSelection={rowSelection}
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: false,
        showQuickJumper: false,
        simple: false,
      }}
    />
  );
};

export default UserTable;
