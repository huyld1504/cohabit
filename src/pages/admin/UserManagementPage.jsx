import { useState } from 'react';
import {
  Card,
  Form,
  Space,
  Button
} from 'antd';
import AdminPaper from '../../components/admin/AdminPaper';
import {
  UserToolbar,
  UserSelectedActions,
  UserModal,
  UserViewModal,
  UserDeleteModal,
  UserTable
} from '../../components/admin/users-management';
import { toast } from 'react-toastify';
import {
  PlusOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    city: 'TP.HCM',
    joinDate: '2025-07-21',
    grade: 'Pro',
    status: 'active',
    avatar: null,
  },
  {
    id: 2,
    name: 'Nguyễn Văn B',
    email: 'nguyenvanb@email.com',
    phone: '0123456790',
    city: 'Vũng Tàu',
    joinDate: '2025-07-21',
    grade: 'Plus',
    status: 'active',
    avatar: null,
  },
  {
    id: 3,
    name: 'Nguyễn Văn C',
    email: 'nguyenvanc@email.com',
    phone: '0123456791',
    city: 'Vũng Tàu',
    joinDate: '2025-07-21',
    grade: 'Free',
    status: 'active',
    avatar: null,
  },
  {
    id: 4,
    name: 'Nguyễn Văn D',
    email: 'nguyenvand@email.com',
    phone: '0123456792',
    city: 'Vũng Tàu',
    joinDate: '2025-07-21',
    grade: 'Pro',
    status: 'inactive',
    avatar: null,
  },
  {
    id: 5,
    name: 'Nguyễn Văn E',
    email: 'nguyenvane@email.com',
    phone: '0123456793',
    city: 'Vũng Tàu',
    joinDate: '2025-07-21',
    grade: 'Plus',
    status: 'active',
    avatar: null,
  },
  {
    id: 6,
    name: 'Nguyễn Văn F',
    email: 'nguyenvanf@email.com',
    phone: '0123456794',
    city: 'Vũng Tàu',
    joinDate: '2025-07-21',
    grade: 'Free',
    status: 'active',
    avatar: null,
  },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [form] = Form.useForm();
  const [pagination] = useState({
    current: 1,
    pageSize: 10,
    total: mockUsers.length,
  });

  // Filter users based on search text
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone.includes(searchText)
  );

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Pro': return 'gold';
      case 'Plus': return 'blue';
      case 'Free': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      ...record,
      joinDate: dayjs(record.joinDate),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    console.log('handleDelete called with record:', record);
    setDeletingUser(record);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (deletingUser) {
      setUsers(users.filter(user => user.id !== deletingUser.id));
      toast.success('Đã xóa người dùng thành công');
      setIsDeleteModalVisible(false);
      setDeletingUser(null);
    }
  };

  const handleView = (record) => {
    console.log('handleView called with record:', record);
    setViewingUser(record);
    setIsViewModalVisible(true);
  };

  const handleSave = async (values) => {
    try {
      setLoading(true);
      const userData = {
        ...values,
        joinDate: values.joinDate.format('YYYY-MM-DD'),
      };

      if (editingUser) {
        // Update existing user
        setUsers(users.map(user =>
          user.id === editingUser.id ? { ...user, ...userData } : user
        ));
        toast.success('Cập nhật người dùng thành công');
      } else {
        // Add new user
        const newUser = {
          ...userData,
          id: Date.now(),
          avatar: null,
        };
        setUsers([...users, newUser]);
        toast.success('Thêm người dùng thành công');
      }

      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    toast.info('Tính năng xuất file đang được phát triển');
  };

  return (
    <AdminPaper
      title="Người dùng"
      subtitle="Quản lý thông tin người dùng hệ thống"
      // headerAction={
      //   <Space>
      //     <Button
      //       icon={<DownloadOutlined />}
      //       onClick={handleExport}
      //     >
      //       Xuất file
      //     </Button>
      //     <Button
      //       type="primary"
      //       icon={<PlusOutlined />}
      //       onClick={() => {
      //         setEditingUser(null);
      //         form.resetFields();
      //         setIsModalVisible(true);
      //       }}
      //     >
      //       Thêm người dùng
      //     </Button>
      //   </Space>
      // }
    >
      {/* Main Content */}
      <Card bordered={false}>
        {/* Toolbar */}
        <UserToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          onFilter={() => toast.info('Tính năng bộ lọc đang được phát triển')}
          onExport={handleExport}
          onAddUser={() => {
            setEditingUser(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        />

        {/* Selected Actions */}
        <UserSelectedActions
          selectedCount={selectedRowKeys.length}
          onDelete={() => toast.info('Tính năng xóa nhiều đang được phát triển')}
          onExport={() => toast.info('Tính năng xuất nhiều đang được phát triển')}
        />

        {/* Table */}
        <UserTable
          users={filteredUsers}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          pagination={pagination}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          getGradeColor={getGradeColor}
        />
      </Card>

      {/* User Modal */}
      <UserModal
        isVisible={isModalVisible}
        editingUser={editingUser}
        form={form}
        loading={loading}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        onSubmit={handleSave}
      />

      {/* View User Modal */}
      <UserViewModal
        isVisible={isViewModalVisible}
        user={viewingUser}
        onClose={() => {
          setIsViewModalVisible(false);
          setViewingUser(null);
        }}
        getGradeColor={getGradeColor}
        getStatusColor={getStatusColor}
      />

      {/* Delete User Modal */}
      <UserDeleteModal
        isVisible={isDeleteModalVisible}
        user={deletingUser}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setDeletingUser(null);
        }}
        onConfirm={confirmDelete}
      />
    </AdminPaper>
  );
}; export default UserManagementPage;
