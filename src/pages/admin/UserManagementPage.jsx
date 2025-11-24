import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import AdminPaper from '../../components/admin/AdminPaper';
import {
  UserToolbar,
  UserTable
} from '../../components/admin/user-management';
import { userAPI } from '../../api/user.api';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sexFilter, setSexFilter] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  });

  // Fetch users từ API với pagination
  const fetchUsers = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const params = {
        CurrentPage: page,
        PageSize: pageSize
      };

      const response = await userAPI.getAllUsers(params);
      
      if (response && response.data) {
        setUsers(response.data.items || []);
        setPagination({
          currentPage: response.data.currentPage,
          pageSize: response.data.pageSize,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  // Filter users dựa trên search và filter
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = searchText === '' ||
      (user.fullName && user.fullName.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.phone && user.phone.includes(searchText)) ||
      (user.id && user.id.toLowerCase().includes(searchText.toLowerCase()));

    // Role filter
    const matchesRole = roleFilter === '' || user.role === roleFilter;

    // Sex filter
    const matchesSex = sexFilter === '' || user.sex === sexFilter;

    return matchesSearch && matchesRole && matchesSex;
  });

  const handlePaginationChange = (page, pageSize) => {
    fetchUsers(page, pageSize);
  };

  const handleRefresh = () => {
    setSearchText('');
    setRoleFilter('');
    setSexFilter('');
    fetchUsers(1, pagination.pageSize);
    message.success('Đã làm mới dữ liệu');
  };

  const handleAddUser = () => {
    message.info('Tính năng thêm người dùng đang được phát triển');
  };

  const handleExport = () => {
    message.info('Tính năng xuất Excel đang được phát triển');
  };

  const handleView = (record) => {
    console.log('View user:', record);
    message.info(`Xem chi tiết người dùng ${record.fullName || record.phone}`);
  };

  const handleEdit = (record) => {
    console.log('Edit user:', record);
    message.info(`Chỉnh sửa người dùng ${record.fullName || record.phone}`);
  };

  const handleDelete = (record) => {
    console.log('Delete user:', record);
    // Trong thực tế sẽ gọi API delete
    message.success(`Đã xóa người dùng ${record.fullName || record.phone}`);
  };

  // Load data khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminPaper
      title="Quản lý người dùng"
      subtitle="Quản lý tài khoản và thông tin người dùng"
    >
      {/* Main Content */}
      <Card bordered={false}>
        {/* Toolbar */}
        <UserToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
          sexFilter={sexFilter}
          onSexChange={setSexFilter}
          onRefresh={handleRefresh}
          onAddUser={handleAddUser}
          onExport={handleExport}
        />

        {/* Table */}
        <UserTable
          data={filteredUsers}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </AdminPaper>
  );
};

export default UserManagementPage;
