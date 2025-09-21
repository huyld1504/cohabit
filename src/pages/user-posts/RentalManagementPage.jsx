import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import UserPostPaper from '../../components/user-posts/common/UserPostPaper';
import RentalManagementTable from '../../components/user-posts/rental-management/RentalManagementTable';

const RentalManagementPage = () => {
  const [loading] = useState(false);
  const [rentalsData, setRentalsData] = useState([]);

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockRentals = [
      {
        id: 1,
        name: "Luna's House",
        address: "D. Lê Văn Việt, Q. Thủ Đức, Tp. Hồ Chí Minh",
        occupancy: {
          current: 2,
          total: 10
        },
        createdAt: '2025-01-07',
        price: 5000000
      },
      {
        id: 2,
        name: "Nhà của Long",
        address: "D. Lê Văn Việt, Q. Thủ Đức, Tp. Hồ Chí Minh",
        occupancy: {
          current: 2,
          total: 10
        },
        createdAt: '2025-01-07',
        price: 3500000
      },
      {
        id: 3,
        name: "Phòng trọ An Phú",
        address: "D. Võ Văn Ngân, Q. Thủ Đức, Tp. Hồ Chí Minh",
        occupancy: {
          current: 5,
          total: 8
        },
        createdAt: '2025-01-05',
        price: 4200000
      },
      {
        id: 4,
        name: "Nhà trọ Sinh Viên",
        address: "D. Quang Trung, Q. Gò Vấp, Tp. Hồ Chí Minh",
        occupancy: {
          current: 8,
          total: 12
        },
        createdAt: '2025-01-03',
        price: 2800000
      }
    ];

    setRentalsData(mockRentals);
  }, []);

  const handleCreateRental = () => {
    message.info('Chuyển đến trang tạo bài đăng nhà trọ');
    // Navigate to create rental page
  };

  const handleViewRental = (record) => {
    message.info(`Xem chi tiết nhà trọ: ${record.name}`);
    // Navigate to rental detail
  };

  const handleEditRental = (record) => {
    message.info(`Chỉnh sửa nhà trọ: ${record.name}`);
    // Navigate to edit rental
  };

  const handleDeleteRental = (record) => {
    message.warning(`Xóa nhà trọ: ${record.name}`);
    // Handle delete rental
  };

  return (
    <UserPostPaper
      title="Quản lí nhà trọ"
      subtitle="Quản lý tất cả nhà trọ trong hệ thống"
      showCreateButton={true}
      onCreatePost={handleCreateRental}
    >
      {/* Rentals Table */}
      <RentalManagementTable
        data={rentalsData}
        loading={loading}
        onView={handleViewRental}
        onEdit={handleEditRental}
        onDelete={handleDeleteRental}
      />
    </UserPostPaper>
  );
};

export default RentalManagementPage;