import React, { useState } from 'react';
import { Card } from 'antd';
import { toast } from 'react-toastify';
import AdminPaper from '../../components/admin/AdminPaper';
import {
  RentalStats,
  RentalToolbar,
  RentalTable
} from '../../components/admin/rental-history';
import { mockRentalData, mockRentalStats } from '../../components/admin/rental-history/mockData';

const RentalHistoryPage = () => {
  const [rentals, setRentals] = useState(mockRentalData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination] = useState({
    current: 1,
    pageSize: 10,
    total: mockRentalData.length,
  });

  // Filter rentals based on search text, status, and date range
  const filteredRentals = rentals.filter(rental => {
    // Search filter
    const matchesSearch = searchText === '' ||
      rental.id.toLowerCase().includes(searchText.toLowerCase()) ||
      rental.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      rental.customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      rental.room.toLowerCase().includes(searchText.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' ||
      rental.status.toLowerCase() === statusFilter.toLowerCase() ||
      (statusFilter === 'active' && rental.status === 'Đang thuê') ||
      (statusFilter === 'completed' && rental.status === 'Hoàn thành') ||
      (statusFilter === 'cancelled' && rental.status === 'Đã hủy');

    return matchesSearch && matchesStatus;
  });

  const handleFilter = () => {
    toast.info('Đã áp dụng bộ lọc');
  };

  const handleExport = () => {
    toast.info('Tính năng xuất Excel đang được phát triển');
  };

  const handleView = (record) => {
    console.log('View rental:', record);
    toast.info(`Xem chi tiết đơn thuê ${record.id}`);
  };

  const handleEdit = (record) => {
    console.log('Edit rental:', record);
    toast.info(`Chỉnh sửa đơn thuê ${record.id}`);
  };

  const handleDelete = (record) => {
    console.log('Delete rental:', record);
    setRentals(rentals.filter(rental => rental.id !== record.id));
    toast.success(`Đã xóa đơn thuê ${record.id}`);
  };

  return (
    <AdminPaper
      title="Lịch sử thuê"
      subtitle="Quản lý lịch sử thuê phòng trọ"
    >
      {/* Statistics Cards */}
      <RentalStats
        totalRentals={mockRentalStats.totalRentals}
        activeRentals={mockRentalStats.activeRentals}
        availableRooms={mockRentalStats.availableRooms}
        revenue={mockRentalStats.revenue}
      />

      {/* Main Content */}
      <Card bordered={false}>
        {/* Toolbar */}
        <RentalToolbar
          searchText={searchText}
          onSearchChange={setSearchText}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onFilter={handleFilter}
          onExport={handleExport}
        />

        {/* Table */}
        <RentalTable
          data={filteredRentals}
          loading={loading}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          pagination={pagination}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </AdminPaper>
  );
};

export default RentalHistoryPage;
